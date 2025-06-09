export default function getCroppedImg(imageSrc, pixelCrop) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 1000;
  canvas.height = 1000;

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        1000,
        1000
      );
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    };
    image.onerror = (error) => reject(error);
  });
}
