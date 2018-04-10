import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FixedLayout } from './components';
import { CategoryDetail, PostDetail, Page404 } from './screens';

class App extends Component {
  render() {
    return (

    <FixedLayout>
      <Switch>
        <Route exact path="/" component={CategoryDetail} />
        <Route exact path="/:category" component={CategoryDetail} />
        <Route exact path="/:category/:post_id" component={PostDetail} />
        <Route exact path="/not-found" component={Page404} />
        <Route component={Page404} />
      </Switch>

    </FixedLayout>
    );
  }
}

export default App;
