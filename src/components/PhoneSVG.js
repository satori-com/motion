import React, { PureComponent } from 'react';

export default class PhoneSVG extends PureComponent {
  render() {
    return (
      <svg className="phone-img" version="1.1" id="Layer_1" x="0px" y="0px"
         viewBox="0 0 162.6 332.5" style={{"enableBackground": "new 0 0 162.6 332.5"}}>
        <path d="M152.5,39.9v254.5H9.7V39.9H152.5 M154,38.5H8.3v257.4H154V38.5z M143.5,332.5H19.3
          C8.8,332.6,0.1,324.1,0,313.6V19C0.1,8.4,8.7-0.1,19.3,0h124.2c10.5,0,19,8.5,19,19v294.6C162.5,324,154,332.5,143.5,332.5
          L143.5,332.5z M19.3,2.5C10.1,2.4,2.6,9.8,2.5,19v294.6c0.1,9.2,7.6,16.5,16.8,16.4h124.2c9.1,0,16.5-7.3,16.6-16.4V19
          c0-9.1-7.4-16.5-16.6-16.5H19.3z" />
      </svg>
    );
  }
}
