export default {
  // RTM endpoint URL
  endpoint: process.env.REACT_APP_ENDPOINT,

  // RTM public appkey
  appkey: process.env.REACT_APP_APPKEY,

  // RTM rolename
  rolename: process.env.REACT_APP_ROLENAME,

  // RTM rolekey
  rolekey: process.env.REACT_APP_ROLEKEY,

  // RTM channel
  channel: process.env.REACT_APP_CHANNEL,

  // user cookie key
  cookie: process.env.REACT_APP_COOKIE_PREFIX,

  // amount of elapsed time in ms to consider device inactive  
  inactivityDuration: parseInt(process.env.REACT_APP_INACTIVITY_DURATION, 10),

  // amount of time in ms between task to remove inactive participants
  cleanupInterval: parseInt(process.env.REACT_APP_CLEANUP_INTERVAL, 10),
};
