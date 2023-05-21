import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const radipApiUrl = import.meta.env.VITE_RADIP_API_URL;
const radipApiKey = import.meta.env.VITE_RADIP_API_KEY;

export const ArticleAPI = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: radipApiUrl,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      headers.set("X-RapidAPI-Key", radipApiKey);
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.arricleUrl)}&slength=4`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = ArticleAPI;
