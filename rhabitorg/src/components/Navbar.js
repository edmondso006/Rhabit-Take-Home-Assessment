import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => (
    <div>
        <AppBar position="static" color="primary" style={{flexGrow: 1}}>
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    Rhabit Organization
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
)

export default Navbar;
