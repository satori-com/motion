import React from 'react';
import Types from 'prop-types';
import 'url-search-params-polyfill';
import { Link } from 'react-router-dom';

const PromoVideo = (props) => {
  const roomId = new URLSearchParams(props.location.search).get('roomId');

  return (
    <main className="promoVideo-container">
      <div className="promoVideo-overlay" />
      <iframe
        allowFullScreen
        className="promoVideo"
        frameBorder="0"
        src="https://player.vimeo.com/video/224553869?title=0&byline=0&portrait=0"
        title="Satori Motion Video"
      />
      <Link
        className="link--jumpIn"
        to={{ pathname: roomId ? `/room/${roomId}` : '/', search: 'currentState=main' }}>
        <button className="btn btn--primary">
          Jump in
        </button>
      </Link>
    </main>
  );
};

PromoVideo.propTypes = {
  location: Types.shape({
    search: Types.string.isRequired,
  }).isRequired,
};

export default PromoVideo;
