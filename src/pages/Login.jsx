import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

const MIN_USERNAME_LENGTH = 3;

class Login extends Component {
  state = {
    username: '',
    loggedIn: false,
    shouldRedirect: false,
  };

  handleUsernameChange = (event) => {
    const { value } = event.target;
    this.setState({
      username: value,
    });
  };

  handleButton = () => {
    this.setState({
      loggedIn: true,
    }, async () => {
      const { username } = this.state;
      await createUser({ name: username });
      this.setState({
        shouldRedirect: true,
      });
    });
  };

  render() {
    const { username, loggedIn, shouldRedirect } = this.state;

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
                  name="username"
                  id="login-name-input"
                  value={ username }
                  onChange={ this.handleUsernameChange }
                />
              </label>

              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ username.length < MIN_USERNAME_LENGTH }
                onClick={ this.handleButton }
              >
                Entrar
              </button>
            </form>
          )}
        { shouldRedirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
