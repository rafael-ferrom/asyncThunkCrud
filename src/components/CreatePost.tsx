import { useState } from "react";
import { Box, Button, FormLabel, Input, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import type { IPosts } from "../types";
import { createPost } from "../service/PostService";


export const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.post);
  
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.body.trim()) {
      return;
    }

    const postData: Omit<IPosts, 'id'> = {
      title: formData.title.trim(),
      body: formData.body.trim(),
      userId: formData.userId
    };

    const result = await dispatch(createPost(postData));
    
    // Se criou com sucesso, limpa o formulário
    if (createPost.fulfilled.match(result)) {
      setFormData({ title: '', body: '', userId: 1 });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Typography>Criar Novo Post</Typography>
      
      <form onSubmit={handleSubmit}>
        <Box>
          <FormLabel htmlFor="title">Título:</FormLabel>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>
        
        <Box>
          <FormLabel htmlFor="body">Conteúdo:</FormLabel>
          <TextField
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={4}
            required
          />
        </Box>
        
        <Box>
          <FormLabel htmlFor="userId">User ID:</FormLabel>
          <Input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={(e) => setFormData(prev => ({ ...prev, userId: parseInt(e.target.value) }))}
            required
          />
        </Box>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Post'}
        </Button>
      </form>
      
      {error && <Box>Erro: {error}</Box>}
    </Box>
  );
};
