import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';

import './FloatButton.css';

class FloatButton extends PureComponent {
  state = {
    hover: false
  }

  render() {
    const { hover } = this.state;
    const { className, onClick } = this.props;
    const { post_id } = this.props.match.params;

    return (
      <button
        className={`float-button ${className}`}
        style={hover ? {width: post_id ? '120px' : '90px' } : null}
        onClick={onClick}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className={`float-button-text ${hover ? 'fade-in' : 'fade-out'}`}>{post_id ? 'New Comment' : 'New Post'}</div>
        <div className={`float-button-text ${hover ? 'fade-out' : 'fade-in'}`}><Icon type="plus" /></div>
      </button>
    );
  }
};

const FloatButtonWithRouter = withRouter(FloatButton);

export { FloatButtonWithRouter as FloatButton };
