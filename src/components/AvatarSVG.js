import React, { PureComponent } from 'react';
import Types from 'prop-types';
import { SVGAvatar } from '@satori-sdk/component-library';

class AvatarSVG extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const { avatar, color } = this.props;

    return (
      <SVGAvatar
        avatar={avatar}
        color={color}
        className="phone-avatar"
      />
    );
  }
}

AvatarSVG.propTypes = {
  avatar: Types.string.isRequired,
  color: Types.string.isRequired,
};

export default AvatarSVG;
