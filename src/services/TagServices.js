import axios from "axios";

export const _refreshTags =async ()=> {
   const response = await axios.get("http://localhost:3004/cities");
    return response.data;
  }
 export const addTag = async (newTagData) => {
  const response = await axios
      .post("http://localhost:3004/cities", newTagData);
      return response.data;
  }

   export const updateTag=async(editTagDataid,title,rating)=> {
        const response = await axios
      .put("http://localhost:3004/cities/" + (editTagDataid), {
        title,
        rating,
      });
      return response.data;
  }

  export const deleteTagModal=async(id)=>{
    const response = await axios
  .delete("http://localhost:3004/cities/" + id)
  return response.data;
  }
  