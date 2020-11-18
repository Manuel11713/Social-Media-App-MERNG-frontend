import './App.css';
import Router from './Router';

import {Provider as ReduxProvider} from 'react-redux';
import store from './store';

import { ApolloProvider } from '@apollo/client';
import clientApollo from './apolloClient';

function App() {
  return (
      <ReduxProvider store={store}>
        <ApolloProvider client={clientApollo}>
          <Router/>
        </ApolloProvider>
      </ReduxProvider>
  );
}

export default App;
