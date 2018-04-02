import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, PostDetail, Page404 } from './screens';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/post/:id" component={PostDetail} />
        <Route exact path="/not-found" component={Page404} />
        <Route component={Page404} />
      </Switch>
    );
  }
}

export default App;
