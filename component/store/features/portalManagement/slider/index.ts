import { TransformResponse } from "@/store/utils";
import { apiSlice } from "../../apiSlice";

export const sliderApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Slider"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSliderPagination: builder.query<any, void>({
        query: (params?: any) => ({
          url: "/auth/slider-list",
          params,
        }),
        transformResponse: TransformResponse,
        providesTags: ["Slider"],
      }),
      getAllSlider: builder.query<any, void>({
        query: () => ({
          url: "/slider",
        }),
        providesTags: ["Slider"],
      }),
      createSlider: builder.mutation({
        query: (data) => ({
          url: "/auth/slider-store",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Slider"],
      }),
      changeSliderStatus: builder.mutation({
        query: (data) => ({
          url: `/auth/slider-status-change/${data.id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["Slider"],
      }),
      SliderUpdate: builder.mutation({
        query: (data) => ({
          url: `/auth/slider-update/${data.id}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Slider"],
      }),
      SliderDelete: builder.mutation({
        query: (id) => ({
          url: `/auth/slider-delete/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Slider'],
      }),
    }),
    overrideExisting: true,
  });

export const {
  useGetSliderPaginationQuery,
  useGetAllSliderQuery,
  useCreateSliderMutation,
  useChangeSliderStatusMutation,
  useSliderUpdateMutation,
  useSliderDeleteMutation,
} = sliderApiSlice;
