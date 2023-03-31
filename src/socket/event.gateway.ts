

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
  spy = '';
  op = '';

  @SubscribeMessage('players')
  getPlayers(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log("data getPlayers", data)
    if (!this.spy) this.spy = "1";
    else if (!this.op) this.op = "2";
    console.log("spy", this.spy, "\n op :", this.op)
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events2', data: item })));
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log("data find all", data)
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events1', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  
}