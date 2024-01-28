"use server";

import { IMovieFinder } from "../page";

export const getDetail = async (id: number) => {
  try {
    const res = await fetch(
      `https://www.majorcineplex.com/apis/get_movie_avaiable`
    );

    const { movies } = await res.json();

    const movie = movies?.find((item: IMovieFinder) => item.id === id);

    return movie;
  } catch (error) {
    console.log("error :>> ", error);
  }
};
