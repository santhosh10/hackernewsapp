import axios from 'axios';

export const FETCH_FEEDS= 'fetchFeeds';
export const fetchFeeds = (page) => async dispatch =>  {

    const url =  'https://hn.algolia.com/api/v1/search?page='+ (page ? page : 2);
    const res = await axios.get(url);
    dispatch({
        type: FETCH_FEEDS,
        payload: res.data.hits ? res.data.hits : []
    });
};
