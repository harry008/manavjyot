import { FETCH_VOLUNTEERS_REQUEST, FETCH_VOLUNTEERS_SUCCESS, FETCH_VOLUNTEERS_FAILURE } from './actions';

const INITIAL_STATE = {
    error: null,
    loading: false,
    loaded: false,
    data: []
};

/**
 * Volunteers reducer
 * @param {Object} initial state
 * @param {Object} action
 */
export default function volunteersReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case FETCH_VOLUNTEERS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_VOLUNTEERS_SUCCESS:
            return {
                ...state,
                loaded: true,
                loading: false,
                data: action.data,
            };

        case FETCH_VOLUNTEERS_FAILURE:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}
