import axios from 'axios';

export const GET_EVENT_DETAILS = 'GET_EVENT_DETAILS';
export const GET_EVENT_PHOTOS = 'GET_EVENT_PHOTOS';
export const GET_EVENT_PHOTOS_DONE = 'GET_EVENT_PHOTOS_DONE';

export const getEventDetails = (id) => {
  const url = `http://selffer-api-dev.eu-west-1.elasticbeanstalk.com/api/event/${id}?additionalfields=cover_photos,stats`;
  const request = axios.get(url);

  return {
    type: GET_EVENT_DETAILS,
    payload: request
  };
};

export const getEventPhotos = (eventId, page = 1, pageSize = 50) => {
  const url = `http://selffer-api-dev.eu-west-1.elasticbeanstalk.com/api/event/${eventId}/photo/all?page=${page}&pageSize=${pageSize}`;

  return (dispatch) => {
    dispatch({ type: GET_EVENT_PHOTOS });

    axios.get(url)
      .then(data => {
        dispatch({
          type: GET_EVENT_PHOTOS_DONE,
          payload: data
        });
      });
  };
};
