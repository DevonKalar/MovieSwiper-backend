import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    apiKeys: {
        openai: process.env.OPENAI_API_KEY!,
        tmdb: process.env.TMDB_API_KEY!,
    },
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['https://movieswiper.devonkalar.com', 'http://localhost:5173', 'https://movie-swiper-devonkalars-projects.vercel.app', 'https://movie-swiper-git-master-devonkalars-projects.vercel.app' , 'https://movie-swiper-j70b24j6k-devonkalars-projects.vercel.app' ],
};