const validateImage = (value) => {
  const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!acceptedTypes.includes(value[0].type)) {
    return "Only JPG, PNG, and GIF images are allowed";
  }

  return true;
};
export default validateImage;
