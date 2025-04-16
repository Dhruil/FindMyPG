import { useState } from "react";
import { FaImage } from "react-icons/fa";

const ImageUpload = ({ updatePGDetails }) => {
  const [previewImages, setPreviewImages] = useState([]);

  // Handle image selection and preview
  const handleImageSelection = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);
    updatePGDetails("images", files);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mt-6 mb-2">Upload PG Images</h2>
      <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-6 cursor-pointer bg-blue-50 hover:bg-blue-100 transition duration-300">
        <FaImage className="text-blue-500 text-4xl mb-2" />
        <span className="text-gray-600 font-medium">Click to upload images</span>
        <input
          type="file"
          multiple
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageSelection}
        />
      </label>
      
      {previewImages.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt="Uploaded preview"
                className="w-full h-32 object-cover rounded-lg shadow-md group-hover:opacity-75 transition"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

