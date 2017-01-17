import React, { PureComponent } from 'react';
import Types from 'prop-types';
import _ from 'lodash';
import Phone from './Phone';

class Phones extends PureComponent {
  render() {
    const { participants, showRotation } = this.props;

    return (
      <div className="phone-demo">
        {_.isEmpty(participants)
          ? <Phone isDefault />
          : _.map(participants, (participant, key) => <Phone key={key} participant={participant} showRotation={showRotation} />)
        }
      </div>
    );
  }
}

Phones.propTypes = {
  participants: Types.object.isRequired,
  showRotation: Types.bool,
};

export default Phones;
