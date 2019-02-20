import React, { Component } from 'react';
import './App.css';
import EmployeeContainer from './containers/EmployeeContainer';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div>
        
        <Navbar />
        <EmployeeContainer />
      </div>
    );
  }
}

export default App;
