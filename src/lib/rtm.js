import RTM from 'satori-rtm-sdk';
import configs from '../configs';

const options = {
  authProvider: configs.rolename && configs.rolekey
    ? RTM.roleSecretAuthProvider(configs.rolename, configs.rolekey)
    : null
};

const client = new RTM(configs.endpoint, configs.appkey, options);

client.start();

export function publish(payload) {
  // only attempt to publish if the client is connected.
  // if connection drops, the sdk will attempt to reconnect
  if (client.isConnected()) {
    client.publish(configs.channel, payload);
  }
}

export function subscribe(roomId, callback) {
  const sat = client.subscribe(
    configs.channel,
    RTM.SubscriptionMode['SIMPLE'],
    {
      filter: `SELECT * FROM \`${configs.channel}\` WHERE roomId='${roomId}'`,
    }
  );

  sat.on('rtm/subscription/data', (frame) => {
    if (frame.body.messages.length) {
      frame.body.messages.forEach((message) => callback(message));
    }
  });

  return sat;
}

export function unsubscribe() {
  client.unsubscribe(configs.channel);
}
