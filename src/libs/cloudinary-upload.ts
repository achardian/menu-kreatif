import axios from "axios";

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axios.post("/api/upload/image", formData);
    return data.secure_url;
  } catch (error) {
    return error;
  }
};

export default uploadImage;
