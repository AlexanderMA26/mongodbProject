import { Injectable, NotFoundException } from "@nestjs/common";
import { Song } from "./music.model";
import{InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose";

@Injectable()
export class MusicService{
    constructor(@InjectModel('Song') private readonly musicModel: Model<Song>) {}

    async insertSong(title: string, artist: string, releaseDate: number) {
        //const prodID = Math.random().toString();
        const newProduct = new this.musicModel({title, artist: artist, releaseDate});
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getSongs(){
        const songs = await this.musicModel.find().exec();
        
        return songs.map((song) => ({id: song.id, title: song.title, artist: song.artist, release: song.releaseDate}));
    }



}