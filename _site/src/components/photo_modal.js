import React, { Component } from 'react';

class PhotoModal extends Component {
  componentDidMount() {
    const fillPercent = this.props.ModalPercentOfViewport || 90;
    const {
      ImageWidth,
      ImageHeight
    } = this.props;

    const modalContentElement = document.getElementsByClassName('rrm-content')[0];
    const photoModalElement = document.getElementsByClassName('photo-modal')[0];

    if (modalContentElement && photoModalElement) {
      let ratio = ImageHeight / ImageWidth; // ratio when horizontal image
      if (ratio > 1) ratio = ImageWidth / ImageHeight; // ratio when vertical image

      let reverseRatio = ImageWidth / ImageHeight; // reverse ratio when horizontal image
      if (reverseRatio < 1) {
        reverseRatio = ImageHeight / ImageWidth; // reverse ratio when vertical image
      }

      const newWidth = ImageWidth > ImageHeight ? fillPercent : fillPercent * ratio;
      const newHeight = ImageWidth > ImageHeight ? fillPercent * ratio : fillPercent;
      const maxWidth = ImageWidth > ImageHeight ? fillPercent * reverseRatio : fillPercent;
      const maxHeight = ImageWidth > ImageHeight ? fillPercent : fillPercent * reverseRatio;

      const units = ImageWidth > ImageHeight ? 'vw' : 'vh';
      const maxUnits = ImageWidth > ImageHeight ? 'vh' : 'vw';

      photoModalElement.style.paddingBottom = `${newHeight}${units}`;
      modalContentElement.style.width = `${newWidth}${units}`;
      modalContentElement.style.height = `${newHeight}${units}`;
      modalContentElement.style.maxWidth = `${maxWidth}${maxUnits}`;
      modalContentElement.style.maxHeight = `${maxHeight}${maxUnits}`;
    }
  }

  removeThisModal() {
    this.props.removeModal();
  }

  render() {
    const style = {
      backgroundImage: `url('${encodeURI(this.props.ImageUrl)}')`
    };

    return (
      <div
        className="photo-modal"
        style={style}
      />
    );
  }
}

export default PhotoModal;
