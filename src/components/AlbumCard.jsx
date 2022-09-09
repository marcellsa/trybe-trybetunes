import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { albums } = this.props;

    if (albums.length === 0) {
      return (<p>Nenhum álbum foi encontrado</p>);
    }
    return (
      <div>
        { albums.map((album) => (

          <div key={ album.collectionId }>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <p>{ album.collectionName }</p>
            <span>{ album.artistName }</span>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              {' '}
              { album.collectionName }
              {' '}

            </Link>
          </div>
        ))}
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  })).isRequired,
};

export default AlbumCard;
