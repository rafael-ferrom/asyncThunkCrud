import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchPostById } from "../service/PostService";



export const ItemList = ({ postId }: { postId: number }) => {
  const dispatch = useAppDispatch();
  const { currentPost, loading, error } = useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Erro: {error}</Typography>;
  if (!currentPost) return <Typography>Post não encontrado.</Typography>;

  return (
    <Box>
        <Typography>{currentPost.title}</Typography>
        <Typography>{currentPost.body}</Typography>
    </Box>
  );
};
