import { Test, TestingModule } from '@nestjs/testing';
import { ChatWebsocketGateway } from './chat.websocket.gateway';

describe('ChatWebsocketGateway', () => {
  let gateway: ChatWebsocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatWebsocketGateway],
    }).compile();

    gateway = module.get<ChatWebsocketGateway>(ChatWebsocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
