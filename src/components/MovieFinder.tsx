"use client";

import { IMovieFinder } from "@/app/page";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { MovieState, favorite } from "@/app/lib/features/Movie/movie.reducer";
import { useDispatch, useSelector } from "react-redux";

const MovieFinder = ({ movies }: { movies: IMovieFinder[] }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state: MovieState) => state);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        rowSpacing={1}
      >
        {movies.map((item) => {
          const favItemMovie = state.favorites.find(
            (obj) => obj.id === item.id
          );

          return (
            <Grid item xs={2} sm={4} md={4} key={item.id} mb={"16px"}>
              <Card
                sx={{
                  maxWidth: 345,
                  maxHeight: 500,
                  boxShadow: "none"
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={
                    item.widescreen_url || "/assets/images/image-not-found.jpg"
                  }
                />
                <CardContent>
                  <Typography gutterBottom noWrap>
                    {item.title_en} - {item.title_th}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.synopsis_th}
                  </Typography>
                </CardContent>

                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                      let favMovie = state.favorites;
                      if (!favItemMovie) {
                        favMovie = [...favMovie, item];
                      } else {
                        favMovie = favMovie.filter((obj) => obj.id !== item.id);
                      }
                      dispatch(favorite(favMovie));
                    }}
                  >
                    {favItemMovie ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </IconButton>

                  <Button
                    size="small"
                    onClick={() => {
                      router.push(`/${item.id}`);
                    }}
                  >
                    See More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MovieFinder;
