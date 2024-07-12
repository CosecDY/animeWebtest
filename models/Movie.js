import { Schema, model, models } from "mongoose";

const MovieSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    bgPoster: { type: String },
    smPoster: { type: String },
    titleCategory: { type: String },
    description: { type: String },
    rating: { type: String },
    duration: { type: String },
    year: { type: String },
    genres: [{ type: String }],
    language: { type: String },
    subtitle: { type: String },
    size: { type: String },
    quality: { type: String },
    youtubeLink: { type: String },
    category: { type: String },
    watchOnline: { type: String },
    downloadLink: {
        "480p": { type: String },
        "720p": { type: String },
        "1080p": { type: String },
        "4K": { type: String },
    },
    status: { type: String },
}, {
    timestamps: true // auto manage createdAt and updatedAt fields
});

const Movie = models.Movie || model('Movie', MovieSchema, 'movies');

export default Movie;
