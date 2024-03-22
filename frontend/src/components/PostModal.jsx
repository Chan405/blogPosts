import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { postConst } from "../utils/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
};

function PostModal({ openModal, setOpenModal, fetchPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleClose = () => {
    setOpenModal(false);
    setTitle("");
    setDescription("");
    setSelectedFile(null);
  };

  const createPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("img", selectedFile);

    try {
      const { data } = await axios.post(postConst, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);

      if (data) {
        handleClose();
        fetchPosts();
      }
    } catch (e) {
      console.log({ e });
      handleClose();
    }
  };

  const disabled =
    title.trim().length === 0 ||
    description.trim().length === 0 ||
    selectedFile === null;
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <label className="text-orange-600"> Title </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              border: "0.5px solid brown",
              width: "100%",
              height: "38px",
              borderRadius: "10px",
              marginBottom: "16px",
              paddingLeft: "8px",
              color: "brown",
            }}
          />

          <Box>
            <label className="text-orange-600">Description </label>
            <textarea
              value={description}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                border: "0.5px solid brown",
                width: "100%",
                borderRadius: "10px",
                marginBottom: "16px",
                paddingLeft: "8px",
                color: "brown",
              }}
            />
          </Box>

          <label for="fileInput" className="flex items-center cursor-pointer">
            <Box className="bg-orange-700 w-10 h-10 rounded-full flex justify-center items-center">
              <FaPhotoVideo class="text-white" />
            </Box>

            <label className="text-orange-600 ml-2"> Photo </label>

            <input
              id="fileInput"
              type="file"
              style={{ display: "none", zIndex: 3 }}
              onChange={handleFileChange}
            />

            {selectedFile && (
              <p className="text-orange-600 ml-2">{selectedFile.name}</p>
            )}
          </label>

          <Box className=" flex justify-end">
            <Button
              variant="contained"
              class="bg-white text-orange-700 text-lg border-solid border-2 border-orange-700 rounded-lg py-2 px-4 mt-4 mr-4"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              class={`bg-orange-700 text-white text-lg rounded-lg py-2 px-4 mt-4 ${
                disabled ? "opacity-70" : "opacity-100"
              }`}
              onClick={createPost}
              disabled={disabled}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostModal;
