import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const connectToMongoDB = async (mongoUri: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/connect?mongoUri=${mongoUri}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
};

export const getDatabases = async () => {
  try {
    const response = await axios.get(`${API_URL}/database`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
};

export const getCollections = async (dbName: string) => {
  try {
    const response = await axios.get(`${API_URL}/collections`, {
      params: { dbName },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
};

export const getDocuments = async (dbName: string, collectionName: string) => {
  try {
    const response = await axios.get(`${API_URL}/documents`, {
      params: { dbName, collectionName },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
};

export const queryCollections = async (
  dbName: string,
  collectionName: string,
  filterJson: string
) => {
  try {
    const response = await axios.post(`${API_URL}/query`, filterJson, {
      params: { dbName, collectionNames: collectionName },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
};
