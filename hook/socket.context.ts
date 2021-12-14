import { createContext } from 'react';
import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://localhost:3001');

export const SocketContext = createContext(socket);
