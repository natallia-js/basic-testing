import axios, { AxiosStatic } from 'axios';
import { throttledGetDataFromApi } from './index';
import mockedAxiosInstance, { responseData } from './mockedAxiosInstance';

jest.mock('axios');
const mockedAxios: jest.MockedFunctionDeep<AxiosStatic> = jest.mocked(axios);

describe('throttledGetDataFromApi', () => {
  afterAll(() => {   
    jest.unmock('axios');
  });

  test('should create instance with provided base url', async () => {
    mockedAxios.create = jest.fn().mockReturnValue(mockedAxiosInstance);

    await throttledGetDataFromApi('/todos');
    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL: 'https://jsonplaceholder.typicode.com' });

    mockedAxios.create.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const mAI = mockedAxiosInstance;
    mockedAxios.create = jest.fn().mockReturnValue(mAI);
    const spy = jest.spyOn(mAI, 'get');

    await throttledGetDataFromApi('/todos');
    expect(spy).toHaveBeenCalledWith('/todos');

    mockedAxios.create.mockRestore();
  });

  test('should return response data', async () => {
    mockedAxios.create = jest.fn().mockReturnValue(mockedAxiosInstance);

    const resp = await throttledGetDataFromApi('/todos');
    expect(resp).toStrictEqual(responseData);

    mockedAxios.create.mockRestore();
  });
});
