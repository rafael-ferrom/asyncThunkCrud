import { Box, CircularProgress, List, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchPosts } from "../service/PostService";

const ListPost = () => {
  const { posts,loading, error } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Erro: {error}</Typography>;
  if (!posts.length) return <Typography>Nenhum post encontrado.</Typography>;

  return (
    <Box>
        <Typography>Lista de posts</Typography>
      {posts.map((post) => {
        return (
          <Box key={post.id}>
            <List>
            <ListItem>{post.title}</ListItem>
            <ListItem>{post.body}</ListItem>
          </List>
          </Box>
        );
      })}
    </Box>
  );
};

export default ListPost;