import uuid from 'uuid';
import { getRandomAvatar, getRandomColor } from '@satori-sdk/component-library';
import Cookies from 'js-cookie';
import configs from '../configs';

export function saveUser(user) {
  Cookies.set(configs.cookie, user);
  return user;
}

export function generateUser() {
  return {
    id: uuid(),
    avatar: {
      avatar: getRandomAvatar(),
      color: getRandomColor(),
    },
  };
}

export function getUser() {
  try {
    const user = JSON.parse(Cookies.get(configs.cookie));
    
    if (user.id && user.avatar.avatar && user.avatar.color) {
      return user;
    } else {
      return null;
    }
  } catch(e) {
    return null;
  }
}
