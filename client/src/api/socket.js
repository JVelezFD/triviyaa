// Setting up Socket IO client

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://trviyaa.herokuapp.com";
export const socket = socketIOClient(ENDPOINT);