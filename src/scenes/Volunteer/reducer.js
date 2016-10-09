import { FETCH_VOLUNTEER_REQUEST, FETCH_VOLUNTEER_SUCCESS, FETCH_VOLUNTEER_FAILURE } from './actions';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null
};

export default function volunteerReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FETCH_VOLUNTEER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_VOLUNTEER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case FETCH_VOLUNTEER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}
