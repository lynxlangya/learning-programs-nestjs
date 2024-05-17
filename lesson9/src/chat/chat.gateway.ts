import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IsString, validate } from 'class-validator';

class MessagePayload {
  @IsString()
  sender: string;

  @IsString()
  room: string;

  @IsString()
  message: string;
}

// 允许所有源连接
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  /**
   * @description: After init event [网关初始化时调用]
   * @param server: Server 实例
   * @returns void
   */
  afterInit(server: Server) {
    console.log('Init', server);
  }

  /**
   * @description: 当客户端连接时调用
   * @param client: Socket 客户端实例
   * @param args: any[] 参数
   * @returns void
   */
  handleConnection(client: Socket, ...args: any[]) {
    console.log('Connected -> args', args);
    console.log('Connected', client.id);
  }

  /**
   * @description: 当客户端断开连接时调用
   * @param client: Socket 客户端实例
   * @returns void
   */
  handleDisconnect(client: Socket) {
    console.log('Disconnected', client.id);
  }

  /**
   * @description: Handle message event [处理消息事件]
   * @param client: Socket 客户端实例
   * @param payload: { sender: string; room: string; message: string; }
   * @returns void
   */
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: MessagePayload): Promise<void> {
    console.log('message', payload);
    // 广播消息到所有客户端
    try {
      const errors = await validate(payload);
      if (errors.length > 0) {
        console.error('Validation failed', errors);
        client.emit('validationError', errors);
        return;
      }

      console.log('Emitting message', payload);

      this.server.emit('message', {
        ...payload,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error', error);
      client.emit('validationError', error);
    }

    // 如果只想广播到指定房间，可以使用如下代码
    // this.server.to(payload.room).emit('message', payload);
  }

  /**
   * @description: 处理加入房间事件
   * @param client: Socket 客户端实例
   * @param room: string  房间名称
   * @returns void
   */
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string): void {
    console.log('joinRoom', room);
    client.join(room);
    client.emit('joinedRoom', room);
  }

  /**
   * @description: 处理离开房间事件
   * @param client: Socket
   * @param room: string
   * @returns void
   */
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string): void {
    console.log('leaveRoom', room);
    client.leave(room);
    client.emit('leftRoom', room);
  }

  /**
   * @description: Handle room message event [处理房间消息事件]
   * @param client: Socket
   * @param payload: { sender: string; room: string; message: string; }
   * @returns void
   */
  @SubscribeMessage('roomMessage')
  handleRoomMessage(
    client: Socket,
    payload: {
      sender: string;
      room: string;
      message: string;
    },
  ): void {
    console.log('roomMessage', payload);
    // 发送消息到指定房间
    this.server.to(payload.room).emit('message', payload);
  }
}
