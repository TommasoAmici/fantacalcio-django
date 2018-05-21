import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';
import ScrollableTabsButtonAuto from './NavBar';
import DataProvider from './DataProvider';

const App = () => (
  <DataProvider endpoint="leagues/" 
                render={data => <ScrollableTabsButtonAuto data={data} />} />
);

export default App;
