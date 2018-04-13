import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Page404 extends Component {
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
            <Link to="/">
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
              >
                Back to All Categories
              </button>
            </Link>
          </div>

    );
  }
}

export { Page404 };
