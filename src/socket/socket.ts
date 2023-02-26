import { AppService } from './../app.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private appService: AppService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void>    {
    console.log("🚀 ~ file: socket.ts:26 ~ handleSendMessage ~:")
    await this.appService.createMessage(payload);
    this.server.emit('recMessage', payload);
  }

  afterInit(server: Server) {
    console.log("🚀 ~ file: socket.ts:26 ~ afterInit ~:")
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log("🚀 ~ file: socket.ts:26 ~ handleDisconnect ~:")
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log("🚀 ~ file: socket.ts:42 ~ handleConnection :")
    console.log(`Connected ${client.id}`);
  }
}