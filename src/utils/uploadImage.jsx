import axios from "axios";
import generateUniqueFileName from "./generateUniqueFileName";

const uploadImage = async (image) => {
  const imageFile = new FormData();
  const originalFileName = image[0].name;
  const uniqueFileName = generateUniqueFileName(originalFileName);
  imageFile.append("image", image[0], uniqueFileName);
  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
    imageFile
  );
  return res;
};

export default uploadImage;
