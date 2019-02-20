import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Employee from './Employee';
import Grid from '@material-ui/core/Grid';

const AllEmployee = (props) => {
    return (
        <div>         
            <Card>
                <CardContent>   
                    <Typography gutterBottom variant="h5" component="h1">
                        All Employees
                    </Typography>
                    <Grid container spacing={16}>
                        {props.employees.map((employee) => {
                            return (
                                <Grid item xs={3} key={employee.id}>
                                    <Employee employee={employee} handleDelete={props.handleDelete} employees={props.employees} handleEdit={props.handleEdit} />
                                </Grid>
                            )                                
                        })}       
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default AllEmployee;