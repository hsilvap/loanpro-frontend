import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

const awsconfig = {
  aws_project_region: import.meta.env.VITE_APP_REGION,
  aws_user_pools_id: import.meta.env.VITE_APP_USER_POOL_ID,
  aws_user_pools_web_client_id: import.meta.env.VITE_APP_CLIENT_ID,
};

export default awsconfig;

//if it returns an error, user is not authenticated
export const isUserAuthenticated = async () => {
  try {
    await getCurrentUser();
    return true;
  } catch (error) {
    return false;
  }
};

export const currentSession = async () => {
  try {
    const data = await fetchAuthSession();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAccesToken = async () => {
  try {
    const { accessToken } = (await fetchAuthSession()).tokens ?? {};
    return accessToken;
  } catch (err) {
    console.log(err);
  }
};
