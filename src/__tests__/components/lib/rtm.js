jest.mock('uuid');

import SatoriSDK from 'satori-rtm-sdk';
import { EventEmitter } from 'events';
import { subscribe, publish } from 'lib/rtm';
const ee = new EventEmitter();

test('it should subscribe with a callback', () => {
  spyOn(SatoriSDK.prototype, 'subscribe').and.returnValue(ee);

  const callback = jest.fn();

  subscribe('room1', callback);
  ee.emit('rtm/subscription/data', { body: { messages: [{ alpha: 3, beta: 3, gamma: 3 }] } });

  expect(callback).toBeCalledWith({ alpha: 3, beta: 3, gamma: 3 });
});

test('it should publish', () => {
  const publishSpy = spyOn(SatoriSDK.prototype, 'publish');
  spyOn(SatoriSDK.prototype, 'isConnected').and.returnValue(true);
  publish({ alpha: 3, beta: 3, gamma: 3 });

  expect(publishSpy).toBeCalledWith('motion', { 'alpha': 3, 'beta': 3, 'gamma': 3 });
});

test('it should not publish if the client is not connected', () => {
  const publishSpy = spyOn(SatoriSDK.prototype, 'publish');
  spyOn(SatoriSDK.prototype, 'isConnected').and.returnValue(false);

  publish({ alpha: 3, beta: 3, gamma: 3 });

  expect(publishSpy).not.toHaveBeenCalled();
});
