import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Room from './pages/Room';

import QR from './pages/QR';

import Landing from './pages/Landing.js';

import About from './pages/About.js';

import Header from './components/Header';

import Footer from './components/Footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              {/* Create a route to display a single thought's comments based on its `thoughtId` provided in the URL */}
              <Route 
                path="/QR" 
                element={<QR />}
              />
              <Route 
                path="/room/:roomCode" 
                element={<Room />}
              />
              <Route 
                path="/Landing" 
                element={<Landing />}
              />
              <Route 
                path="/About" 
                element={<About />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
