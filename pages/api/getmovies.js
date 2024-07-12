import { mongooseConnect } from "@/lib/mongoose";
import Movie from "@/models/Movie"; 

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect(); // Connect to MongoDB

    if (method === 'GET') {
        try {
            let movies;

            // Handle different query parameters
            if (req.query.id) {
                movies = await Movie.findById(req.query.id);
                res.json(movies.reverse());
            } else if (req.query.title) {
                movies = await Movie.find({ title: req.query.title });
                res.json(movies.reverse());
            } else if (req.query.titleCategory) {
                movies = await Movie.find({ titleCategory: req.query.titleCategory });
                res.json(movies.reverse());
            } else if (req.query.genre) {
                movies = await Movie.find({ genre: req.query.genre });
                res.json(movies.reverse());
            } else if (req.query.category) {
                movies = await Movie.find({ category: req.query.category });
                res.json(movies.reverse());
            } else if (req.query.slug) {
                movies = await Movie.find({ slug: req.query.slug });
                res.json(movies.reverse());
            } else {
                movies = await Movie.find(); // Fetch all movies if no specific query
                res.json(movies.reverse());
            }

            // Reverse movies to get the latest first
         
            
        } catch (error) {
            console.error('Error fetching movies:', error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
