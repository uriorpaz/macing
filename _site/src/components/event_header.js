import React, { Component } from 'react';

require('../assets/stylesheets/event/event-header.scss');

class EventHeader extends Component {
  render() {
    return (
      <div className="event-header">
        <h1>{this.props.Title}</h1>
      </div>
    );
  }
}

export default EventHeader;
