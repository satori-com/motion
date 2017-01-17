import React, { PureComponent } from 'react';
import Types from 'prop-types';
import _ from 'lodash';
import { publish } from '../lib/rtm';
import FloatingNav from './FloatingNav';
import MobileWelcome from './MobileWelcome';
import Phones from './Phones';

class AppMobile extends PureComponent {
  constructor(props) {
    super(props);

    this.toggleDeviceOrientationListener = this.toggleDeviceOrientationListener.bind(this);
    this.transmitOrientation = this.transmitOrientation.bind(this);
    this.handleWelcomeStart = this.handleWelcomeStart.bind(this);

    this.state = {
      // this value is used to factor out compass-based orientation, making it relative to initial device orientation
      alphaOffset: null,

      // welcome | main | active
      currentState: props.currentState || 'welcome',
    };
  }

  componentWillUnmount() {
    this.toggleDeviceOrientationListener(false);
  }

  transmitOrientation({ alpha, beta, gamma }) {
    const { roomId, user } = this.props;
    const { alphaOffset } = this.state;

    alpha = Math.round(alpha);
    beta = Math.round(beta);
    gamma = Math.round(gamma);

    // use first datapoint as alpha offset
    if (_.isNull(alphaOffset)) {
      this.setState({ alphaOffset: alpha });
      return;
    }

    publish({
      alpha: alpha - alphaOffset,
      avatar: user.avatar.avatar,
      color: user.avatar.color,
      deviceId: user.id,
      beta,
      gamma,
      roomId,
    });
  }

  toggleDeviceOrientationListener(active=false) {
    if (active) {
      this.setState({ currentState: 'active' });

      return window.addEventListener('deviceorientation', this.transmitOrientation);
    } else {
      this.setState({
        alphaOffset: null,
        currentState: 'main',
      });

      return window.removeEventListener('deviceorientation', this.transmitOrientation);
    }
  }

  handleWelcomeStart(e) {
    e.preventDefault();
    this.setState({ currentState: 'main' });
  }

  render() {
    const { participants, roomId, user } = this.props;
    const { currentState } = this.state;
    const isActive = currentState === 'active';

    return (
      <main className="demo-container">
        <header className="demo-header">
          <h1 className="demo-title">Welcome to Motion</h1>
        </header>

        <p className="description-mobile">Have your desktop open to view Motion in real time with your unique URL</p>
        <Phones participants={isActive ? _.pick(participants, user.id) : {}} showRotation={false} />

        <FloatingNav showConsole={false} showParticipants={false} />

        <button id="toggleConnection" className="btn btn--primary" onClick={this.toggleDeviceOrientationListener.bind(this, !isActive)}>
          {isActive ? 'End connection' : 'Start connection'}
        </button>

        <MobileWelcome
          roomId={roomId}
          show={currentState === 'welcome'}
          start={this.handleWelcomeStart} />
      </main>
    );
  }
}

AppMobile.propTypes = {
  currentState: Types.string,
  participants: Types.object.isRequired,
  roomId: Types.string.isRequired,
  user: Types.shape({
    avatar: Types.shape({
      avatar: Types.string.isRequired,
      color: Types.string.isRequired,
    }).isRequired,
    id: Types.string.isRequired,
  }).isRequired,
};

export default AppMobile;
