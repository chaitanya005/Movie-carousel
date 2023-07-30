import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export async function getTopRatedMovies() {
  try {
    const response = await axios.get(`${baseUrl}/movie/top_rated`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return [];
  }
}

export async function getMovieDetails(movieId) {
  try {
    const response = await axios.get(`${baseUrl}/movie/${movieId}`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return [];
  }
}

export async function getMovieCastDetails(movieId) {
  try {
    const response = await axios.get(`${baseUrl}/movie/${movieId}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return [];
  }
}
