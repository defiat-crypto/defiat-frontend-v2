import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { ArrowForwardRounded } from "@material-ui/icons";
import React from "react";
import { Card } from "../../../components/Card";
import { Flex } from "../../../components/Flex";
import { MediumPost } from "../News";
import { NewsChip } from "./NewsChip";

interface NewsCardProps {
  post: MediumPost;
}

const useStyles = makeStyles((theme) => ({
  text: {
    height: "auto",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "240px",
    },
    [theme.breakpoints.only("sm")]: {
      maxWidth: "400px",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "auto",
    },
  },
}));

export const NewsCard: React.FC<NewsCardProps> = ({ post }) => {
  const classes = useStyles();
  const { title, author, pubDate, link, thumbnail, categories, content } = post;

  return (
    <Card>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={3}>
          <Flex center>
            <img src={thumbnail} alt={title} width="220px" height="110" />
          </Flex>
        </Grid>
        <Grid item sm={12} lg={9}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {pubDate} - {author}
          </Typography>
          {categories && categories.length ? (
            <Flex mb={1}>
              {categories.slice(0, 5).map((category, i) => (
                <NewsChip key={i} label={category} />
              ))}
            </Flex>
          ) : (
            <Flex mb={1}>
              <NewsChip label="DeFiat" />
              <NewsChip label="DFT" />
            </Flex>
          )}
          <Box className={classes.text}>
            <Typography variant="body1" align="left" display="block" paragraph>
              {content
                .slice(0, 500)
                .replace(/<\/?[^>]+(>|$)/g, "")
                .toString()}
              ...
            </Typography>
          </Box>
          <Button
            href={link}
            target="_blank"
            rel="noreferrer,noopener"
            color="primary"
            variant="contained"
            endIcon={<ArrowForwardRounded />}
          >
            Read More
          </Button>
        </Grid>
      </Grid>
    </Card>
    // </Flex>
  );
};
