import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { deletePost } from "../service/PostService";
import { clearError } from "../Slice/PostSlice";

interface DeletePostProps {
  postId: number;
  postTitle?: string;
  onDeleteSuccess?: () => void;
}

export const DeletePost: React.FC<DeletePostProps> = ({ 
  postId, 
  postTitle, 
  onDeleteSuccess 
}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.post);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    const result = await dispatch(deletePost(postId));
    
    if (deletePost.fulfilled.match(result)) {
      setShowConfirm(false);
      onDeleteSuccess?.();
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    dispatch(clearError());
  };

  if (!showConfirm) {
    return (
      <Button 
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        style={{ backgroundColor: '#dc3545', color: 'white' }}
      >
        Deletar Post
      </Button>
    );
  }

  return (
    <Box>
      <Typography>Confirmar Exclusão</Typography>
      <Typography>
        Tem certeza que deseja deletar o post
        {postTitle && <strong> "{postTitle}"</strong>}?
      </Typography>
      <Typography>Esta ação não pode ser desfeita.</Typography>
      
      <Button 
        onClick={handleDelete}
        disabled={loading}
        style={{ backgroundColor: '#dc3545', color: 'white', marginRight: '10px' }}
      >
        {loading ? 'Deletando...' : 'Sim, Deletar'}
      </Button>
      
      <Button 
        onClick={handleCancel}
        disabled={loading}
      >
        Cancelar
      </Button>
      
      {error && <Box>Erro: {error}</Box>}
    </Box>
  );
};

