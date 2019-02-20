import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

class DirectReports extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            first_name: '',
            last_name: '',
            title: '',
            manager: '',
            validInput: null,
            submitClicked: null
        }

    }

    handleManagerChange = (e) => {
        this.setState({
            manager: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitClicked: true
        })

        if(this.state.manager){
            this.props.handleFindChildren(this.state.manager);
        }   
    }

    
    render(){
        console.log(this.props);
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h1">
                            Direct Reports 
                        </Typography>

                    <form onSubmit={this.handleSubmit}>
                        <Grid container direction="row">
                            <Grid item xs={8}>
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

                                <Grid item xs={1}>
                                </Grid>
                                
                                <Grid item xs={3}>
                                    <Button type="submit" value="submit" variant="contained" style={{marginTop: '1rem'}} color="primary" fullWidth={true}>Submit</Button>
                                </Grid>
                        </Grid>
                    </form>

                    <Grid container>
                        {this.props.directEmployees.map(employee => {
                            return (
                                <Grid item xs={12} key={employee.id}>
                                    <p>{employee.first_name + ' ' + employee.last_name + ' - ' + employee.title}</p>
                                </Grid>
                            )
                        })}
                        {this.state.manager != '' && this.state.submitClicked && this.props.directEmployees.length === 0 ? <p>Has no direct Employess</p> : null}
                    </Grid>

                </CardContent>
              </Card>
            </div>
        )
    }
}

export default DirectReports;