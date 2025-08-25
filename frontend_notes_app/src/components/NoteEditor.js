import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Paper,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNotes } from '../contexts/NotesContext';

// PUBLIC_INTERFACE
const NoteEditor = ({ noteToEdit, onClose }) => {
  const { addNote, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (noteToEdit) {
      updateNote(noteToEdit.id, { title, content });
    } else {
      addNote({ title, content });
    }

    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 3,
        position: 'relative',
        bgcolor: 'background.paper'
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          variant="outlined"
          sx={{ mb: 2 }}
        />
        
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          required
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ 
            alignSelf: 'flex-start',
            px: 4 
          }}
        >
          {noteToEdit ? 'Update Note' : 'Add Note'}
        </Button>
      </Box>
    </Paper>
  );
};

export default NoteEditor;
