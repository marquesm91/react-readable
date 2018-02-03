import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <h2>{this.props.reducer}</h2>
      </div>
    );
  }
}

const mapStateToProps = ({ reducer }) => {
  return {
    reducer: reducer.length === 0 ? 'dummy empty reducer': reducer
  };
};

export default connect(mapStateToProps)(App);
