import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URI,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Task", "User", "Notification"],

  endpoints: (builder) => ({

    // TASK APIs

    createTask: builder.mutation({
      query: (data) => ({
        url: "/task/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),


    getTasks: builder.query({
      query: (params) => {

        const searchParams = new URLSearchParams();

        if (params?.isTrashed) {
          searchParams.set("isTrashed", "true");
        }

        if (params?.stage) {
          searchParams.set("stage", params.stage);
        }

        const queryString = searchParams.toString();

        return queryString
          ? `/task?${queryString}`
          : "/task";
      },

      providesTags: ["Task"],
    }),


    getTask: builder.query({
      query: (id) => `/task/${id}`,
      providesTags: ["Task"],
    }),


    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),


    trashTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Task"],
    }),


    createSubTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/create-subtask/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),


    postTaskActivity: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/activity/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),


    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `/task/duplicate/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Task"],
    }),


    deleteRestoreTask: builder.mutation({
      query: ({ id, actionType }) => ({
        url: id
          ? `/task/delete-restore/${id}?actionType=${actionType}`
          : `/task/delete-restore?actionType=${actionType}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),



    // AUTH APIs (FIXED)

    loginUser: builder.mutation({

      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

    }),


    logoutUser: builder.mutation({

      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

    }),


    registerUser: builder.mutation({

      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["User"],

    }),



    // USER APIs

    getTeamList: builder.query({

      query: () => "/user/get-team",

      providesTags: ["User"],

    }),



    updateUserProfile: builder.mutation({

      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),

      invalidatesTags: ["User"],

    }),



    activateUserProfile: builder.mutation({

      query: ({ id, isActive }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: { isActive },
      }),

      invalidatesTags: ["User"],

    }),



    deleteUserProfile: builder.mutation({

      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["User"],

    }),



    getNotifications: builder.query({

      query: () => "/user/notifications",

      providesTags: ["Notification"],

    }),



    markNotiAsRead: builder.mutation({

      query: ({ id, isReadType }) => ({
        url: `/user/read-noti?id=${id || ""}&isReadType=${isReadType || ""}`,
        method: "PUT",
      }),

      invalidatesTags: ["Notification"],

    }),

  }),

});



export const {

  useCreateTaskMutation,
  useGetTasksQuery,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useTrashTaskMutation,
  useCreateSubTaskMutation,
  usePostTaskActivityMutation,
  useDuplicateTaskMutation,
  useDeleteRestoreTaskMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetTeamListQuery,
  useUpdateUserProfileMutation,
  useActivateUserProfileMutation,
  useDeleteUserProfileMutation,
  useGetNotificationsQuery,
  useMarkNotiAsReadMutation,
}=apiSlice;
