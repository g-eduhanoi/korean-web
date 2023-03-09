import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {

  constructor(private readonly sequelize: Sequelize) {}
  getHello(): string {
    return 'Hello World!';
  }

  onApplicationBootstrap(signal: string) {
    console.log('signal: ', signal); // e.g. "SIGINT"
    console.log(this.sequelize.sync({ force: true }));
  }

}
