import React from 'react';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Auth0 imports
// import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
// import ProtectedRoute from "./auth/protected-route";
//Compnent imports
import { GameRoom, Landing, About, HowTo } from "./pages";
import { Header } from './components';


// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

function App() {
  // const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    // <ApolloProvider client={client}>
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
                exact path="/howto"
                component={HowTo }
              />
              <Route
                exact path="/about"
                component={About }
              />
              <Route
                path="/gameroom"
                component={ GameRoom }
              />
            </Switch>
          </div>
        </div>
      </Router>
    // </ApolloProvider>
  );
};

export default App;
