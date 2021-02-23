import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/students`;

export const getAllStudentByClass = async (id) => {
  const { data } = await axios.get(`${baseUrl}/classroom/${id}`);

  return data;
};

export const newStudent = async (payload) => {
  const { data } = await axios.post(`${baseUrl}/new`, payload);

  return data;
};

export const deleteStudent = async (id) => {
  const result = await axios.delete(`${baseUrl}/${id}`);

  return result.status;
};

export const editStudent = async (id, payload) => {
  const result = await axios.put(`${baseUrl}/${id}`, payload);

  return result;
};

export const getStudentsLength = async () => {
  const result = await axios.get(`${baseUrl}/length`);

  return result;
};
