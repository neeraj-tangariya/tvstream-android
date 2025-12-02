import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
}

interface MovieState {
  movies: Movie[];
  currentMovie: Movie | null;
}

const initialState: MovieState = {
  movies: [],
  currentMovie: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    playMovie: (state, action: PayloadAction<Movie>) => {
      state.currentMovie = action.payload;
    },
    clearCurrentMovie: state => {
      state.currentMovie = null;
    },
  },
});

export const { addMovie, playMovie, clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;
