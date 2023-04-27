import { AXIOS } from "./helper"

export const signUp = (user) => {
    return AXIOS
    .post('/api/v1/auth/register', user)
    .then((response) => response.data);
};