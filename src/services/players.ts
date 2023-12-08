import axios from "axios";

export const playersIndexService = async (teamId: number) => {
  const response = await axios.get(`${process.env.REACT_APP_API_HOST}/teams/${teamId}/players`);
  return response.data;
}