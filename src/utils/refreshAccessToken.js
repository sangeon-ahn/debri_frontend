import axios from "axios";

export const refreshAccessToken = () => {
  const headers = {
    'ACCESS-TOKEN': `${JSON.parse(localStorage.getItem("userData")).jwt}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const prevUserData = JSON.parse(localStorage.getItem("userData"));

  const patchRefreshToken = async (refreshToken) => {
    try {
      const response = await axios.patch('/api/jwt/refresh',
        JSON.stringify({
          refreshToken: refreshToken
        }),
        { headers }
      );
      console.log(response);
      localStorage.setItem("userData", JSON.stringify({
        ...prevUserData,
        accessToken: response.data.result.accessToken,
        refreshToken: response.data.result.refreshToken,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  patchRefreshToken(`${JSON.parse(localStorage.getItem("userData")).refreshToken}`);
};