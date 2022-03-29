const IMAGE_REGEX = /<img\s.*?src=(?:'|")([^'">]+)(?:'|")/g;

const findImagePaths = (content) => [...content.matchAll(IMAGE_REGEX)];

const retrieveImages = (content, parentNode, { createContentDigest, createNodeId, updateWithTransform }) => {
  const images = findImagePaths(content);
  const createImageFromPath = createImage(parentNode, { createContentDigest, createNodeId, updateWithTransform });
  images.forEach(createImageFromPath);
  return images;
};

const createImage = ( parentNode, { createContentDigest, createNodeId, updateWithTransform }) => (imagePath) => {

};

module.exports = {
  retrieveImages,
  findImagePaths,
};
