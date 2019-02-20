import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

class Employee extends Component {

    constructor(props){
        super(props);
        this.state = {
            first_name: this.props.employee.first_name,
            last_name: this.props.employee.last_name,
            title: this.props.employee.title,
            manager: 0,
            editOpen: false,
            validInput: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //Basic client-side form validation
    validInput = (employee) => {
        //Dynamically validate input for extensibility
        let values = Object.values(employee);
        let valid = true;
        for(let i=0; i < values.length; i++){
            if(!values[i]){
                valid = false;
            }
        }
        return valid;
    }

    handleSubmit = () => {
        let newEmployee = {
            id: this.props.employee.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            title: this.state.title,
            parent_id: this.state.manager
        }

        if(this.validInput(newEmployee)){
            this.setState({
                first_name: '',
                last_name: '',
                title: '',
                manager: '',
                validInput: true
            });
            //Sending data to parent component 
            this.props.handleEdit(newEmployee);
            this.handleEditClose();
        } else {
            //Show the users an error
            this.setState({
                validInput: false
            });
        }
        
    }

    handleEditOpen = () => {
        this.setState({
            editOpen: true
        })
    }

    handleEditClose = () => {
        this.setState({
            editOpen: false
        })
    }

    handleManagerChange = (e) => {
        this.setState({
            manager: e.target.value
        })
    }

    handleDelete = () => {
        this.props.handleDelete(this.props.employee.id);
    }

    render(){
        return (
            <div>
                <Card>
                    <CardContent>
                        <Grid container justify="center" alignItems="center">
                            <Avatar style={{height: 75, width: 75}}>{this.props.employee.first_name[0]}{this.props.employee.last_name[0]}</Avatar>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item xs={12} style={{paddingTop: '1rem'}}>
                                    <Typography variant="title" component="h6">{this.props.employee.first_name + ' ' + this.props.employee.last_name}</Typography>

                                </Grid>
    
                                <Grid item xs={12}>
                                    <p>{this.props.employee.title}</p>
                                </Grid>
                            </Grid>               
                        </Grid>
                    </CardContent>
    
                    <CardActions>
                        <Button size="small" onClick={this.handleDelete}>Delete</Button>
                        <Button size="small" onClick={this.handleEditOpen}>Edit</Button>
                    </CardActions>
                </Card>

                {/* TODO: Look into performance */}
                <Dialog
                    open={this.state.editOpen}
                    onClose={this.handleClose}
                    aria-labelledby="Edit Employee"
                    >
                    <DialogTitle id="edit-employee">Edit Employee: {this.props.employee.first_name + ' ' + this.props.employee.last_name}</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="first_name"
                                label="First Name"
                                type="text"
                                fullWidth
                                value={this.state.first_name}
                                onChange={this.handleChange}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="last_name"
                                label="Last Name"
                                type="text"
                                fullWidth
                                value={this.state.last_name}
                                onChange={this.handleChange}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                type="text"
                                fullWidth
                                value={this.state.title}
                                onChange={this.handleChange}
                            />

                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="manager">Manager</InputLabel>
                                    <Select
                                        value={this.state.manager}
                                        onChange={this.handleManagerChange}
                                        input={<Input name="manager" id="manager" />}
                                    >
                                    {this.props.employees.map((employee) => {
                                        let name = employee.first_name + ' ' + employee.last_name;
                                        return (
                                            <MenuItem value={employee.id} key={employee.id}>{name}</MenuItem>
                                            )                                
                                    })}
                                </Select>
                            </FormControl>
                            {this.state.validInput === false ? <p>Please fill out all fields</p> : null }           
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleEditClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                        Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    
}

export default Employee;