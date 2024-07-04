export async function getToken(clientId, clientSecret) {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });
  
    const data = await result.json();
    return data.access_token;
}

export async function getCategories(token) {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  return data.categories.items;
}

export async function getGenres(token) {
  const result = await fetch(
    `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  return data.genres;
}

export async function getRecomendations(token, params) {
  const url = new URL('https://api.spotify.com/v1/recommendations');
  
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const result = await fetch(url, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result.json();
  return data.tracks;
}