import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export const getBirdRoutes = () => api.get(`/birdRoutes`)
//export const insertFormOne = payload => api.post(`/insertFormOne`, payload)


const apis = {
    getBirdRoutes
}

export default apis