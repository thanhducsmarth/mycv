'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type ImageData = {
  folder: string;
  filename: string;
  url: string;
  size: number;
};

type ApiResponse = {
  success: boolean;
  data?: {
    totalImages: number;
    folders: Record<string, ImageData[]>;
    allImages: {
      folder: string;
      filename: string;
      url: string;
      size: number;
    }[];
  };
  error?: string;
};

export default function ImagesPage() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [groupedImages, setGroupedImages] = useState<Record<string, ImageData[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/images');
      const data: ApiResponse = await response.json();

      if (data.success && data.data) {
        setImages(data.data.allImages);
        setGroupedImages(data.data.folders);
      } else {
        setError(data.error || 'Không thể tải danh sách ảnh');
      }
    } catch (err) {
      setError('Lỗi kết nối đến server');
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách ảnh...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Lỗi</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchImages}
            className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🖼️ Thư viện ảnh Thanh Duc Photo
          </h1>
          <p className="text-gray-600">
            Tổng cộng <span className="font-semibold text-gray-900">{images.length}</span> ảnh
            trong {Object.keys(groupedImages).length} danh mục
          </p>
        </div>
      </div>

      {/* Images Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.entries(groupedImages)
          .sort(([folderA], [folderB]) => {
            // Sort so that empty folder (root images) comes last
            if (folderA === '' && folderB !== '') return 1;
            if (folderB === '' && folderA !== '') return -1;
            return folderA.localeCompare(folderB);
          })
          .map(([folder, folderImages]) => {
          const folderDisplayName = folder === '' ? 'Ảnh chung' : folder;
          const folderIcon = folder === '' ? '🖼️' : '📁';

          return (
            <div key={folder} className="mb-12">
              {/* Folder Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {folderIcon} {folderDisplayName} ({folderImages.length} ảnh)
                </h2>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(
                      folderImages.map(img => `${window.location.origin}${img.url}`).join('\n')
                    );
                    alert('Đã sao chép URL của tất cả ảnh trong thư mục này!');
                  }}
                >
                  Sao chép tất cả URL
                </a>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {folderImages.map((image, index) => (
                  <div
                    key={`${folder}-${image.filename}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={image.url}
                        alt={image.filename}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 truncate">{image.filename}</span>
                        <span className="text-gray-400 ml-2">{formatFileSize(image.size)}</span>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <a
                          href={image.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                          🔗 Xem
                        </a>
                        <button
                          onClick={() => {
                            const url = `${window.location.origin}${image.url}`;
                            navigator.clipboard.writeText(url);
                            alert(`Đã sao chép URL: ${url}`);
                          }}
                          className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                          📋 Copy
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer with Stats */}
      {Object.keys(groupedImages).length > 0 && (
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Thống kê</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(groupedImages)
                .sort(([folderA], [folderB]) => {
                  // Sort so that empty folder (root images) comes last
                  if (folderA === '' && folderB !== '') return 1;
                  if (folderB === '' && folderA !== '') return -1;
                  return folderA.localeCompare(folderB);
                })
                .map(([folder, folderImages]) => (
                <div key={folder} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 capitalize">
                    {folder === '' ? 'Ảnh chung' : folder}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {folderImages.length}
                  </div>
                  <div className="text-sm text-gray-500">ảnh</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
