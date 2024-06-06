const generateUniqueFileName = (originalFileName) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  return `${timestamp}_${randomString}_${originalFileName}`;
};

export default generateUniqueFileName;
