import { apiInstance } from "../ApiInstence";

/**
 * Login API endpoint
 * @param {object} data - Account Credentials
 * @param {string} data.email - Email used by the account
 * @param {string} data.password - Password
 *
 */
export const loginUser = async (data) => {

  try {
    const response = await apiInstance.post("/login", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Fetch franchisee dealer count
 * @returns {Promise<object>} - Franchisee dealer count data
 */
export const getFranchiseeDealerCount = async () => {
  try {
    const response = await apiInstance.get("/franchisee-dealer-count/");
    return response.data;
  } catch (error) {
    console.error("Error fetching franchisee dealer count:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

/**
 * Fetch service provider counts
 * @returns {Promise<object>} - Service provider count statistics
 */
export const getServiceProviderCounts = async () => {
  try {
    const response = await apiInstance.get("/service-provider-counts/");
    return response.data;
  } catch (error) {
    console.error("Error fetching service provider counts:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const getDealerList = async (data) => {
  try {
    const response = await apiInstance.get("/franchise/franchisee-dealers/");
    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const GetServiceProviderData = async () => {
  try {
    const response = await apiInstance.get("/service-providers/");

    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const getFranchiseeTypes = async () => {
  try {
    const response = await apiInstance.get("franchiseetype/");

    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const getFranchiseeCategory = async () => {
  try {
    const response = await apiInstance.get("/categories/");

    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const getFranchiseDealerList = async () => {
  try {
    const response = await apiInstance.get("/franchise/franchisee-dealers/");

    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const getStateslist = async () => {
  try {
    const response = await apiInstance.get("/states/");
    return response;
  } catch (error) {
    return error;
  }
};
export const getDistrictList = async () => {
  try {
    const response = await apiInstance.get("/districts/");
    return response;
  } catch (error) {
    return error;
  }
};
