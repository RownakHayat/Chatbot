import { apiSlice } from "@/store/features/apiSlice";
import { TransformResponse } from "@/store/utils";


export const newPaymentApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["AppliedUserList"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getNewPaymentAppliedPagination: builder.query<any, void>({
        query: (params?: any) => ({
          url: "/auth/payment-applied-list",
          params,
        }),
        transformResponse: TransformResponse,
        providesTags: ["AppliedUserList"],
      }),
        changePaymentStatus: builder.mutation({
            query: (data) => ({
                url: `/auth/change-payment-status/${data.id}`,
                method: "GET",
            }),
            invalidatesTags: ["AppliedUserList"],
        })
    }),

    overrideExisting: true,
  });

export const {
  useGetNewPaymentAppliedPaginationQuery,
    useChangePaymentStatusMutation

} = newPaymentApiSlice;
