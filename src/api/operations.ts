import { getAccesToken } from "../aws";

export const getOperations = async () => {
  const token = await getAccesToken();
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_API_URL}/v1/operations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};
