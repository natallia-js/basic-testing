import { AxiosInstance } from 'axios';

export const responseData = [{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
   }, {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false,
  }, {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": true,
  }];

const mockedAxiosInstance = {
    get: async function(relativePath: string) {
        if (!relativePath) return { data: null };
        return { data: responseData };
    },
} as AxiosInstance;

export default mockedAxiosInstance;
