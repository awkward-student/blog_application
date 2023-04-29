import { AXIOS } from './helper';

export const loadAllCategories=()=>{
    return AXIOS.get('/categories/').then(response => {return response.data})
};