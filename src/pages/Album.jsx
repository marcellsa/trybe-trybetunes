import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    albumInfo: {},
    songs: [],
  };

  componentDidMount() {
    this.handleAlbumInfo();
  }

  handleAlbumInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const albumData = await getMusics(id);
    this.setState({
      albumInfo: albumData[0],
      songs: albumData.slice(1),
    });
  };

  render() {
    const { albumInfo, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />

        <main>
          <img
            src={ albumInfo.artworkUrl100 }
            alt={ albumInfo.collectionName }
          />
          <h3 data-testid="album-name">{ albumInfo.collectionName }</h3>
          <h5 data-testid="artist-name">{ albumInfo.artistName}</h5>

          <h6>{console.log(songs)}</h6>

          { songs.map((song) => (
            <div key={ song.trackId }>
              <MusicCard trackName={ song.trackName } previewUrl={ song.previewUrl } />
            </div>
          ))}

        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default Album;
