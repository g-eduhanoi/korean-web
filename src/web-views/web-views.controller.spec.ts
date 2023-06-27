import { Test, TestingModule } from '@nestjs/testing';
import { WebViewsController } from './web-views.controller';

describe('WebViewsController', () => {
  let controller: WebViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebViewsController],
    }).compile();

    controller = module.get<WebViewsController>(WebViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
