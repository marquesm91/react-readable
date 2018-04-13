import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FixedLayout } from './components';
import { Posts, Post, Page404 } from './screens';

class App extends Component {
  render() {
    return (
      <Router>
        <FixedLayout>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/not-found" component={Page404} />
            <Route path="/:category/:post_id" component={Post} />
            <Route path="/:category" component={Posts} />
          </Switch>
        </FixedLayout>
      </Router>
    );
  }
}

export default App;
