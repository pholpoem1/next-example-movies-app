"use server";

export const getMovies = async (page: number, page_size: number) => {
  try {
    const currentPage = page || 1;
    const startIndex = (currentPage - 1) * page_size;
    const res = await fetch(
      `https://www.majorcineplex.com/apis/get_movie_avaiable`
    );

    const { movies } = await res.json();

    const moviesOnCurrentPage = movies.slice(
      startIndex,
      startIndex + page_size
    );

    return {
      movies: moviesOnCurrentPage,
      totalPages: Math.ceil(movies.length / page_size),
      currentPage
    };
  } catch (error) {
    console.log("error :>> ", error);
  }
};
