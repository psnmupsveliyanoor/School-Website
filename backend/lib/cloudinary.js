const { v2: cloudinary } = require('cloudinary');
const { Readable } = require('stream');

function getCloudinary() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Missing Cloudinary credentials in backend environment config (.env)');
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  return cloudinary;
}

function uploadBuffer(buffer, options = {}) {
  const uploader = getCloudinary().uploader;

  return new Promise((resolve, reject) => {
    const uploadStream = uploader.upload_stream(
      { resource_type: 'auto', ...options },
      (error, result) => (error ? reject(error) : resolve(result))
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

async function deleteAsset(publicId, resourceType = 'image') {
  if (!publicId) return;
  await getCloudinary().uploader.destroy(publicId, { resource_type: resourceType });
}

module.exports = { uploadBuffer, deleteAsset };
