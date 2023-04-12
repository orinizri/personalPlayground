

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  constructor() {}
  players = {
    playerOne: '',
    playerTwo: ''
  }
  playerOneTurn = true;
  actionsList = [];
  

  @SubscribeMessage('players')
  initializePlayers(@MessageBody() data: any) {
    console.log("data",data)
    if (!this.players.playerOne) 
      this.players.playerOne = data.playerId
    else if (!this.players.playerTwo && this.players.playerOne !== data.playerId)
      this.players.playerTwo = data.playerId;
    console.log("initializePlayers gateway", this.players)

    return this.server.emit('players', this.players);
  }

  @SubscribeMessage('actions')
  getActions(@MessageBody() data: any) {
    this.actionsList.push(data)
    console.log("getActions event gateway", data)
    if (data.playerOneTurn) this.playerOneTurn = !data.playerOneTurn;
    return this.server.emit('actions', this.actionsList, this.playerOneTurn);
  }


  
}