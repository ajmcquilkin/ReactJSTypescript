import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import WelcomeRedux from '../welcome';
import Test from '../test';
import Fallback from '../fallback';

/**
 * This history is loaded from the redux state in src/index.ts
 * When the URL location within the app changes, this will be logged to redux
 */
interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => (
  <ConnectedRouter history={history}>
    <div id="app-container">
      <Switch>
        <Route exact path="/" component={WelcomeRedux} />
        <Route path="/test" render={() => <Test testString="Test String" />} />
        <Route component={Fallback} />
      </Switch>
    </div>
  </ConnectedRouter>
);

export default App;
