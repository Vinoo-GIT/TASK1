import axios from "axios";

export const refreshcities = async () => {
  const response = await axios.get("http://localhost:3004/cities");
  return response.data;
};
export const addCity = async (newCityData) => {
  const response = await axios.post(
    "http://localhost:3004/cities",
    newCityData
  );
  return response.data;
};

export const updateCity = async (editCityDataid, cityname, pincode) => {
  const response = await axios.put(
    "http://localhost:3004/cities/" + editCityDataid,
    {
      cityname,
      pincode,
    }
  );
  return response.data;
};

export const deleteCityModal = async (id) => {
  const response = await axios.delete("http://localhost:3004/cities/" + id);
  return response.data;
};
