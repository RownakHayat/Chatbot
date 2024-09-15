import { apiSlice } from "../apiSlice";

export const homePageApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["homePage"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getHomeData: builder.query<any, void>({
        query: (params?: any) => {
          return {
            url: "/frontend/show-homepage-info",
            params,
          };
        },
        // transformResponse: (response) => TransformResponse(response),
      }),

      getFairSalesView: builder.query<any, void>({
        query: (id) => ({
          url: `/auth/event-detail-show/${id}`,
        }),
        providesTags: ["homePage"],
      }),
    }),
    overrideExisting: true,
  });

export const { useGetHomeDataQuery } = homePageApiSlice;
