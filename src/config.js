const url = process.env.REACT_APP_BACKEND_URL;

const config = {
  BACKEND_URL_SEARCH: `${url}/search/?`,
  BACKEND_URL_SEARCH_PAGINATION: `${url}/search/pagination/?`,
  BACKEND_URL_SEARCH_VIDEO_COUNT: `${url}/search/count/`,
  BACKEND_URL_SEARCH_BY_ID: `${url}/searchbyid/`,
  BACKEND_URL_ADD_CONTENT: `${url}/cms/addcontent/`,
  BACKEND_URL_DELETE_CONTENT: `${url}/cms/deletecontent/`,
  BACKEND_URL_UPDATE_CONTENT: `${url}/cms/updatecontent/`,
  BACKEND_URL_VIMEO_GET_ALL_DATA: `${url}/vimeo/allData/`,
  BACKEND_URL_FEEDBACK_UPDATE: `${url}/feedback/`,
  BACKEND_URL_TAGS_GET_ALL_DATA: `${url}/tags/`,
  BACKEND_URL_TAGS_DELETE: `${url}/tags/`,
  BACKEND_URL_TAGS_ADD: `${url}/tags/`,
  BACKEND_URL_TAGS_UPDATE: `${url}/tags/`,
  BACKEND_URL_TAGS_LASTKEY: `${url}/tags/lastkey`,
  BACKEND_URL_LECTURERS_GET_ALL_DATA: `${url}/lecturers/`,
  BACKEND_URL_LECTURERS_DELETE: `${url}/lecturers/`,
  BACKEND_URL_LECTURERS_ADD: `${url}/lecturers/`,
  BACKEND_URL_LECTURERS_UPDATE: `${url}/lecturers/`,
  BACKEND_URL_LECTURERS_LASTKEY: `${url}/lecturers/lastkey`,
  BACKEND_URL_FILTERS_GET_TAGS: `${url}/filter/tags`,
  BACKEND_URL_FILTERS_GET_WEEK: `${url}/filter/week`,
  BACKEND_URL_FILTERS_GET_LECTURER: `${url}/filter/lecturer`,
  BACKEND_URL_FILTERS_GET_GUEST: `${url}/filter/guest`,
  BACKEND_URL_GET_ADMIN_USERS: `${url}/admins`,
};

export default config;
