import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slider';
import { facebookLoginSuccess } from '../actions';

const SLIDER_MIN = 0;
const SLIDER_MAX = 100;

class ConnectSlider extends Component {
  componentDidMount() {
    (function (d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
      FB.init({
        appId: this.props.socialId,
        xfbml: this.props.xfbml,
        cookie: this.props.cookie,
        version: this.props.version,
      });

      FB.getLoginStatus(({ status, authResponse }) => {
        if (status === 'connected') {
          this.responseApi(authResponse);
        }
      });
    };
  }

  responseApi(authResponse) {
    FB.api('/me', { fields: this.props.fields }, (me) => {
      me.accessToken = authResponse.accessToken;
      this.props.facebookLoginSuccess(me);
    });
  }

  checkLoginState(response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    }
  }

  onSliderChange(value) {
    if (value === SLIDER_MAX) {
      FB.login(this.checkLoginState.bind(this), { scope: this.props.scope });
    }
  }

  render() {
    return (
      <div className="connect-slider">
        <div className="slider-background">
          Slide to Connect
        </div>
        <div className="slider-container">
          <Slider
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={1}
            className="horizontal-slider"
            onChange={this.onSliderChange.bind(this)}
          >
            <div className="connect-slider-handle">
              <span className="fa fa-facebook" />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

export default connect(null, { facebookLoginSuccess })(ConnectSlider);
