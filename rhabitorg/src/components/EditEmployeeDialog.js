import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
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

    render(){
        return (
            <div>
                <DialogTitle id="form-dialog-title">Edit Employee: {this.props.employee.first_name + ' ' + this.props.employee.last_name}</DialogTitle>
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
                    </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleEditClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                    Save
                    </Button>                    
                </DialogActions>

            </div>
        )
    }
}

export default AddEmployee;