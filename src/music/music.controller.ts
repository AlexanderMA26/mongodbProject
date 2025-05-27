import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { MusicService } from "./music.service";

@Controller('music')
export class MusicController{
    constructor(private readonly musicService: MusicService){}
    @Post()
        async addProduct(
        @Body('title') songTitle: string, 
        @Body('artist') songArtist: string, 
        @Body('album') songAlbum: string
        ) {
            
            const generatedID = await this.musicService.insertSong(songTitle, songArtist, songAlbum);
            return {id: generatedID};
        }


    @Get()
    async getAllProducts(){
        const products = await this.musicService.getSongs();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodID: string){
        return this.musicService.getSingleSong(prodID);
    }

    @Delete(':id')
    async removeProduct(@Param('id') songID: string,){
        await this.musicService.deleteProduct(songID);
        return null;
    }

    @Patch(':id')
    async updateProduct(@Param('id') songID: string, @Body ('title') songTitle: string, @Body ('artist') songArtist: string, @Body ('album') songAlbum: string){
       await this.musicService.updateProduct(songID, songTitle, songArtist, songAlbum);
        return null;
    }

    


}

