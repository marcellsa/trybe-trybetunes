import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

const MIN_USERNAME_LENGTH = 3;

class Login extends Component {
  state = {
    userName: '',
    loggedIn: false,
  };

  handleUserNameChange = (event) => {
    const { value } = event.target;
    this.setState({
      userName: value,
    });
  };

  handleButton = () => {
    this.setState({
      loggedIn: true,
    }, async () => {
      const { userName } = this.state;
      await createUser({ name: userName });
      const { history } = this.props;
      history.push('/search');
    });
  };

  render() {
    const { userName, loggedIn } = this.state;

    return (
      <div data-testid="page-login">
        { loggedIn ? (<LoadingPage />)
          : (
            <form>
              <label htmlFor="login-name-input">
                Login
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="login-name-input"
                  id="login-name-input"
                  value={ userName }
                  onChange={ this.handleUserNameChange }
                />
              </label>

              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ userName.length < MIN_USERNAME_LENGTH }
                onClick={ this.handleButton }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
