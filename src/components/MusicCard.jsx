import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import LoadingPage from '../pages/LoadingPage';

class MusicCard extends Component {
  state = {
    isChecked: false,
    isLoading: false,
  };

  // async componentDidMount() {
  //   this.handleFavoritesList();
  // }

  // handleFavoritesList = async () => {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const favoritesList = await getFavoriteSongs();
  //   this.setState({
  //     isLoading: false,
  //   });
  //   const list = favoritesList.some((track) => track.trackId === trackId);
  //   this.setState({
  //     isChecked: true,
  //   });
  // };

  handleCheckboxChange = async (song) => {
    this.setState({
      isLoading: true,
    });
    await addSong(song);
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, music } = this.props;
    const { isChecked, isLoading } = this.state;
    return (
      isLoading ? <LoadingPage /> : (
        <div>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId }>
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              name="checkbox-input"
              id={ trackId }
              checked={ isChecked }
              onChange={ () => this.handleCheckboxChange(music) }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
