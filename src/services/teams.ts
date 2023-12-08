import axios from "axios";

export const teamsIndexService = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_HOST}/teams`);
  return response.data;
}