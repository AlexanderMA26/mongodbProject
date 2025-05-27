import * as mongoose from 'mongoose';

export const MusicSchema = new mongoose.Schema({
    title: {type: String, required: true}, 
    artist: {type: String, required: true},
    album: {type: String, required: true},
   
});
export interface Song extends mongoose.Document{
    id: string;
    title: string;
    artist: string;
    album: string
    
    
    };