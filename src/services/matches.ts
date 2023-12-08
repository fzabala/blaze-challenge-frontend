import axios from "axios";

export const matchesIndexService = async (teamId: number) => {
  const response = await axios.get(`${process.env.REACT_APP_API_HOST}/teams/${teamId}/matches`);
  return response.data;
}