import { siteConfig } from "@/config/site";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const HttpApiQuery = fetchBaseQuery({
    baseUrl: `${siteConfig.envConfig[`${process.env.APP_ENV}`]?.SERVER_URL}`,
    prepareHeaders: (headers, { getState }: any) => {
        const token = Cookies.get("token");
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;

    }
})

export const apiSlice = createApi({
    reducerPath: 'smef_api_query',
    baseQuery: HttpApiQuery,
    tagTypes: [],
    endpoints: () => ({}),
})