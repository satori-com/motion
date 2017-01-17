import React, { PureComponent } from 'react';
import Types from 'prop-types';
import _ from 'lodash';
import { Console } from '@satori-sdk/component-library';
import FloatingNav from './FloatingNav';
import Instruction from './Instruction';
import Phones from './Phones';

class AppDesktop extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showConsole: false,
    };
    this.toggleConsoleVisibility = this.toggleConsoleVisibility.bind(this);
  }

  toggleConsoleVisibility() {
    this.setState({ showConsole: !this.state.showConsole });
  }

  render() {
    const { latestMessage, participants } = this.props;
    const { showConsole } = this.state;

    return (
      <main className="demo-container">
        <header className="demo-header">
          <h1 className="demo-title">Welcome to Motion</h1>
        </header>
        <Instruction />
        <Phones participants={participants} />
        <FloatingNav
          participantsCount={_.size(participants)}
          onConsoleClick={this.toggleConsoleVisibility}
          showConsole
          showParticipants
        />
        {
          showConsole &&
          <Console
            defaultMessage="No messages yet. Connect a mobile device to see the messages being published."
            className="console"
            message={latestMessage}
          />
        }
      </main>
    );
  }
}

AppDesktop.propTypes = {
  latestMessage: Types.object,
  participants: Types.object.isRequired,
};

export default AppDesktop;
