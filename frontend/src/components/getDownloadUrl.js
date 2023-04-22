const getDownloadUrl = (cloudinaryUrl) => {
  if (cloudinaryUrl) {
    const cloudName = cloudinaryUrl.split("/")[3];
    const publicIdWithExtension = cloudinaryUrl.split("/")[6];
    const version = publicIdWithExtension.split(".")[0];
    const publicId = cloudinaryUrl.split("/")[8];
    const downloadUrl = `https://res.cloudinary.com/${cloudName}/image/upload/fl_attachment/${version}/Snap/${publicId}`;
    return downloadUrl;
  } else {
    return null;
  }
};

module.exports = getDownloadUrl;
