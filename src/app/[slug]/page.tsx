"use client";

import LayoutDashboard from "@/components/LayoutDashboard";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { getDetail } from "./action";
import { useEffect, useState } from "react";
import { IMovieFinder } from "../page";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { MovieState, favorite } from "../lib/features/Movie/movie.reducer";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

const DetailPage = ({ params }: { params: { slug: string } }) => {
  const id = parseInt(params.slug);
  const [detail, setDetail] = useState<IMovieFinder | null>(null);
  const dispatch = useDispatch();
  const state = useSelector((state: MovieState) => state);
  const favItemMovie = state.favorites.find((obj) => obj.id === detail?.id);
  const router = useRouter();

  const getMovieDetail = async () => {
    const data = await getDetail(id);

    setDetail(data);
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <LayoutDashboard>
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={4}
        >
          <Box display={"flex"} gap={"8px"}>
            <Typography variant="h5">
              {detail?.title_th} - {detail?.title_en}
            </Typography>
            <Button
              variant="outlined"
              startIcon={
                favItemMovie ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />
              }
              onClick={() => {
                let favMovie = state.favorites;
                if (!favItemMovie && detail) {
                  favMovie = [...favMovie, detail];
                } else {
                  favMovie = favMovie.filter((obj) => obj.id !== detail?.id);
                }
                dispatch(favorite(favMovie));
              }}
            >
              Favorite
            </Button>
          </Box>

          <Typography variant="body1">
            Category: {detail?.genre}, Rating: {detail?.rating}
          </Typography>
          {detail?.widescreen_url && (
            <img
              src={detail.widescreen_url}
              alt=""
              style={{ maxHeight: 400 }}
            />
          )}

          <Typography variant="body2">{detail?.synopsis_th}</Typography>
        </Box>
      </Container>
    </LayoutDashboard>
  );
};

export default DetailPage;
