import React from "react";
import { useEffect, useRef, useState } from "react";

const ImageUpload = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (window && containerRef.current) {
      window.cloudinary
        .galleryWidget({
          container: containerRef.current,
          cloudName: "photouploadx",
          mediaAssets: [
            {
              tag: "images",
            },
          ],
        })
        .render();
    }
  }, []);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Photox");
    formData.append("cloud_name", "photouploadx");

    try {
      // Upload image to Cloudinary directly from the client-side
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/photouploadx/image/upload", // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Image uploaded to Cloudinary:", result);

        // Reset form fields after successful upload
        setImage(null);
        setTitle("");
        setDescription("");
        setUploadMessage("Image uploaded successfully."); // Set the success message
      } else {
        console.error(
          "Error uploading image to Cloudinary:",
          response.statusText
        );
        setUploadMessage("Error uploading image to Cloudinary."); // Set an error message
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      setUploadMessage("Error uploading image to Cloudinary."); // Set an error message
    }
    // gallery code
  };

  return (
    <div>
      <h1 className=" text-red-700 text-2xl font-black text-center mt-2">
        photouploadx
      </h1>
      <div className="flex justify-center items-center mt-10">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Image Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Image Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center  w-32 h-10 border border-black  mt-10 cursor-pointer hover:bg-black hover:text-red-700">
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
      <div className="text-red-700 text-2xl font-black text-center mt-2 ">
        {uploadMessage && <p>{uploadMessage}</p>}
      </div>

      <div className="flex justify-center items-center mt-10">
        <div
          ref={containerRef}
          style={{ width: "1200px", margin: "auto" }}
        ></div>
      </div>
    </div>
  );
};

export default ImageUpload;
