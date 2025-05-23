import { Injectable, NotFoundException } from "@nestjs/common";
import { Song } from "./music.model";
import{InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose";

@Injectable()
export class MusicService{
    constructor(@InjectModel('Music') private readonly musicModel: Model<Song>) {}

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

    async getSingleSong(songID: string){
        const song = await this.findProduct(songID);

        return {id: song.id, title: song.title, artist: song.artist, releaseDate: song.releaseDate};
    }

    async deleteProduct(songID: string){
            const result = await this.musicModel.deleteOne({_id: songID}).exec();
            console.log(result);
        }

        async updateProduct(songID: string, title: string, artist: string, releaseDate: number){
        const updateProduct = await this.findProduct(songID);
    
        if (title){
            updateProduct.title = title;
        }
        if (artist){
            updateProduct.artist = artist;
        }
        if (releaseDate){
            updateProduct.releaseDate = releaseDate;
        }
        updateProduct.save();
    }


    private async findProduct(id: string) : Promise<Song>{
            let product;
            try{
            product = await this.musicModel.findById(id).exec();
            } catch(error){
                throw new NotFoundException('Product not Found');
            }
        if (!product){
            throw new NotFoundException('Product not Found');
        }
        return product;
        }



}