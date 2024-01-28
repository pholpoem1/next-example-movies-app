import { IMovieFinder } from "@/app/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieState {
  value: number;
  favorites: IMovieFinder[];
}

const initialState: MovieState = {
  value: 0,
  favorites: []
};

const MovieReducer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    favorite(state, action: PayloadAction<IMovieFinder[]>) {
      state.favorites = action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount, favorite } =
  MovieReducer.actions;
export default MovieReducer.reducer;
