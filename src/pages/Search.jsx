import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingPage from './LoadingPage';

const MIN_ARTISTNAME_LENGTH = 2;

class Search extends Component {
  state = {
    artist: '',
    albums: null,
    isLoading: false,
    artistSearched: '',
  };

  handleArtistInput = (event) => {
    const { value } = event.target;
    this.setState({
      artist: value,
      artistSearched: value,
    });
  };

  handleSearchButton = async () => {
    const { artist } = this.state;
    this.setState({ isLoading: true });
    const searchedAlbums = await searchAlbumsAPI(artist);
    this.setState({
      albums: searchedAlbums,
      artist: '',
      isLoading: false,
    });
  };

  render() {
    const { artist, isLoading, albums, artistSearched } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        {isLoading ? <LoadingPage />
          : (
            <form>
              <label htmlFor="search-artist-input">

                <input
                  data-testid="search-artist-input"
                  type="text"
                  name="artist"
                  id="search-artist-input"
                  placeholder="Nome do Artista"
                  value={ artist }
                  onChange={ this.handleArtistInput }
                />

                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ artist.length < MIN_ARTISTNAME_LENGTH }
                  onClick={ this.handleSearchButton }
                >
                  Pesquisar
                </button>
              </label>
            </form>
          )}

        { albums && (
          <div>
            <p>
              Resultado de álbuns de:
              {' '}
              { artistSearched }
            </p>
            { albums.map((album) => (

              <div key={ album.collectionId }>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{ album.collectionName }</p>
                <span>{ album.artistName }</span>
                {/* <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                /> */}
              </div>

            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
