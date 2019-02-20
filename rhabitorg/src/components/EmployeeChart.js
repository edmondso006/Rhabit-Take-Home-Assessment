import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import EmployeeChartItem from './EmployeeChartItem';

class EmployeeChart extends Component {

    list = (data) => {
        //Make sure there is data being passed (will be null before axios requests is completed)
        if(data){
            let children = (subEmployees) => {
                //Check employees is not null
                if (subEmployees) {
                  return <ul>{ this.list(subEmployees) }</ul>
              }
            }
            
            return data.map((node) => {
              return (
                <EmployeeChartItem key={node.id} first_name={node.first_name} last_name={node.last_name} title={node.title}>
                    { children(node.children) }
                </EmployeeChartItem>
                )
            })
        }
        
    }

    render(){
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h1">
                            Current Organization Structure
                        </Typography>

                        <ul>
                            { this.list(this.props.treeData) }
                        </ul>                  
                    </CardContent>
              </Card>
            </div>
        )
    }
}

export default EmployeeChart;