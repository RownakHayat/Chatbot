import { TransformResponse } from "@/store/utils";
import { apiSlice } from "../../apiSlice";

export const fairSalesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["FairSales"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getFairSales: builder.query<any, void>({
        query: (params?: any) => {
          return {
            url: "/auth/fair-sale-list",
            params,
          };
        },
        transformResponse: (response) => TransformResponse(response),
      }),

      getFairSalesView: builder.query<any, any | void>({
        query: (id?: any) => ({
          url: `/auth/event-detail-show/${id}`,
        }),
        providesTags: ["FairSales"],
      }),
    }),
    overrideExisting: true,
  });

export const { useGetFairSalesQuery, useGetFairSalesViewQuery } =
  fairSalesApiSlice;
