import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

class AddEmployee extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            first_name: '',
            last_name: '',
            title: '',
            manager: '',
            validInput: null
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleManagerChange = (e) => {
        this.setState({
            manager: e.target.value
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

    handleSubmit = (e) => {
        e.preventDefault();
        let newEmployee = {
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
            this.props.handleSubmit(newEmployee);
        } else {
            //Show the users an error
            this.setState({
                validInput: false
            });
        }
    }

    render(){
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h1">
                            Add Employee
                        </Typography>

                        <form onSubmit={this.handleSubmit}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField id="first_name" label="First Name" margin="normal" fullWidth={true} onChange={this.handleChange}></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="last_name" label="Last Name" margin="normal" fullWidth={true} onChange={this.handleChange}></TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField id="title" label="Title" margin="normal" fullWidth={true} onChange={this.handleChange}></TextField>
                                </Grid>


                                <Grid item xs={12}>
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

                                </Grid>
                                 {this.state.validInput === false ? <p>Please fill out all fields</p> : null }           
                                <Grid item xs={12}>
                                    <Button type="submit" value="submit" variant="contained" style={{marginTop: '1rem'}} color="primary" fullWidth={true}>Submit</Button>
                                </Grid>
                            </Grid>
                            
                            

                        </form>
                    </CardContent>
              </Card>
            </div>
        )
    }
}

export default AddEmployee;