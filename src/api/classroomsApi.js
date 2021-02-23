import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/classroom`;

export const getAllClassrooms = async () => {
  const { data } = await axios.get(baseUrl);

  return data;
};

export const newClassroom = async (payload) => {
  const { data } = await axios.post(`${baseUrl}/new`, payload);

  return data;
};

export const deleteClass = async (id) => {
  const result = await axios.delete(`${baseUrl}/${id}`);

  return result.status;
};

export const editClasss = async (id, payload) => {
  const result = await axios.put(`${baseUrl}/${id}`, payload);

  return result;
};
