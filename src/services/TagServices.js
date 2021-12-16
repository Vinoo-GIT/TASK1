import axios from "axios";

export const _refreshTags = async () => {
  const response = await axios.get("http://localhost:3004/tags");
  return response.data;
};
export const addTag = async (newTagData) => {
  const response = await axios.post("http://localhost:3004/tags", newTagData);
  return response.data;
};

export const updateTag = async (editTagDataid, cityname, pincode) => {
  const response = await axios.put(
    "http://localhost:3004/tags/" + editTagDataid,
    {
      cityname,
      pincode,
    }
  );
  return response.data;
};

export const deleteTagModal = async (id) => {
  const response = await axios.delete("http://localhost:3004/tags/" + id);
  return response.data;
};
