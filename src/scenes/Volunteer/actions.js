import request from 'superagent';

export const FETCH_VOLUNTEER_REQUEST = 'FETCH_VOLUNTEER_REQUEST';
export const FETCH_VOLUNTEER_SUCCESS = 'FETCH_VOLUNTEER_SUCCESS';
export const FETCH_VOLUNTEER_FAILURE = 'FETCH_VOLUNTEER_FAILURE';

const requestVolunteer = () => ({
  type: FETCH_VOLUNTEER_REQUEST
});

const recieveVolunteerSuccess = (data) => ({
  type: FETCH_VOLUNTEER_SUCCESS,
  data
});

const receiveVolunteerFailed = (err) => ({
  type: FETCH_VOLUNTEER_FAILURE,
  error: err
});

export function fetchVolunteer(id) {
  return (dispatch) => {
    dispatch(requestVolunteer());
    return request
      .get(`/api/volunteers/${id}`)
      .set('Accept', 'application/json')
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveVolunteer(response));
        }
      })
      .catch(err => {
        dispatch(receiveVolunteerFailed(err));
      });
  };
}
