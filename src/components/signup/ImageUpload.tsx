import { useState } from "react";

interface ImageUploadProps {
  onImageChange: (file: File | null, preview: string | null) => void;
  imagePreview: string | null;
}

const ImageUpload = ({ onImageChange, imagePreview }: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
        Profile Image *
      </label>
      <div className="mt-1 flex items-center space-x-4">
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          required
        />
        <label
          htmlFor="image"
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Upload Image
        </label>
        {imagePreview && (
          <div className="relative w-20 h-20">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;