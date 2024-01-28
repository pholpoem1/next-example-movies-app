"use client";

import Container from "@mui/material/Container";
import LayoutDashboard from "@/components/LayoutDashboard";
import MovieFinder from "@/components/MovieFinder";
import { useEffect, useState } from "react";
import { getMovies } from "./action";
import { Pagination } from "@mui/material";

export interface IMovieFinder {
  id: number;
  title_en: string;
  title_th: string;
  rating: string;
  genre: string;
  widescreen_url: string;
  synopsis_th: string;
}

const PAGE_SIZE = 20;

const Dashboard = () => {
  const [page, setPage] = useState<number>(1);
  const [moviesList, setMoviesList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const getMovieHandler = async () => {
    const res = await getMovies(page, PAGE_SIZE);

    if (res?.movies) {
      setMoviesList(res.movies);
      setTotalPage(res.totalPages);
    }
  };

  useEffect(() => {
    getMovieHandler();
  }, [page]);

  return (
    <LayoutDashboard>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MovieFinder movies={moviesList} />

        <Pagination
          count={totalPage}
          color="primary"
          onChange={(e: any, value: number) => {
            setPage(value);
          }}
          sx={{
            "& .MuiPagination-ul": {
              justifyContent: "center"
            }
          }}
        />
      </Container>
    </LayoutDashboard>
  );
};

export default Dashboard;
