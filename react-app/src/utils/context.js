import React from 'react';
import { io } from "socket.io-client";
// export const socket = io("https://mighty-plateau-63166.herokuapp.com/");
export const socket = io("http://localhost:3000");

export const AuthContext = React.createContext();
export const GeneralContext = React.createContext();
export const StudentContext = React.createContext();