"use client";

import { useSelector } from "react-redux";
import { MovieState } from "../lib/features/Movie/movie.reducer";
import MovieFinder from "@/components/MovieFinder";
import LayoutDashboard from "@/components/LayoutDashboard";
import { Container } from "@mui/material";

const FavortiePage = () => {
  const state = useSelector((state: MovieState) => state);
  return (
    <LayoutDashboard>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MovieFinder movies={state.favorites} />
      </Container>
    </LayoutDashboard>
  );
};

export default FavortiePage;
