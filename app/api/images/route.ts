import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type ImageInfo = {
  folder: string;
  filename: string;
  url: string;
  fullPath: string;
  size: number;
};

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public/images');

    const allImages: ImageInfo[] = [];

    // Đọc tất cả item trong thư mục images (cả file và thư mục)
    try {
      const items = fs.readdirSync(imagesDir);

      // Lọc ra các thư mục (có thể chứa ảnh)
      const imageFolders = items.filter(item => {
        const itemPath = path.join(imagesDir, item);
        return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
      });

      for (const folder of imageFolders) {
        const folderPath = path.join(imagesDir, folder);

        try {
          const files = fs.readdirSync(folderPath);

          // Filter chỉ lấy file ảnh
          const imageFiles = files.filter(file =>
            !file.startsWith('.') &&
            !file.includes('README') &&
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
          );

          for (const filename of imageFiles) {
            const filePath = path.join(folderPath, filename);
            const stats = fs.statSync(filePath);

            allImages.push({
              folder,
              filename,
              url: `/images/${folder}/${filename}`,
              fullPath: filePath,
              size: stats.size,
            });
          }
        } catch (error) {
          // Skip folder if error
          console.log(`Folder ${folder} không thể đọc:`, error);
        }
      }

      // Also check for images directly in the root images directory
      const rootFiles = fs.readdirSync(imagesDir).filter(item => {
        const itemPath = path.join(imagesDir, item);
        return fs.statSync(itemPath).isFile() &&
               !item.startsWith('.') &&
               /\.(jpg|jpeg|png|gif|webp)$/i.test(item);
      });

      for (const filename of rootFiles) {
        const filePath = path.join(imagesDir, filename);
        const stats = fs.statSync(filePath);

        allImages.push({
          folder: '', // empty folder for root images
          filename,
          url: `/images/${filename}`,
          fullPath: filePath,
          size: stats.size,
        });
      }
    } catch (error) {
      console.log('Lỗi khi đọc thư mục ảnh:', error);
    }

    // Group by folder
    const groupedByFolder = allImages.reduce((acc, image) => {
      if (!acc[image.folder]) {
        acc[image.folder] = [];
      }
      acc[image.folder].push({
        filename: image.filename,
        url: image.url,
        size: image.size,
      });
      return acc;
    }, {} as Record<string, Omit<ImageInfo, 'folder' | 'fullPath'>[]>);

    return NextResponse.json({
      success: true,
      data: {
        totalImages: allImages.length,
        folders: groupedByFolder,
        allImages: allImages.map(img => ({
          folder: img.folder,
          filename: img.filename,
          url: img.url,
          size: img.size,
        })),
      },
    });
  } catch (error) {
    console.error('Lỗi khi đọc thư mục ảnh:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Không thể đọc thư mục ảnh',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
