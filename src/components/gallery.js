import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryPhoto from './gallery_photo';
import { toggleSinglePhotoSelection } from '../actions';

require('../assets/stylesheets/gallery/gallery.scss');

// Use the PhotoCollection prop to pass in a PhotoCollection object with the following structure:
//
// **
// OR Use the Photos prop to pass in an array of photos.
class Gallery extends Component {
  constructor(props) {
    super(props);

    if (props.PhotoCollection && props.Photos) {
      throw {
        message: 'The PhotoCollection and Photos props are mutually exclusive'
      };
    }
  }

  onPhotoClick(e, photoId) {
    if (this.props.isInSelectMode) {
      if (e) e.preventDefault();
      this.props.toggleSinglePhotoSelection(photoId);
    }
  }

  renderPhotos(photos) {
    return (
      photos.map((photo) => {
        return (
            <GalleryPhoto
              key={photo.Id}
              onPhotoClick={this.onPhotoClick.bind(this)}
              PhotoId={photo.Id}
              Filename={photo.Filename}
              ThumbnailUrl={photo.Thumbnails.small.Url}
              IsInSelectMode={this.props.isInSelectMode}
              PhotoUrl={`/events/${this.props.EventId}/photos/${photo.Id}`}
            />
        );
      })
    );
  }

  render() {
    const photos = this.props.Photos ?
      this.props.Photos : this.props.PhotoCollection;

    return (
      <div className="gallery">
        <div className="gallery-title">
          <h6>{this.props.Title}</h6>
        </div>

        <div className="gallery-container">
          <div className="gallery-photos flexbox-horizontal">
            {this.renderPhotos(photos)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gallery: { isInSelectMode } }) => {
  return {
    isInSelectMode
  };
};

export default connect(mapStateToProps, { toggleSinglePhotoSelection })(Gallery);
