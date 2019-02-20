import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import EmployeeChart from './../components/EmployeeChart';
import AddEmployee from './../components/AddEmployee';
import AllEmployee from './../components/AllEmployee'; 
import update from 'immutability-helper'
import DirectReports from './../components/DirectReports';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Main container to retrieve information and send to child components
class EmployeeContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            employees: [],
            directEmployees: [],
            nestedTree: [],
            loadingError: false
        }
    }

    employeesToAdd = [];
    employeeTreeData = [];

    componentDidMount(){
        axios.get('http://localhost:3001/api/v1/employees.json')
            .then(res => {
                this.parseTree(res.data[0]);
                this.setState({
                    employees: this.employeesToAdd,
                    treeData: this.employeeTreeData,
                    nestedTree: res.data
                });
            })
            .catch(err => {
                this.setState({
                    loadingError: true
                });
                console.error(err);
            })
    }
  
    parseTree = (data) => {
        //Getting root
        if(data.ancestry === null){
            this.employeesToAdd.push(data);
        }
        //Getting the rest of the tree
        //Breaks the recursion if there is no more employees
        if(data.id !== null){
           if(data.children.length > 0){
                //Loop through the children and call function recursively
                for(let i=0; i < data.children.length; i++){
                   this.employeesToAdd.push(data.children[i]);
                   this.parseTree(data.children[i]);
                }
           }
       }
    }

    handleSubmit = (data) => {
        axios.post('http://localhost:3001/api/v1/employees', {
            first_name: data.first_name,
            last_name: data.last_name,
            title: data.title,
            parent_id: data.parent_id
        })  //Updates the state without mutating it so it instantly refreshes after adding new idea
            .then((res) => {
                //Updates the state without mutating it
                const employees = update(this.state.employees, {
                    $splice: [[0,0, res.data]]
                });
                this.setState({
                    employees: employees,
                    nestedTree: this.state.nestedTree
                });
            })
            .catch((err) => console.error(err));
    }

    handleEdit = (data) => {
        axios.put(`http://localhost:3001/api/v1/employees/${data.id}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            title: data.title,
            parent_id: data.parent_id
        })
        .then((res) => {
           this.updateEmployee(res.data)
        })
        .catch((err) => console.error(err))
    }

    handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/v1/employees/${id}`)
            .then((res) => {
                const employeeIndex = this.state.employees.findIndex(x => x.id === id);
                //Updates the state without mutating it
                const employees = update(this.state.employees, {$splice: [[employeeIndex, 1]]})
                this.setState({
                    employees: employees
                })
            })
    }

    updateEmployee = (employee) => {
        const employeeIndex = this.state.employees.findIndex(x => x.id === employee.id);
        const employees = update(this.state.employees, {
            [employeeIndex]: { $set: employee }
        })
        this.setState({
            employees: employees
        })
    }

    //Function to parse the subtree returned from the api.
    parseSubTree = (data) => {
        let root = data[0];
        this.employeesToAdd = [];
        for(let i=0; i < root.children.length; i++){
            this.employeesToAdd.push(root.children[i]);
        }
        this.setState({
            directEmployees: this.employeesToAdd
        });
    }

    handleFindChildren = (managerID) => {
        axios.get(`http://localhost:3001/api/v1/employees/${managerID}`)
            .then(res => {
                this.parseSubTree(res.data);        
            })
            .catch(err => console.error(err));
    }

    handleClose = () => {
        this.setState({
            loadingError: false 
        });
    };
    

    render(){
        return (
           <div>
                {this.state.loadingError ? <p>Error getting data from the server</p> : null}
                <Grid container direction="row" style={{ marginTop: '2rem', paddingLeft: '5rem', paddingRight: '5rem' }} >
                    <Grid  item container xs={7} direction="column" >
                        <AllEmployee employees={this.state.employees} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
                    </Grid>

                    <Grid item xs={1}></Grid>

                    <Grid item container xs={4} direction="column" >
                        <Grid item xs={12}>
                            <AddEmployee employees={this.state.employees} handleSubmit={this.handleSubmit} />
                            <br />
                            <DirectReports employees={this.state.employees} directEmployees={this.state.directEmployees} handleFindChildren={this.handleFindChildren}/>
                            <br />
                            <EmployeeChart treeData={this.state.nestedTree} />

                        </Grid>
                    </Grid>

                </Grid>


                {/* Error Dialog */}
                <Dialog
                    open={this.state.loadingError}
                    onClose={this.handleClose}
                    aria-labelledby="error"
                    aria-describedby="error-dialog"
                >
                    <DialogTitle id="error-dialog">{"Error!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="error-dialog-description">
                            There was an error connecting to the server. Please ensure that you
                            have started the server using: rails server -p 3001
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
           </div>
            
          
        )
    }
}

export default EmployeeContainer;