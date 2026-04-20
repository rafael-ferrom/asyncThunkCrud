import { useState } from "react";
import { Box, Button, FormLabel, Input, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import type { IPosts } from "../types";
import { editPost } from "../service/PostService";

interface EditPostProps {
  postId: number;
}

export const EditPost: React.FC<EditPostProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.post);
  
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Monta apenas os campos que foram preenchidos
    const updateData: Partial<IPosts> = {};
    if (formData.title.trim()) updateData.title = formData.title.trim();
    if (formData.body.trim()) updateData.body = formData.body.trim();
    
    if (Object.keys(updateData).length === 0) {
      return; // Nada para atualizar
    }

    const result = await dispatch(editPost({ id: postId, data: updateData }));
    
    // Limpa o formulário se editou com sucesso
    if (editPost.fulfilled.match(result)) {
      setFormData({ title: '', body: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Typography>Editar Post (PATCH)</Typography>
      <Typography>Preencha apenas os campos que deseja alterar:</Typography>
      
      <form onSubmit={handleSubmit}>
        <Box>
          <label htmlFor="title">Novo Título (opcional):</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Deixe vazio para não alterar"
          />
        </Box>
        
        <Box>
          <FormLabel htmlFor="body">Novo Conteúdo (opcional):</FormLabel>
          <TextField
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={4}
            placeholder="Deixe vazio para não alterar"
          />
        </Box>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Editando...' : 'Editar Post'}
        </Button>
      </form>
      
      {error && <Box>Erro: {error}</Box>}
    </Box>
  );
};
