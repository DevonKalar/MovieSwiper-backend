import { Router, Request, Response } from 'express';
import { tmdbService } from '../../services/tmdbService';

const moviesRouter = Router();

// Endpoint to get movie details by ID

moviesRouter.get('/details/:id', async (req: Request, res: Response) => {
    try {
        const movieId = parseInt(req.params.id, 10);
        const movieDetails = await tmdbService.fetchMovieDetails(movieId);
        if (!movieDetails) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movieDetails);
    } catch (error) {
        console.error("Error fetching movie details:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

moviesRouter.get('/movies', async (req: Request, res: Response) => {
    try {
        const movies = await tmdbService.fetchMoviesByQuery(req);
        res.json(movies);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

moviesRouter.get('/genres', async (req: Request, res: Response) => {
    try {
        const genres = await tmdbService.fetchGenres();
        res.json(genres);
    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default moviesRouter;