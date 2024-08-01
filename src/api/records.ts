import { currentSession, getAccesToken } from "../aws";
import { PaginatedRequest } from "../types/common";

export const getRecords = async (params?: PaginatedRequest) => {
  const queryString = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  const token = await getAccesToken();
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_API_URL}/v1/records${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Network response was not ok");
  }
  return response.json();
};

type CalculateBody = {
  user_id?: string;
  operation_id: string;
  first_input?: number;
  second_input?: number;
};
export const calculate = async (data: CalculateBody) => {
  const token = await getAccesToken();
  const session = await currentSession();

  const payload = {
    ...data,
    user_id: session?.tokens?.idToken?.payload?.["custom:user_id"],
  };

  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_API_URL}/v1/records/calculate`,
    {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Network response was not ok");
  }
  return response.json();
};

export const deleteRecord = async (id: string) => {
  const token = await getAccesToken();
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_API_URL}/v1/records/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Network response was not ok");
  }
};
