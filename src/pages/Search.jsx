import React, { Component } from 'react';
import Header from '../components/Header';

const MIN_ARTISTNAME_LENGTH = 2;

class Search extends Component {
  state = {
    artistName: '',
  };

  handleArtistInput = (event) => {
    const { value } = event.target;
    this.setState({
      artistName: value,
    });
  };

  render() {
    const { artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        <form>
          <label htmlFor="search-artist-input">

            <input
              data-testid="search-artist-input"
              t
              ype="text"
              name="search-artist-input"
              id="search-artist-input"
              placeholder="Nome do Artista"
              value={ artistName }
              onChange={ this.handleArtistInput }
            />

            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ artistName.length < MIN_ARTISTNAME_LENGTH }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
