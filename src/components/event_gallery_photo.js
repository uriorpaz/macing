import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import { browserHistory, Link } from 'react-router';
import PhotoModal from './photo_modal';

class EventGalleryPhoto extends Component {
  componentDidMount() {
    this.showModal();
  }

  componentWillUpdate() {
    this.hideModal();
  }

  componentDidUpdate() {
    this.showModal();
  }

  componentWillUnmount() {
    this.hideModal();
  }

  hideModal() {
    modal.clear();
  }

  showModal() {
    if (this.props.photo) {
      const {
        Width,
        Height,
        Thumbnails: {
          large: {
            Url
          }
        }
      } = this.props.photo;

      modal.add(PhotoModal, {
        size: 'large',
        closeOnOutsideClick: false,
        hideTitleBar: true,
        hideCloseButton: false,
        closeOnEscapeClick: true,
        ImageUrl: Url,
        ModalPercentOfViewport: 100,
        ImageWidth: Width,
        ImageHeight: Height,
        onRemoveModal: () => {
          if (browserHistory.length > 0) browserHistory.go(-1);
          else browserHistory.push(`/events/${this.props.params.event_id}/photos`);
        }
        //.. all what you put in here you will get access in the modal props ;)
      });
    }
  }

  render() {
    return (
      <div className="gallery-modal-nav flexbox-horizontal">
        <div className="action action-prev">
          <Link to={`/events/287/photos/${this.props.prevPhotoId}`}>
            <i className="fa fa-arrow-circle-left fa-3x" />
          </Link>
        </div>
        <div className="action action-next">
          <Link to={`/events/287/photos/${this.props.nextPhotoId}`}>
            <i className="fa fa-arrow-circle-right fa-3x" />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currentEvent: { photos } }, { params: { photo_id } }) => {
  let indexOfPhoto = -1;
  _.each(photos, (data, idx) => {
    if (_.isEqual(data.Id, Number(photo_id))) {
      indexOfPhoto = idx;
      return;
    }
});

  return {
    photo: photos[indexOfPhoto],
    nextPhotoId: photos.length > (indexOfPhoto + 1) ? photos[indexOfPhoto + 1].Id : photos[indexOfPhoto].Id,
    prevPhotoId: (indexOfPhoto - 1) <= 0 ? photos[0].Id : photos[indexOfPhoto - 1].Id
  };
};

export default connect(mapStateToProps)(EventGalleryPhoto);
