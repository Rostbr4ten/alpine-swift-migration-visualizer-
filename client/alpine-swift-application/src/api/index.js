import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export const getBirdRoutes = () => api.get(`/birdRoutes`);
export const getBirdFilters = () => api.get(`/birdFilters`)
export const getBirdPaths = () => api.get(`/birdPaths`)
//export const insertFormOne = payload => api.post(`/insertFormOne`, payload)


const apis = {
    getBirdRoutes,
    getBirdFilters,
    getBirdPaths
}

export default apis