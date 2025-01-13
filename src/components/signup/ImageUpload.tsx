import { useState } from "react";
import { Upload } from "lucide-react";

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
    <div className="animate-fade-in">
      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-4">
        Profile Image *
      </label>
      <div className="mt-1 flex items-center space-x-6">
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
          className="cursor-pointer inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 group"
        >
          <Upload className="mr-2 h-5 w-5 text-gray-400 group-hover:text-primary transition-colors duration-200" />
          Upload Image
        </label>
        {imagePreview && (
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/20">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;