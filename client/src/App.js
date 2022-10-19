import React, {useEffect, useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";
import ProtectedRoute from "./auth/protected-route";

import { Room, QR, Landing, } from "./pages";

import { GameContainer, SignupButton, LoginButton, LogoutButton, Header, AuthNav, AuthButton,LoginUser, Loading, DisplayGameOver,DisplayUsers   } from './components';

// import CreateRoom from './pages/CreateRoom';


import About from './pages/About.js';

import HowTo from './pages/HowTo.js';



function App({ socket }) {
  const [user, setUser] = useState("")
  const [room, setRoom] = useState("")
  const [admin, setAdmin] = useState(false)

  const [error, setError] = useState(null)
  const [userObject, setUserObject] = useState({})

  const [loggedIn, setLoggedIn] = useState(false)
  const [question, setQuestion] = useState("")
  const [usersInGame, setUsersInGame] = useState([])

  const [gameStarted, setGameStarted] = useState(false)
  const [endOfGame, setEndOfGame] = useState(false)

  const handleStart = () => {
    setGameStarted(true)
    setEndOfGame(false)
    socket.emit("start")
  }

  useEffect(() => {
    // global emits to server socket.io
    socket.on("error", () => {
      setUser("")
      setRoom("")
      setLoggedIn(false)
      setError("username already claimed!")
    })

    socket.on("userInfo", (user) => {
      setUserObject(user)
    })

    socket.on("gameStartedInRoom", () => {
      setEndOfGame(false)
      setGameStarted(true)
    })
    socket.on("timedQuestion", (data) => {
      setQuestion(data)
    })

    socket.on("message", (data) => {
      console.log(data)
    })
    socket.on("roomData", (roomData) => {
      setUsersInGame(roomData.users)
    })

    socket.on("endOfGame", () => {
      setEndOfGame(true)
      setGameStarted(false)
    })
  }, [socket])

  return (
    
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
                exact path="/howto"
                component={HowTo }
              />
              <Route
                exact path="/about"
                component={About }
              />
              <Route
                path="/room/:roomCode"
                component={Room }
              />
              <ProtectedRoute
                path="/createroom"
                component={CreateRoom }
              />
            </Switch>
          </div>
        </div>
      </Router>
  
  );
};

export default App;
