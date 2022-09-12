import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// import { addSong, removeSong } from '../services/favoriteSongsAPI';
import LoadingPage from './LoadingPage';

class Album extends Component {
  state = {
    albumInfo: {},
    songs: [],
    isLoading: false,
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

  // handleCheckboxChange = (event) => {
  //   const { checked } = event.target;
  //   const { songs } = this.state;
  //   if (checked) {
  //     addSong(songs.trackId);
  //   } else {
  //     removeSong(songs.trackId);
  //   }
  // };

  render() {
    const { albumInfo, songs, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />

        {isLoading
          ? <LoadingPage />
          : (
            <main>
              <img
                src={ albumInfo.artworkUrl100 }
                alt={ albumInfo.collectionName }
              />
              <h3 data-testid="album-name">{ albumInfo.collectionName }</h3>
              <h5 data-testid="artist-name">{ albumInfo.artistName}</h5>

              { songs.map((song) => (
                <div key={ song.trackId }>
                  <MusicCard
                    trackName={ song.trackName }
                    previewUrl={ song.previewUrl }
                    trackId={ song.trackId }
                    music={ song }
                  />
                </div>
              ))}
            </main>
          )}

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
