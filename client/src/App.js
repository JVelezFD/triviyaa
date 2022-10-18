import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import ProtectedRoute from "./auth/protected-route";

import { Room, QR, CreateRoom, Landing, Profile } from "./pages";

import { Header } from './components';

// import CreateRoom from './pages/CreateRoom';

// import Room from './pages/Room';

// import QR from './pages/QR';

// import Landing from './pages/Landing.js';




const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>

              <Route
                exact path="/"
                component={ Landing }
              />
              <Route
                path="/landing"
                element={< Landing />}
              />
              {/* Create a route to display a single thought's comments based on its `thoughtId` provided in the URL */}
              <Route
                exact path="/qr"
                component={QR }
              />
              <Route
                path="/room/:roomCode"
                component={Room }
              />
              <ProtectedRoute
                path="/createroom"
                component={CreateRoom }
              />
              <ProtectedRoute
                path="/profile"
                component={Profile }
              />

            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
