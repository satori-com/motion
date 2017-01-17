import configs from '../configs';
import _ from 'lodash';

export function shouldExpire(receivedAt) {
  const now = Date.now();

  if (receivedAt) {
    const delta = now - receivedAt;
    return delta > configs.inactivityDuration;
  }

  return false;
}

export function isMobile() {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

export function isValidMessage(message = {}) {
  return _.every(['avatar', 'color', 'alpha', 'beta', 'gamma', 'deviceId'], key => !_.isUndefined(message[key]));
}

export function buildTransform(participant) {
  const { gamma, alpha, beta } = participant;

  return `rotateZ(${-alpha}deg) rotateX(${beta}deg) rotateY(${-gamma}deg)`;
}

export function removeInactiveParticipants(participants) {
  return _.pickBy(
    participants,
    participant => !shouldExpire(participant.received_at)
  );
}
