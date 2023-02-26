import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async createMessage(data: any) {
    console.log("data create",data)
  }

  async getMessages() {
    console.log("data get")
  }
}
