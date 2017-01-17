import React, { PureComponent } from 'react';

class Instruction extends PureComponent {
  render() {
    return (
      <section className="instruction-container">
        <ol className="instruction">
          <li data-step-number="1" className="instruction-step">
            <p>On your mobile device, open your unique URL from the share button below.</p>
          </li>
          <li data-step-number="2" className="instruction-step">
            <p>Click "Start connection".</p>
          </li>
          <li data-step-number="3" className="instruction-step">
            <p>Rotate your device and watch it move in real time! Supports multiple devices.</p>
          </li>
        </ol>
      </section>
    );
  }
};

export default Instruction;
