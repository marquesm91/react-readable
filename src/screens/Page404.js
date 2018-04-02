import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Page404 extends Component {
  render() {
    return (
      <div className="not-found-container">
        <div className="not-found-logo-container">
          <div className="not-found-logo"></div>
        </div>
        <div className="not-found-info-container">
          <div
            style={{
              fontSize: '42px',
              fontWeight: 900,
              marginBottom: '15px',
              color: '#fff'
            }}
          >
            Oops,
          </div>
          <div
            style={{
              fontSize: '26px',
              fontWeight: 900,
              marginBottom: '15px',
              color: '#fff'
            }}
          >
            Algo deu errado :(
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 100,
              marginBottom: '15px',
              color: '#fff'
            }}
          >
            Error 404. Página não encontrada.
          </div>
          <Link to="/">
            <button
              style={{
                minWidth: '300px',
                padding: '15px',
                background: '#fff',
                borderRadius: '20px',
                color: '#ffa500',
                fontSize: '18px',
                fontFamily: 'Montserrat',
                fontStyle: 'sans-serif',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              VOLTE À PÁGINA PRINCIPAL
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export { Page404 };
