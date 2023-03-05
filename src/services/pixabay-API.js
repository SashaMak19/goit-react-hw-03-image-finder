import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_TO_PIXABAY = '32833060-357ee47d83b97b03f386cb629';

async function fetchData(query, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${query}&page=${page}&key=${KEY_TO_PIXABAY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { fetchData };
