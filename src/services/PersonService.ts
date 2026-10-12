import { httpClient } from "./api/http-config";

const getMe = async () => {
  return await httpClient.get("/person/me");
};

export const PersonService = {
  getMe,
};
