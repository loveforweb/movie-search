const API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const FALLBACK_POSTER =
    'https://via.placeholder.com/300x445?text=No+poster+available';
const FALLBACK_CAST =
    'https://via.placeholder.com/140x178?text=No+image+available';

export { API_KEY, TMDB_BASE_URL, FALLBACK_POSTER, FALLBACK_CAST };
