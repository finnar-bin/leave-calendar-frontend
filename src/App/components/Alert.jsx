import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
  render() {
    let {dismissible, floating, kind, message, clickAction} = this.props;
    let toDismiss = dismissible ? 'alert-dismissible' : '';
    let toFloat = floating ? 'alert-floating' : '';
    let vanityMessage;
    
    switch (kind) {
      case 'danger':
        vanityMessage = 'Something went wrong, Cap!';
        break;
      
      case 'success':
        vanityMessage = 'Awww yeah!';
        break;
  
      default:
        break;
    }
    
    return (
      <div className={`alert alert-${kind} ${toFloat} ${toDismiss} fade show`} role="alert">
        <span><strong>{vanityMessage}</strong> {message}.</span>
        {
          dismissible &&
          <button type="button" className="close" onClick={clickAction} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        }
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => this.props.clickAction(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

Alert.propTypes = {
  dismissible: PropTypes.bool,
  floating: PropTypes.bool,
  kind: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark']),
  message: PropTypes.string,
  clickAction: PropTypes.func.isRequired
}

Alert.defaultProps = {
  dismissible: true,
  floating: false,
  kind: 'primary',
  clickAction: () => {}
}

export default Alert;