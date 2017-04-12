import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add } from 'eventlistener';
import inViewport from '../utils/inViewport';
import {
  getEventDetails,
  getEventPhotos
} from '../actions';
import Gallery from '../components/gallery';
import EventHeader from '../components/event_header';

require('../assets/stylesheets/event/event-gallery.scss');

class EventMain extends Component {
  componentDidMount() {
      console.log('@eventgallery/didmount');

      this.props.getEventDetails(this.props.params.event_id);
      this.props.getEventPhotos(this.props.params.event_id);

      this.lazyLoadHandler = _.throttle(this.lazyLoadHandler.bind(this), 1000);
      add(window, 'scroll', this.lazyLoadHandler);
  }

  lazyLoadHandler() {
    const { photos, params, pageNumber, pageSize, hasNextPage } = this.props;

    if (photos && hasNextPage) {
      const markerElement = document.querySelector('#lazy-load-marker');

      if (inViewport(
          markerElement,
          window,
          { top: 0, bottom: 2500, left: 0, right: 0 }
      )) {
        this.props.getEventPhotos(params.event_id, pageNumber + 1, pageSize);
      }
    }
  }

  renderPhotos() {
    if (!this.props.photos) {
      return (
        <div className="no-photos"></div>
      );
    }

    const galleryTitle = `All Photos (${this.props.event.Stats.PublicPhotoCount})`;
    return (
        <Gallery
          EventId={this.props.params.event_id}
          PhotoCollection={this.props.photos}
          Title={galleryTitle}
        />
    );
  }

  renderNextPageMarker() {
    if (this.props.photos) {
      return (
        <span
          id="lazy-load-marker"
          data-page-number={`${(this.props.pageNumber || 1) + 1}`}
        />
      );
    }

    return;
  }

  renderLoadingIndicator() {
    if (this.props.isLoadingPhotos) {
      return (
        <div className="lazy-load-indicator">
          <span><i className="fa fa-spinner fa-spin" />Loading More Photos</span>
        </div>
      );
    }

    return;
  }

  render() {
    if (this.props.event) {
      return (
        <div>
          <EventHeader
            Title={this.props.event.EventName}
          />

          {this.props.children}
          {this.renderPhotos()}
          {this.renderNextPageMarker()}
          {this.renderLoadingIndicator()}
        </div>
      );
    }

    return (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    currentEvent: {
      event,
      photos,
      hasNextPage,
      pageSize,
      pageNumber,
      totalResults,
      isLoadingPhotos
    }
  } = state;

  return {
    event,
    photos,
    isLoadingPhotos,
    hasNextPage,
    pageSize,
    pageNumber,
    totalResults
  };
};

export default connect(mapStateToProps, { getEventDetails, getEventPhotos })(EventMain);
