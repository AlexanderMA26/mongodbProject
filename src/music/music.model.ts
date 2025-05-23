import * as mongoose from 'mongoose';

export const MusicSchema = new mongoose.Schema({
    title: {type: String, required: true}, 
    artist: {type: String, required: true},
    releaseDate: {type: Number, required: true}
   
});
export interface Song extends mongoose.Document{
    id: string;
    title: string;
    artist: string;
    releaseDate: number;
    
    
    };