import { useState } from "react";

const ImageUpload = ({ updatePGDetails }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImages(imageURLs);
    updatePGDetails("images", imageURLs);
  };

  return (
    <section className="p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Upload PG Images</h2>
      <input type="file" multiple onChange={handleImageChange} />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Uploaded ${index}`} className="w-full h-32 object-cover rounded-md" />
        ))}
      </div>
    </section>
  );
};

export default ImageUpload;
