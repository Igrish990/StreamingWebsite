import { v4 as uuidv4 } from "uuid";

export const TMDB_ENDPOINT = import.meta.env.VITE_TMDB_BASE_URL || "";
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
export const TMDB_IMG_URL = import.meta.env.VITE_IMG_URL || "";

export const pathToSearchAll = "/search/multi";
export const pathToSearchMovie = "/search/movie";
export const pathToSearchTV = "/search/tv";

let requestQueue = [];
let isProcessingQueue = false;
const MAX_REQUESTS_PER_SECOND = 5;
const REQUEST_INTERVAL = 1000 / MAX_REQUESTS_PER_SECOND;

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const { resolve, reject, task } = requestQueue.shift();
    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    }
    if (requestQueue.length > 0) {
      await new Promise(r => setTimeout(r, REQUEST_INTERVAL));
    }
  }

  isProcessingQueue = false;
};

export const fetcher = (url, params = {}) => {
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'en-US',
    ...params
  }).toString();

  const finalUrl = `${url}${url.includes('?') ? '&' : '?'}${queryParams}`;
  
  const task = () => fetch(finalUrl).then((res) => {
    if (res.status === 429) {
      throw new Error("Too Many Requests. Please slow down.");
    }
    if (!res.ok) throw new Error(`API Error: ${res.status} - ${res.statusText}`);
    return res.json();
  });

  return new Promise((resolve, reject) => {
    requestQueue.push({ resolve, reject, task });
    processQueue();
  });
};

export const getTrending = async (type = "all", time = "day", page = 1) => {
  const url = `${TMDB_ENDPOINT}/trending/${type}/${time}`;
  return fetcher(url, { page });
};

export const getMovieDetails = async (id) => {
  const url = `${TMDB_ENDPOINT}/movie/${id}`;
  return fetcher(url, { append_to_response: 'credits,videos,images' });
};

export const getTVDetails = async (id) => {
  const url = `${TMDB_ENDPOINT}/tv/${id}`;
  return fetcher(url, { append_to_response: 'credits,videos,images' });
};

export const getSeasonDetails = async (id, seasonNumber = 1) => {
  const url = `${TMDB_ENDPOINT}/tv/${id}/season/${seasonNumber}`;
  return fetcher(url);
};

export const getExternalIds = async (type, id) => {
  const url = `${TMDB_ENDPOINT}/${type}/${id}/external_ids`;
  return fetcher(url);
};

export const getEpisodeExternalIds = async (id, season, episode) => {
  const url = `${TMDB_ENDPOINT}/tv/${id}/season/${season}/episode/${episode}/external_ids`;
  return fetcher(url);
};

export const getRecommendations = async (type, id, page = 1) => {
  const url = `${TMDB_ENDPOINT}/${type}/${id}/recommendations`;
  return fetcher(url, { page });
};

export const getSimilar = async (type, id, page = 1) => {
  const url = `${TMDB_ENDPOINT}/${type}/${id}/similar`;
  return fetcher(url, { page });
};

export const getGenres = async (type = 'movie') => {
  const url = `${TMDB_ENDPOINT}/genre/${type}/list`;
  return fetcher(url);
};

export const discoverMedia = async (type = 'movie', params = {}) => {
  const url = `${TMDB_ENDPOINT}/discover/${type}`;
  return fetcher(url, params);
};

export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>
`;

export const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const sliceArray = (arr, limit) => {
  return arr.slice(0, limit);
};
