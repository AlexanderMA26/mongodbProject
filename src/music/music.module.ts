//Resolve error here when compliling
import { Module } from "@nestjs/common";
import { MusicController } from "./music.controller";
import { MusicService } from "./music.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MusicSchema } from "./music.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: MusicSchema}])],
    controllers: [MusicController],
    providers: [MusicService]
})

export class MusicModule{}