import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import PromoVideo from './components/PromoVideo';
import uuid from 'uuid';

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/promo-video" component={PromoVideo}/>
      <Route path="/room/:roomId" component={App}/>
      <Route render={() => <Redirect to={`room/${uuid().slice(0, 7)}`} />}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);
