import React from 'react';
import Types from 'prop-types';
import { Modal } from 'react-overlays';
import { Link } from 'react-router-dom';
import Phone from './Phone';

const WelcomeBody = (props) => {
  const { roomId, start } = props;

  return (
    <div className="welcome-dialog">
      <h2 className="welcomeDialog-title" id='modal-label'>Welcome to Motion</h2>
      <p className="welcomeDialog-text">
        A simple app demonstrating the use of your mobile phone as a live data source. Rotate your device and watch it move in real time!
      </p>
      <Phone isDefault showCoords={false} />
      <button className="btn btn--primary" id="jumpIn" onClick={start}>
        Jump in
      </button>
      <Link
        className="welcome-videoLink"
        to={{ pathname: '/promo-video', search: `?roomId=${roomId}` }}>
        Watch video
      </Link>
    </div>
  )
};

WelcomeBody.propTypes = {
  roomId: Types.string.isRequired,
  start: Types.func.isRequired,
};

const MobileWelcome = (props) => {
  const { show, ...passThroughProps } = props;

  return (
    <Modal
      autoFocus={false}
      backdropClassName="modal-backdrop"
      className="modal"
      show={show}
    >
      <WelcomeBody {...passThroughProps} />
    </Modal>
  );
};

MobileWelcome.propTypes = {
  roomId: Types.string.isRequired,
  show: Types.bool.isRequired,
};

export default MobileWelcome;
