import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingPage from '../pages/LoadingPage';

class Header extends Component {
  state = {
    user: '',
    response: true,
  };

  componentDidMount() {
    this.handleUserName();
  }

  handleUserName = async () => {
    const { name } = await getUser();
    this.setState({
      user: name,
    }, () => this.setState({
      response: false,
    }));
  };

  render() {
    const { user, response } = this.state;
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">
          { response ? <LoadingPage /> : user}
        </h2>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search </Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites </Link>
          <Link to="/profile" data-testid="link-to-profile">Profile </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
