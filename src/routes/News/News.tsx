import { Box, Button, Grid, Toolbar } from "@material-ui/core";
import { Launch } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Flex } from "../../components/Flex";
import { Header } from "../../components/Header";
import { LoadingView } from "../../components/LoadingView";
import Links from "../../constants/links";
import { debug } from "../../utils";
import { NewsCard } from "./components/NewsCard";

export interface MediumPost {
  author: string;
  categories: string[];
  content: string;
  description: string;
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
}

export const News = () => {
  const [mediumPosts, setMediumPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(Links.mediumFeed, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((mediumObj) => {
        debug(mediumObj);
        setMediumPosts(mediumObj.items);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Toolbar />
      {loading ? (
        <LoadingView />
      ) : (
        <Box pt={2}>
          <Header
            title="News"
            subtitle="Latest News & Events from DeFiat"
            align="center"
          />
          <Grid container spacing={3} direction="column">
            {mediumPosts &&
              mediumPosts.length > 0 &&
              mediumPosts.map((post: MediumPost, i: number) => (
                <Grid item key={i}>
                  <NewsCard post={post} />
                </Grid>
              ))}
          </Grid>
          <Flex center mt={3}>
            {/* <Typography variant="body1" align="center">See More News</Typography> */}
            <Button href={Links.medium} endIcon={<Launch />} color="primary">
              See More News
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
