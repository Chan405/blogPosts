import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

function SinglePost({ post }) {
  return (
    <Card class="h-40 flex items-center mx-8  my-4 bg-stone-200 rounded-xl cursor-pointer">
      <CardContent className="flex items-center">
        <img
          src={post.img}
          alt="image"
          style={{ width: "200px", height: "130px" }}
        />

        <Box className="ml-6 w-11/12">
          <Typography class="text-xl text-orange-600">{post.title}</Typography>
          <Typography class="text-orange-600">
            {truncateDescription(post.description)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function truncateDescription(description, maxLength = 20) {
  const words = description.split(" ");
  if (words.length <= maxLength) {
    return description;
  } else {
    const truncatedDescription = words.slice(0, maxLength).join(" ");
    return `${truncatedDescription}...`;
  }
}

{
  /* <div className="post">
      <img src={post.img} alt="sample" />

      <div>
        <h2> {post.title} </h2>
        <p> {post.description} </p>
        <span> 2. 12. 2024 </span>
      </div>
    </div> */
}

export default SinglePost;
