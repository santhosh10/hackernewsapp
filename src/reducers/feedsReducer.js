import { FETCH_FEEDS } from '../actions';


export default (state=[], actions) => {

    switch(actions.type) {
        case FETCH_FEEDS:
            return actions.payload
        default:
            return state;
    }
    
}