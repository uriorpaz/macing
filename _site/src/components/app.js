import React, { Component } from 'react';
import ReduxModal from 'react-redux-modal';
import SidebarWithMenu from './menu';
import Header from './header';
import Footer from './footer';

require('../assets/stylesheets/app/global.scss');
require('../assets/stylesheets/3rdparty/react-redux-modal.scss');
require('../assets/stylesheets/3rdparty/redux-burger-menu.scss');

class App extends Component {
  render() {
    return (
      <div>
        <SidebarWithMenu />
        <ReduxModal />

        <div className="page">
          <Header />

          <div className="content">
            {this.props.children}
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
