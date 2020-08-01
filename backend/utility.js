const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadLocalFile = async (path) => {
  const res = await cloudinary.uploader.upload(path);
  fs.unlinkSync(path);
  if (res && res.secure_url) {
    console.log('file uploaded to Cloudinary', res.secure_url);
  } else {
    return '';
  }
  return res.secure_url;
}

async function uploadMedia(file) {
  let contentURL = '';
  if (file && file.tempFilePath) {
    contentURL = await uploadLocalFile(file.tempFilePath);

    if (!contentURL) {
      throw new Error("Media upload failed");
    }
  }
  return contentURL;
}

module.exports = {
  uploadLocalFile,
  uploadMedia,
}