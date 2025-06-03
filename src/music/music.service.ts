import { Injectable, NotFoundException } from "@nestjs/common";
import { Song } from "./music.model";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";

@Injectable()
export class MusicService {
    constructor(@InjectModel('Music') private readonly musicModel: Model<Song>) {}

    // Inserting a single song
    async insertSong(title: string, artist: string, album: string) {
        const newProduct = new this.musicModel({ title, artist, album });
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getSongs() {
        const songs = await this.musicModel.find().exec();

        return songs.map((song) => ({ id: song.id, title: song.title, artist: song.artist, album: song.album }));
    }
    //Getting a song based on its ID
    async getSingleSong(songID: string) {
        const song = await this.findSongById(songID);

        return { id: song.id, title: song.title, artist: song.artist, album: song.album };
    }

    async deleteProduct(songID: string) { 
        const result = await this.musicModel.deleteOne({ _id: songID }).exec();
        console.log(result);
    }

    async updateProduct(songID: string, title: string, artist: string, album: string) { 
        const updateProduct = await this.findSongById(songID);

        if (title) {
            updateProduct.title = title;
        }
        if (artist) {
            updateProduct.artist = artist;
        }
        if (album) {
            updateProduct.album = album;
        }

        updateProduct.save();
    }

    // Searching songs not by ID (Gemeni)
    async findSongs(searchTerm: string): Promise<Song[]> {
        if (!searchTerm) {
            return [];
        }
        const searchRegex = new RegExp(searchTerm, 'i');

        const songs = await this.musicModel.find({
            $or: [
                { title:searchRegex },
                {artist: searchRegex },
                { album:searchRegex },
            ],
        }).exec();
        return songs;
    }
    //Methods for finding songs by artist, album, or title
    async findSongsByArtist(artistName: string): Promise<Song[]> {
        const searchRegex = new RegExp(artistName, 'i');
        return await this.musicModel.find({ artist: searchRegex }).exec();
    }

    async findSongsByTitle(songTitle: string): Promise<Song[]> {
        const searchRegex = new RegExp(songTitle, 'i');
        return await this.musicModel.find({ title: searchRegex }).exec();
    }

    async findSongsByAlbum(albumName: string): Promise<Song[]> {
        const searchRegex = new RegExp(albumName, 'i');
        return await this.musicModel.find({ album: searchRegex }).exec();
    }


    public async findSongById(id: string): Promise<Song> {
        let song;
        try {
            song = await this.musicModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Song not Found'); 
        }
        if (!song) {
            throw new NotFoundException('Song not Found'); 
        }
        return song;
    }
}