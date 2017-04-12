import React, { Component } from 'react';

require('../assets/stylesheets/app/footer.scss');

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="tabs flexbox-horizontal">
          <div>Album</div>
          <div>Friends</div>
          <div>Me</div>
          <div>Share</div>
          <div>More</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
