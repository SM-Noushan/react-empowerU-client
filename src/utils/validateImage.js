const validateImage = (value) => {
  if (!value || value.length === 0) {
    return true; // No file selected, so the validation passes
  }

  const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!acceptedTypes.includes(value[0].type)) {
    return "Only JPG, PNG, and GIF images are allowed";
  }

  return true;
};
export default validateImage;
