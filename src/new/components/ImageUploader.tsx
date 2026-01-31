import { Image, Upload, X, Star } from "lucide-react";
import { useState } from "react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  mainImageIndex?: number;
  onSetMainImage?: (index: number) => void;
}

export function ImageUploader({ 
  images, 
  onChange, 
  maxImages = 3,
  mainImageIndex = 0,
  onSetMainImage
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: string[] = [];
    const remainingSlots = maxImages - images.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        // In a real app, upload to server and get URL
        // For now, create local URL for preview
        const url = URL.createObjectURL(file);
        newImages.push(url);
      }
    }

    onChange([...images, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div>
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-semibold text-gray-700">
          Hình Ảnh Sản Phẩm
        </label>
        {images.length > 0 && (
          <span className="text-xs text-gray-500">
            ({images.length}/{maxImages} hình ảnh)
          </span>
        )}
      </div>

      {/* Image Grid with Upload Area */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Existing Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg border-2 border-gray-200 overflow-hidden group"
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Star button to set as main image */}
            {onSetMainImage && (
              <button
                type="button"
                onClick={() => onSetMainImage(index)}
                className={`absolute top-2 left-2 w-6 h-6 bg-[#75b06f] text-white rounded-full flex items-center justify-center transition-all hover:bg-[#75b06f]/80 ${
                  index === mainImageIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
                title={index === mainImageIndex ? "Hình chính" : "Đặt làm hình chính"}
              >
                <Star 
                  className="w-4 h-4" 
                  fill={index === mainImageIndex ? "white" : "none"}
                />
              </button>
            )}

            {/* Delete button */}
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              title="Xóa hình ảnh"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Upload Area - inline with images or full width when empty */}
        {canAddMore && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
              isDragging
                ? "border-[#75b06f] bg-[#75b06f]/5"
                : "border-gray-300 bg-gray-50"
            } ${images.length === 0 ? 'col-span-full p-8' : 'aspect-square'}`}
          >
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-xs text-gray-600 font-medium text-center">Thêm hình ảnh</p>
              <p className="text-xs text-gray-500 text-center leading-tight">
                Kéo thả hoặc nhấn nút bên dưới
              </p>
              {images.length === 0 && (
                <p className="text-xs text-gray-400">
                  ({images.length}/{maxImages} hình ảnh)
                </p>
              )}
              <label className="cursor-pointer mt-1">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
                <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#75b06f] text-[#75b06f] rounded-lg hover:bg-[#75b06f] hover:text-white transition-colors font-medium text-xs">
                  <Upload className="w-3.5 h-3.5" />
                  Upload files
                </div>
              </label>
            </div>
          </div>
        )}
      </div>

      {!canAddMore && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Đã đạt giới hạn {maxImages} hình ảnh
        </p>
      )}
    </div>
  );
}