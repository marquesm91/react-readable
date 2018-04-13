import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  selectPost,
  setComments
} from '../redux/actions';

class Page404 extends Component {
  homePageHandler = () => {
    this.props.selectPost(null);
    this.props.setComments([]);
    this.props.history.replace('/');
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '18px',
          color: '#555'
        }}
      >
        Error 404. Can't find this post anymore, sorry!
        <button
          style={{
            width: '180px',
            padding: '15px',
            background: '#001529',
            borderRadius: '20px',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer'
          }}
          onClick={this.homePageHandler}
        >
          Back to All Categories
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectPost: id => dispatch(selectPost(id)),
  setComments: id => dispatch(setComments(id))
});

const Page404Connected = withRouter(connect(null, mapDispatchToProps)(Page404));

export { Page404Connected as Page404 };
