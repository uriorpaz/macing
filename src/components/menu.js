import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConnectSlider from './connect_slider';
import BurgerMenu from './burger_menu';

class SidebarWithMenu extends Component {
  renderLoginLogout() {
    if (this.props.facebookUser.id) {
      return (
        <div>Logged In as {this.props.facebookUser.name}</div>
      );
    }

    return (
      <ConnectSlider
        socialId="1657832644469954"
        language="en_US"
        scope="public_profile,email"
        xfbml
        version="v2.8"
      />
    );
  }

  render() {
    return (
      <BurgerMenu customBurgerIcon={false}>
        <div>
          {this.renderLoginLogout()}
        </div>
      </BurgerMenu>
    );
  }
}

const mapStateToProps = ({ facebookUser }) => {
  return {
    facebookUser
  };
};

export default connect(mapStateToProps)(SidebarWithMenu);
