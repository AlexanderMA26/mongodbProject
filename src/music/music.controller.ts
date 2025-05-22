import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { MusicService } from "./music.service";

@Controller('music')
export class MusicController{
    constructor(private readonly musicService: MusicService){}

    @Get()
    async getAllProducts(){
        const products = await this.musicService.getSongs();
        return products;
    }

    @Post()
    async addProduct(
    @Body('title') songTitle: string, 
    @Body('description') songArtist: string, 
    @Body('price') songRD: number) {
        
        const generatedID = await this.musicService.insertSong(songTitle, songArtist, songRD);
        return {id: generatedID};
    }


}

