import React, { Component } from 'react';
import Types from 'prop-types';
import 'url-search-params-polyfill';
import configs from './configs';
import { subscribe, unsubscribe } from './lib/rtm';
import { saveUser, getUser, generateUser } from './lib/user';
import { isMobile, isValidMessage, removeInactiveParticipants } from './lib/utils';
import AppMobile from './components/AppMobile';
import AppDesktop from './components/AppDesktop';
import { AppShell, AppHeader } from '@satori-sdk/component-library';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.participants = {};
    this.state = {
      participants: this.participants,
      user: getUser() || saveUser(generateUser()),
      isMobile: isMobile(),
    };

    this.animationStep = this.animationStep.bind(this);
    this.lastCleanup = Date.now();
  }

  componentDidMount() {
    const { roomId } = this.props.match.params;

    subscribe(roomId, (message) => {
      if (isValidMessage(message)) {
        const participants = {
          ...this.participants,
          [message.deviceId]: {
            ...message,
            received_at: Date.now(),
          },
        };
        this.participants = participants;
        this.latestMessage = message;
      }
    });

    this.animationStep();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    cancelAnimationFrame(this.renderId);
    unsubscribe();
  }

  // render strategy: use requestAnimationFrame hook to batch update the latest device positions
  animationStep() {
    const now = Date.now();

    if (now - this.lastCleanup > configs.cleanupInterval) {
      this.lastCleanup = now;
      this.participants = removeInactiveParticipants(this.participants);
    }

    this.state.participants = this.participants; // eslint-disable-line
    this.state.latestMessage = this.latestMessage; // eslint-disable-line
    // using forceUpdate instead of setState to do the update immediately as part of requestAnimationFrame
    this.forceUpdate();
    this.renderId = requestAnimationFrame(this.animationStep);
  }

  render() {
    const { roomId } = this.props.match.params;
    const { isMobile, latestMessage, participants, user } = this.state;
    const currentState = new URLSearchParams(this.props.location.search).get('currentState');

    return (
      <AppShell>
        <AppHeader projectUrl="https://github.com/satori-com/motion"/>
        <main>
          {isMobile
            ? <AppMobile participants={participants} roomId={roomId} currentState={currentState} user={user} />
            : <AppDesktop latestMessage={latestMessage} participants={participants} />
          }
        </main>
      </AppShell>
    );
  }
}

App.propTypes = {
  location: Types.shape({
    search: Types.string.isRequired,
  }).isRequired,
  match: Types.shape({
    params: Types.shape({
      roomId: Types.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default App;
