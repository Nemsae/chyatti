import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import ChatRooms from './components/ChatRooms';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home} />
      <Route path='chatrooms' component={ChatRooms} />
    </Route>
  </Router>,
  document.getElementById('root')
);
