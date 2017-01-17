import React, { PureComponent } from 'react';
import Types from 'prop-types';

class Coordinates extends PureComponent {
  render() {
    const { participant } = this.props;

    return (
      <section className="phone-coords">
        <div>
          <span>X:&nbsp;</span>
          <span>{participant.beta}</span>
        </div>
        <div>
          <span>Y:&nbsp;</span>
          <span>{participant.gamma}</span>
        </div>
        <div>
          <span>Z:&nbsp;</span>
          <span>{participant.alpha}</span>
        </div>
      </section>
    );
  }
}

Coordinates.propTypes = {
  participant: Types.shape({
    alpha: Types.number.isRequired,
    beta: Types.number.isRequired,
    gamma: Types.number.isRequired,
  }).isRequired,
};

export default Coordinates;
