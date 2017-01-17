import * as utils from 'lib/utils';
import configs from 'configs';

const originalInactivityDuration = configs.inactivityDuration;

beforeEach(() => {
  configs.inactivityDuration = 1000;
});

afterEach(() => {
  configs.inactivityDuration = originalInactivityDuration;
});

describe('shouldExpire function', () => {
  it('returns true if the elapsed time is greater than inactivityDuration', () => {
    expect(utils.shouldExpire(Date.now() - 2000)).toBe(true);
  });

  it('returns false if the elapsed time is less than inactivityDuration', () => {
    expect(utils.shouldExpire(Date.now() - 500)).toBe(false);
  });

  it('returns false if the no receivedAt time is passed in', () => {
    expect(utils.shouldExpire()).toBe(false);
  });
});

describe('isMobile function', () => {
  it('returns true for mobile devices', () => {
    expect(utils.isMobile()).toBe(false);

    Object.defineProperty(window.navigator, 'userAgent', {
      writable: true,
      value: 'iPhone',
    });

    expect(utils.isMobile()).toBe(true);

    Object.defineProperty(window.navigator, 'userAgent', {
      writable: true,
      value: 'iPhone',
    });
  });
});

describe('isValidMessage function', () => {
  it('returns true if the message contains the expected fields', () => {
    const validMessage = {
      alpha: -5,
      avatar: 'avatar5',
      beta: 2,
      color: '#88c440',
      deviceId: 'abc',
      gamma: 0,
      roomId: '80ba136',
    };
    const invalidMessage = {
      // missing alpha
      avatar: 'avatar5',
      beta: 2,
      color: '#88c440',
      deviceId: 'abc',
      gamma: 0,
      roomId: '80ba136',
    };

    expect(utils.isValidMessage(validMessage)).toBe(true);
    expect(utils.isValidMessage(invalidMessage)).toBe(false);
  });
});

describe('buildTransform function', () => {
  it('returns a valid css transform statement', () => {
    const input = {
      alpha: -5,
      beta: 2,
      gamma: 20,
    };

    expect(utils.buildTransform(input)).toEqual('rotateZ(5deg) rotateX(2deg) rotateY(-20deg)');
  });
});

describe('removeInactiveParticipants function', () => {
  it('returns only unexpired participants', () => {
    const now = Date.now();
    const participants = {
      a: { received_at: now - 3000 },
      b: { received_at: now },
      c: { received_at: now - 5000 }
    };

    expect(utils.removeInactiveParticipants(participants)).toEqual({ b: { received_at: now } });
  });
});
