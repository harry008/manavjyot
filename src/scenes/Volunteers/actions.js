import request from 'superagent';

export const FETCH_VOLUNTEERS_REQUEST = 'FETCH_VOLUNTEERS_REQUEST';
export const FETCH_VOLUNTEERS_SUCCESS = 'FETCH_VOLUNTEERS_SUCCESS';
export const FETCH_VOLUNTEERS_FAILURE = 'FETCH_VOLUNTEERS_FAILURE';

const requestVolunteers = () => {
  return { type: FETCH_VOLUNTEERS_REQUEST };
};
const receiveVolunteers = (response) => ({
  type: FETCH_VOLUNTEERS_SUCCESS,
  data: response
});
const receiveVolunteersFailed = (err) => ({
  type: FETCH_VOLUNTEERS_FAILURE,
  error: err
});

/**
 * Function to get all the volunteers of this charity
 * @return {Array} Volunteers returned as an array of volunteer objects.
 */
export function fetchVolunteers() {
  return (dispatch) => {
    dispatch(requestVolunteers());
    return request
      .get('http://localhost:3000/api/volunteers')
      .set('Accept', 'application/json')
      .then(response => {
        if (response.status === 200) {
          try {
            const data = JSON.parse(response.text);
            dispatch(receiveVolunteers(data));
          } catch (e) {
            console.log(e);
          }
        }
      })
      .catch(err => {
        dispatch(receiveVolunteersFailed(err));
      });
  };
}
