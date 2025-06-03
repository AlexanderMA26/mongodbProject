import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from "@nestjs/common";
import { MusicService } from "./music.service";

@Controller('music')
export class MusicController{
    constructor(private readonly musicService: MusicService){}
    //Adding a song
    @Post()
        async addProduct(
        @Body('title') songTitle: string, 
        @Body('artist') songArtist: string, 
        @Body('album') songAlbum: string
        ) {
            
            const generatedID = await this.musicService.insertSong(songTitle, songArtist, songAlbum);
            return {id: generatedID};
        }



        //Getting all products
    @Get()
    async getAllProducts(){
        const products = await this.musicService.getSongs();
        return products;
    }

    @Get('search') // Getting product based on artist, tiitle, or album
  async getSongsBySearchTerm(@Query('q') searchTerm: string) {
    const songs = await this.musicService.findSongs(searchTerm);
    return songs;
  }

  //Getting song based on id
    @Get(':id')
    getProduct(@Param('id') prodID: string){
        return this.musicService.findSongById(prodID);
    }
    //Deleting
    @Delete(':id')
    async removeProduct(@Param('id') songID: string,){
        await this.musicService.deleteProduct(songID);
        return null;
    }
    //Updating
    @Patch(':id')
    async updateProduct(@Param('id') songID: string, @Body ('title') songTitle: string, @Body ('artist') songArtist: string, @Body ('album') songAlbum: string){
       await this.musicService.updateProduct(songID, songTitle, songArtist, songAlbum);
        return null;
    }

    


}