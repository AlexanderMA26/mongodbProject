import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicController } from './music/music.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicSchema } from './music/music.model';
import { MusicService } from './music/music.service';
import { MusicModule } from './music/music.module';


@Module({
  imports: [MusicModule, MongooseModule.forRoot('mongodb+srv://HTXue:TeddyChoe@productscluster.aeogqce.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


