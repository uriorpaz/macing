import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class GalleryPhoto extends Component {
  onPhotoClick(e) {
    this.props.onPhotoClick(
      e,
      this.props.PhotoId,
      this.props.ImageUrl,
      this.props.ImageWidth,
      this.props.ImageHeight
    );
  }

  render() {
    const style = {
      backgroundImage: `url('${encodeURI(this.props.ThumbnailUrl)}')`
    };

    let photoClassName = 'gallery-photo';
    if (this.props.IsInSelectMode) photoClassName += ' photo-select';
    if (this.props.isSelected) photoClassName += ' selected';

    return (
      <Link
        to={this.props.PhotoUrl}
        onClick={this.onPhotoClick.bind(this)}
        className={photoClassName}
        style={style}
      >
        <span className="fa fa-check-circle fa-2x" />
      </Link>
    );
  }
}

const mapStateToProps = ({ gallery: { selectedPhotos } }, ownProps) => {
  return {
    isSelected: _.includes(selectedPhotos, ownProps.PhotoId)
  };
};

export default connect(mapStateToProps)(GalleryPhoto);
