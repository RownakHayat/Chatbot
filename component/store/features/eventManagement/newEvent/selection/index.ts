import { apiSlice } from "@/store/features/apiSlice";
import {TransformResponse} from "@/store/utils";

export const selectionApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["SelectionList"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPerticipant: builder.query<any, any>({
        query: ( id ) => {
          return {
            url: `/auth/participant-list/${id}`,
          };
        },
        transformResponse: TransformResponse,
        providesTags: ["SelectionList"],
      }),

      createEvent: builder.mutation({
        query: (data) => ({
          url: "/auth/create-event",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["SelectionList"],
      }),
      getAllFinancialYear: builder.query<any, void>({
        query: () => ({
          url: "/auth/get-all-financial-year-list",
        }),
        providesTags: ["SelectionList"],
      }),
      updateProgram: builder.mutation({
        query: (data) => ({
          url: `/auth/program-update/${data.id}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["SelectionList"],
      }),
      /*Selected Participate List*/

      selectedParticipant: builder.query<any, any>({
        query: ( id ) => {
          return {
            url: `/auth/selected-list/${id}`,
          };
        },
        transformResponse: TransformResponse,
        providesTags: ["SelectionList"],
      }),


      selectParticipant: builder.mutation({
        query: (data) => ({
          url: "/auth/select-participant",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["SelectionList"],
      }),

    }),
    overrideExisting: true,
  });

export const {
  useGetPerticipantQuery,
  useCreateEventMutation,
  useGetAllFinancialYearQuery,
  useUpdateProgramMutation,
  useSelectedParticipantQuery,
    useSelectParticipantMutation
} = selectionApiSlice;
