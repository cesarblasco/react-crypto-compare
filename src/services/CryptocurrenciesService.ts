export const fetchCryptoCurrencies = (
  searchTerm: string,
  currentFetchLimit: number,
  newFetchLimit?: number
) => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow",
  };

  let apiURL = `https://api.coincap.io/v2/assets?limit=`;

  apiURL += newFetchLimit ? newFetchLimit : currentFetchLimit;

  if (searchTerm) {
    apiURL += `&search=${searchTerm}`;
  }

  return fetch(apiURL, requestOptions)
    .then((response: any) => response.json())
    .then((jsonResponse: any) => {
      return jsonResponse.data;
    })
    .catch((error: any) => console.error("error", error));
};
