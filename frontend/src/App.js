import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataProvider from './DataProvider';
import FormDialog from './components/auth/Dialog';
import NavBar from './components/appbar/AppBar'


const App = () => (
  <div>
    <NavBar/>
  </div>
  //<DataProvider endpoint="leagues/" 
  //              render={data => <ScrollableTabsButtonAuto data={data} />} />
);

export default App;
