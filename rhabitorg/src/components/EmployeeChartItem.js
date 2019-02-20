import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const EmployeeChartItem = (props) => {
  	return( 
        <li>
            <Chip 
                label= {props.title + ' - ' + props.first_name + ' ' + props.last_name}
                avatar={<Avatar>{props.first_name[0] + props.last_name[0]}</Avatar>}
                style={{marginBottom: '5px'}}
            />
            
            { props.children }
        </li>
        
    )

}

export default EmployeeChartItem;