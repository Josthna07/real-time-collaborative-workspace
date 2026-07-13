import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:5000/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URI,
    credentials: "include",
  }),

  tagTypes: [
    "Auth",
    "Workspace",
    "Board",
    "Task",
    "Comment",
    "Notification",
  ],

  endpoints: (builder) => ({

    // ==========================================================
    // AUTH
    // ==========================================================

    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // ==========================================================
    // WORKSPACE
    // ==========================================================

    getWorkspaces: builder.query({
      query: () => ({
        url: "/workspaces",
        method: "GET",
      }),
      providesTags: ["Workspace"],
    }),

    getWorkspace: builder.query({
      query: (id) => ({
        url: `/workspaces/${id}`,
        method: "GET",
      }),
      providesTags: ["Workspace"],
    }),

    createWorkspace: builder.mutation({
      query: (data) => ({
        url: "/workspaces",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Workspace"],
    }),

    updateWorkspace: builder.mutation({
      query: ({ id, data }) => ({
        url: `/workspaces/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Workspace"],
    }),

    deleteWorkspace: builder.mutation({
      query: (id) => ({
        url: `/workspaces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workspace"],
    }),

    inviteMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/workspaces/${id}/invite`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Workspace"],
    }),

    getWorkspaceBoards: builder.query({
      query: (workspaceId) => ({
        url: `/workspaces/${workspaceId}/boards`,
        method: "GET",
      }),
      providesTags: ["Board"],
    }),

    // ======= PART 2 STARTS BELOW =======
        // ==========================================================
    // BOARD
    // ==========================================================

    getBoards: builder.query({
      query: () => ({
        url: "/boards",
        method: "GET",
      }),
      providesTags: ["Board"],
    }),

    getBoard: builder.query({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "GET",
      }),
      providesTags: ["Board"],
    }),

    createBoard: builder.mutation({
      query: (data) => ({
        url: "/boards",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Board"],
    }),

    updateBoard: builder.mutation({
      query: ({ id, data }) => ({
        url: `/boards/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Board"],
    }),

    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Board"],
    }),

    // ==========================================================
    // TASK
    // ==========================================================

    getTasks: builder.query({
      query: () => ({
        url: "/tasks",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    getTask: builder.query({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),

        // ==========================================================
    // COMMENT
    // ==========================================================

    getComments: builder.query({
      query: (taskId) => ({
        url: `/comments/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),

    createComment: builder.mutation({
      query: (data) => ({
        url: "/comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),

    // ==========================================================
    // NOTIFICATION
    // ==========================================================

    getNotifications: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    createNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  // AUTH
  useRegisterUserMutation,
  useLoginUserMutation,

  // WORKSPACE
  useGetWorkspacesQuery,
  useGetWorkspaceQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useInviteMemberMutation,
  useGetWorkspaceBoardsQuery,

  // BOARD
  useGetBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,

  // TASK
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,

  // COMMENT
  useGetCommentsQuery,
  useCreateCommentMutation,

  // NOTIFICATION
  useGetNotificationsQuery,
  useCreateNotificationMutation,
} = apiSlice;


