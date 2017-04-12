import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';
import store from '../store';
import { toggleSelectMode } from '../actions';

require('../assets/stylesheets/app/header-with-sidebar.scss');

class Header extends Component {
  toggleSidebar() {
    store.dispatch(toggleMenu(true));
  }

  toggleSelectMode() {
    this.props.toggleSelectMode();
  }

  renderCloseActionIcon() {
    return (
      <span>
        <a onClick={this.toggleSelectMode.bind(this)} className="action-close">
          CLOSE <i className="fa fa-close" />
        </a>
      </span>
    );
  }

  renderSelectedPhotoActionIcons() {
    return (
      <span>
        <a onClick={this.toggleSelectMode.bind(this)}>
          <i className="fa fa-download" /> Download
        </a>

        <a onClick={this.toggleSelectMode.bind(this)}>
          <i className="fa fa-share" /> Share
        </a>
      </span>
    );
  }

  renderActionIcons() {
    let selectedPhotoActions;
    if (this.props.isGalleryInSelectMode) {
      if (this.props.selectedPhotosCount > 0) {
        selectedPhotoActions = this.renderSelectedPhotoActionIcons();
      }

      return (
        <span>
          {selectedPhotoActions}
          {this.renderCloseActionIcon()}
        </span>
      );
    }

    return (
      <a onClick={this.toggleSelectMode.bind(this)}>
        <span>SELECT <i className="fa fa-check-circle-o" /></span>
      </a>
    );
  }

  render() {
    return (
      <header>
        <div className="flexbox-horizontal">
          <div className="logo">
            <a onClick={this.toggleSidebar}>
              <span><i className="fa fa-bars" /></span>
            </a>
          </div>
          <div className="actions">
            {this.renderActionIcons()}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const { gallery: { isInSelectMode, selectedPhotos } } = state;

  return {
    isGalleryInSelectMode: isInSelectMode,
    selectedPhotosCount: selectedPhotos ? selectedPhotos.length : 0
  };
};

export default connect(mapStateToProps, { toggleSelectMode })(Header);
