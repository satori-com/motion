import React, { PureComponent } from 'react';
import Types from 'prop-types';
import { buildTransform } from '../lib/utils';
import Coordinates from './Coordinates';
import PhoneSVG from './PhoneSVG';
import SatoriLogoSVG from './SatoriLogoSVG';
import AvatarSVG from './AvatarSVG';
import ArrowSVG from '../resources/Arrow.svg';

class Phone extends PureComponent {
  render() {
    const {
      isDefault,
      participant = { alpha: 0, beta: 0, gamma: 0 },
      showCoords = true,
      showRotation = true,
    } = this.props;
    const transform = (isDefault || !showRotation) ? '' : buildTransform(participant);

    return (
      <div className="phone-container">
        <div className="phone" style={{ transform }}>
          {isDefault
            ? <SatoriLogoSVG />
            : <AvatarSVG avatar={participant.avatar} color={participant.color} />
          }
          {(isDefault || !showRotation) && (
            <div>
              <img alt="rotation arrow 1" className="arrow arrow1" src={ArrowSVG} />
              <img alt="rotation arrow 2" className="arrow arrow2" src={ArrowSVG} />
            </div>
          )}

          <PhoneSVG />
        </div>
        {showCoords && <Coordinates participant={participant} />}
      </div>
    );
  }
};

Phone.propTypes = {
  isDefault: Types.bool,
  participant: Types.shape({
    alpha: Types.number.isRequired,
    beta: Types.number.isRequired,
    gamma: Types.number.isRequired,
  }),
  showCoords: Types.bool,
  showRotation: Types.bool,
};

export default Phone;
