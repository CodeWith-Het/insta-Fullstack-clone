import React, { useState } from "react";
import { usePost } from "../hooks/usePost"; 
import '../style/createpost.scss'

const CreatePost = () => {
  const { handleCreatePost, loading } = usePost();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");


  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      setPreview(URL.createObjectURL(selectedFile));
    }
  };

   const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a photo first.");

   
    const formData = new FormData();
    formData.append("imgFile", file); // 'imgFile' naam backend ke Multer se match hona chahiye
    formData.append("caption", caption);

    const success = await handleCreatePost(formData);

    if (success) {
      alert("Post created Successfully");
      // Form saaf kar do
      setFile(null);
      setPreview(null);
      setCaption("");
    } else {
      alert("An error occurred during post creation.");
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>

          <form onSubmit={onSubmit}>
              
        {/* Agar preview nahi hai toh File Input dikhao */}
        {!preview ? (
          <div className="upload-box">
            <i className="ri-image-add-line"></i>
            <p>Drag photos here or click to select</p>
            <input type="file" accept="image/*" onChange={onFileChange} />
          </div>
        ) : (
          /* Agar photo select ho gayi toh uska Preview dikhao */
          <div className="preview-box">
            <img src={preview} alt="Preview" />
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
            >
              Change Photo
            </button>
          </div>
        )}

        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows="4"
        ></textarea>

        <button type="submit" disabled={loading || !file}>
          {loading ? "Sharing..." : "Share"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
