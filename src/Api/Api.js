import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37180259-a7b74ce7fbdff4a67e50e8712';
export async function getPhotosByQuery(query, page) {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const data = response.data;
  return data;
}
