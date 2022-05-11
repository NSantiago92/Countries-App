import axios from "axios";

const URL = process.env.REACT_APP_API;
//{ "name":"Swimming", "difficulty":4, "duration":3, "season":"Summer", "countries":[1,22,31,4,10,6,7]}
export const postActivity = async (activity) => {
  try {
    return await axios.post(`${URL}activity`, activity);
  } catch (err) {
    console.error(err);
    return new Error(err);
  }
};
