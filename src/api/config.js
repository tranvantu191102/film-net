export const apiConfig = {
    baseURL: 'https://api.themoviedb.org/3/',
    apiKey: process.env.REACT_APP_API_KEY,
    originalImg: (pathImage) => `https://image.tmdb.org/t/p/original/${pathImage}`,
    w500Img: (pathImage) => `https://image.tmdb.org/t/p/w500/${pathImage}`,
    w185Img: (pathImage) => `https://image.tmdb.org/t/p/w185/${pathImage}`
}
