import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { failRes } from '@/common/utils';
import { ServerResponseCode } from '@/common/enums';

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');
  // 存储用户 ID 和 Socket 实例的映射
  private clients: Map<string, Socket> = new Map();

  /**
   * 这个方法会在 WebSocketGateway 实例化后调用。
   * @param server WebSocket 服务器实例
   */
  afterInit(server: Server) {
    this.logger.log('Init', server);
  }

  /**
   * 这个方法会在客户端连接到服务器后调用。
   * @param client 客户端实例
   */
  handleConnection(client: Socket, ...args: any[]) {
    console.log('handleConnection', args);

    const userId = client.handshake.query.userId as string;
    if (!userId) failRes(ServerResponseCode.UNAUTHORIZED, '缺少用户 ID');

    this.clients.set(userId, client);
    this.logger.log(`Client connected: ${client.id}`);
  }

  /**
   * 这个方法会在客户端断开连接后调用。
   * @param client 客户端实例
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * 这个方法会在客户端发送消息后调用。
   * @param client 客户端实例
   * @param payload 消息内容
   */
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('msgToClient', payload);
  }

  /**
   * 发送消息给指定用户
   * @param userId 用户 ID
   * @param payload 消息内容
   */
  sendToUser(userId: string, payload: any) {
    const client = this.clients.get(userId);
    if (client) client.emit('msgToClient', payload);
  }
}
