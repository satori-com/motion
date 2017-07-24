import React, { PureComponent } from 'react';
import Types from 'prop-types';
import ConsoleSvg from '../resources/ic_code.svg';
import ShareSvg from '../resources/Share.svg';
import { ShareContainer } from '@satori-sdk/component-library';

class FloatingNav extends PureComponent {
  render() {
    const { onConsoleClick, participantsCount, showConsole, showParticipants } = this.props;

    return (
      <section className="floatingNav">
        {
          showParticipants &&
          <section className="floatingNav-item floatingNav-devices">
            <div className="participantsCount">{participantsCount}</div>
            <div>Devices</div>
          </section>
        }
        <div className="floatingNav-actionItems">
          {
            showConsole &&
            <section
              className="floatingNav-item floatingNav-console"
              onClick={onConsoleClick}
            >
              <img
                className="share-img"
                src={ConsoleSvg}
                alt="Console"
              />
              <div>Inspect</div>
            </section>
          }
          <section ref="share" className="floatingNav-item floatingNav-share">
            <ShareContainer
              className="shareTrigger"
              placement="left"
              showQR
            >
              <img
                className="share-img"
                src={ShareSvg}
                alt="Share URL"
              />
              <div>Share</div>
            </ShareContainer>
          </section>
        </div>
      </section>
    );
  }
}

FloatingNav.propTypes = {
  showConsole: Types.bool.isRequired,
  showParticipants: Types.bool.isRequired,
  participantsCount: Types.number,
};

export default FloatingNav;
