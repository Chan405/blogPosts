import React, { useEffect, useState } from "react";
import axios from "axios";
import { imageConst, postConst } from "../utils/constants";
import SinglePost from "./Singlepost";
import PostModal from "./PostModal";
import { Box, Card, CardContent } from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const fetchPosts = async () => {
    const { data } = await axios.get(postConst, {
      params: {
        page: currentPage,
        pageSize: 6,
      },
    });
    const tmp = data.posts.map((post) => ({
      ...post,
      img: `${imageConst}/${post.photo}`,
    }));
    setPosts(tmp);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  return (
    <>
      <Card
        class="w-1/2 bg-orange-700 text-white text-lg rounded-xl shadow-lg cursor-pointer mx-auto mt-8 hover:opacity-75 transition-opacity duration-300 "
        onClick={() => setOpenModal(true)}
      >
        <CardContent class="h-14 flex items-center pl-6">
          {" "}
          What's on your mind?{" "}
        </CardContent>
      </Card>

      <Box className="w-1/2 text-white text-lg mx-auto mt-8 flex items-center justify-center ">
        <button onClick={handlePrevPage}>
          <SkipPreviousIcon className="text-orange-600 pointer" />
        </button>
        <span className="text-orange-600 mx-10">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage}>
          <SkipNextIcon className="text-orange-600 cursor-pointer" />
        </button>
      </Box>
      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.length > 0 &&
          posts.map((post) => <SinglePost key={post._id} post={post} />)}
      </Box>

      <PostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchPosts={fetchPosts}
      />
    </>
  );
}

export default Posts;
