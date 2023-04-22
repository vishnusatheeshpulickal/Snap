const getDownloadUrl = (cloudinaryUrl) => {
  const cloudName = cloudinaryUrl.split("/")[3];
  const publicIdWithExtension = cloudinaryUrl.split("/")[6];
  const version = publicIdWithExtension.split(".")[0];
  const publicId = cloudinaryUrl.split("/")[8];
  const downloadUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${version}/fl_attachment/Snap/${publicId}`;
  return downloadUrl;
};

module.exports = getDownloadUrl;
