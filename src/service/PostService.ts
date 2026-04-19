import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IPosts } from "../types";
import { postApi } from "../utils/postApi";


export const fetchPosts = createAsyncThunk<
  IPosts[], 
  void, 
  { rejectValue: string }
>('posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postApi.get<IPosts[]>('/posts');
      return response.data;
    } catch (err) {
      return rejectWithValue('Erro ao buscar posts: ' + err);
    }
  }
);

export const fetchPostById = createAsyncThunk<
  IPosts, 
  number, 
  { rejectValue: string }
>('posts/fetchPostById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await postApi.get<IPosts>(`/posts/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue('Erro ao buscar post: ' + err);
    }
  }
);

export const fetchPostsByTitle = createAsyncThunk<
  IPosts[], 
  string, 
  { rejectValue: string }
>('posts/fetchByTitle',
  async (title, { rejectWithValue }) => {
    try {
      const response = await postApi.get<IPosts[]>(`/posts?title=${encodeURIComponent(title)}`);
      return response.data;
    } catch (err) {
      return rejectWithValue('Erro ao buscar posts por título: ' + err);
    }
  }
);

export const createPost = createAsyncThunk<
  IPosts, 
  Omit<IPosts, 'id'>, 
  { rejectValue: string }
>('posts/createPost',
  async (data, { rejectWithValue }) => {
    try {
      const response = await postApi.post<IPosts>('/posts', data);
      return response.data;
    } catch (err) {
      return rejectWithValue('Erro ao criar post: ' + err);
    }
  }
);

export const updatePost = createAsyncThunk<
  IPosts, 
  IPosts, 
  { rejectValue: string }
>('posts/updatePost',
  async (data, { rejectWithValue }) => {
    try {
      const response = await postApi.put<IPosts>(`/posts/${data.id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue('Erro ao atualizar post: ' + err);
    }
  }
);

export const editPost = createAsyncThunk<
  IPosts, 
  { id: number; data: Partial<IPosts> }, 
  { rejectValue: string }
>('posts/editPost', 
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await postApi.patch<IPosts>(`/posts/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue('Erro ao editar post: ' + err);
    }
  }
);

export const deletePost = createAsyncThunk<
  number, 
  number, 
  { rejectValue: string }
>('posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await postApi.delete(`/posts/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue('Erro ao deletar post: ' + err);
    }
  }
);
