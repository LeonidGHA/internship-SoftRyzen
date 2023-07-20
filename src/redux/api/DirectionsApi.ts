import { GetDirectionsResponse } from 'constants/types';
import { baseApi } from 'services/baseApi';

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDirections: builder.query<GetDirectionsResponse, void>({
      query: () => ({ url: `direction`, method: 'get' }),
      providesTags: ['directions'],
    }),
  }),
});

export const { useGetDirectionsQuery } = newsApi;
