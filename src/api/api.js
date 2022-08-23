import axiosClient from "./axiosClient";
import { apiConfig } from "./config";

export const categories = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated',
    now_playing: 'now_playing'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
}

const typeCommon = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air',
    upcoming: 'upcoming',
    now_playing: 'now_playing',
}

export const getApi = {
    getMovieList: (type, params) => {
        const url = 'movie' + '/' + movieType[type]
        return axiosClient.get(url, params)
    },
    getTvList: (type, params) => {
        const url = 'tv' + '/' + tvType[type]
        return axiosClient.get(url, params)
    },
    getList: (cate, type, params) => {
        const url = categories[cate] + '/' + typeCommon[type]
        return axiosClient.get(url, params)
    },
    getDetails: (cate, id) => {
        const url = categories[cate] + '/' + id
        return axiosClient.get(url, { params: {} })
    },
    getVideos: (cate, id) => {
        const url = categories[cate] + '/' + id + '/videos'
        return axiosClient.get(url, { params: {} })
    },
    search: (cate, params) => {
        const url = 'search' + '/' + categories[cate]
        return axiosClient.get(url, params)
    },
    getCredits: (cate, id) => {
        const url = categories[cate] + '/' + id + '/credits'
        return axiosClient.get(url, { params: {} })
    },
    getSimilar: (cate, id, params) => {
        const url = categories[cate] + '/' + id + '/similar'
        return axiosClient.get(url, params)
    },
    getRecommendations: (cate, id, params) => {
        const url = categories[cate] + '/' + id + '/recommendations'
        return axiosClient.get(url, params)
    },
    getGenres: (cate) => {
        const url = 'genre/' + categories[cate] + '/list'
        return axiosClient.get(url, { params: {} })
    },
    discover: (cate, params) => {
        const url = 'discover/' + categories[cate]
        return axiosClient.get(url, params)
    },
    getDetailSeasons: (id, season) => {
        const url = 'tv/' + id + '/season/' + season
        return axiosClient.get(url, { params: {} })
    }
}

