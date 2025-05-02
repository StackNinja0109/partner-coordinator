import imageCompression from 'browser-image-compression';

export const appImageCompress = async ({
  file,
  maxSizeMB = 1,
  maxWidthOrHeight = 1200
}: {
  file: File;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
}) => {
  const options = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true
  };

  const compressedFile = await imageCompression(file, options);
  return compressedFile;
};
