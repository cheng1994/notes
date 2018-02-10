import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

export const browserHistory = require('history').createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isAuthenticated && isUnauthenticatedPage){
    browserHistory.replace('/dashboard');
  } else if(!isAuthenticated && isAuthenticatedPage){
    browserHistory.replace('/')
  }
};

const onEnterPublicPage = () => {
  if(Meteor.userId()){
    browserHistory.replace('/dashboard')
  }
}

const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/')
  }
}

export const AppRouter = (
  <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={() => <Login onEnter={onEnterPublicPage} />} />
        <Route path="/signup" component={() => <Signup onEnter={onEnterPublicPage} />} />
        <Route path="/dashboard" component={() => <Dashboard onEnter={onEnterPrivatePage} />} />
        <Route path="*" component={NotFound} />
      </Switch>
  </Router>
);
