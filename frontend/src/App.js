import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from "react-router-dom";
import './App.css';
//import DataProvider from './DataProvider';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import NavBar from './components/appbar/AppBar';
import Dashboard from './components/home/Dashboard';
import Home from './components/home/Home';
import Leagues from './components/leagues/Leagues';
import LoginForm from './components/auth/Login';
import LogoutPage from './components/auth/Logout';
import SignUpForm from './components/auth/SignUp';
import PageNotFound from './components/PageNotFound';
import Switch from 'react-router-dom/Switch';
import RequireAuth from './components/auth/RequireAuth';
import history from './history';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/leagues" component={RequireAuth(Leagues)} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/signup" component={SignUpForm} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>
  //<DataProvider endpoint="leagues/" 
  //              render={data => <ScrollableTabsButtonAuto data={data} />} />
)


export default App;