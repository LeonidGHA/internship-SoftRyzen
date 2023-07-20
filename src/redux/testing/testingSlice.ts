import { baseApi } from 'services/baseApi';

import { DataTestsResponse, Test } from 'constants/types';

export type TypeDataForm = {
  livePageLink: string;
  repositoryLink: string;
  difficulty: string;
  comments: string;
};

export type PostTaskDataResponse = {
  acceptanceCriteria: string[];
  createAt: string;
  deadline: string;
  direction: string;
  id: number;
  internshipStream: string;
  link: string;
  materials: string[];
  shortDescription: string;
  title: string;
  updateAt: string;
};

export const testingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<Test[], any>({
      query: (direction) => ({ url: `questions/block/${direction}`, method: 'get' }),
      providesTags: ['tests'],
    }),
    getTestData: builder.query<DataTestsResponse[], any>({
      query: (internshipStream) => ({
        url: `tests?internshipStream=${internshipStream}`,
        method: 'get',
      }),
    }),
    getTasks: builder.query<PostTaskDataResponse[], any>({
      query: (description) => ({
        url: `technical-test?direction=${description}`,
        method: 'get',
      }),
    }),
    postTaskData: builder.mutation<any, TypeDataForm>({
      query: (data) => ({
        url: `technical-test/result`,
        method: 'post',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetTasksQuery,
  usePostTaskDataMutation,
  useGetTestDataQuery,
} = testingApi;
