import { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

// PUBLIC_INTERFACE
const NoteList = ({ onEditNote }) => {
  const { notes, deleteNote } = useNotes();
  const [hoveredNote, setHoveredNote] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (notes.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          backgroundColor: 'transparent'
        }}
      >
        <Typography variant="body1" color="textSecondary">
          No notes yet. Create your first note!
        </Typography>
      </Paper>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notes.map((note) => (
        <ListItem
          key={note.id}
          sx={{
            mb: 1,
            borderRadius: 1,
            bgcolor: hoveredNote === note.id ? 'rgba(25, 118, 210, 0.08)' : 'white',
            transition: 'background-color 0.3s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
          }}
          onMouseEnter={() => setHoveredNote(note.id)}
          onMouseLeave={() => setHoveredNote(null)}
        >
          <ListItemText
            primary={
              <Typography variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                {note.title}
              </Typography>
            }
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 0.5
                  }}
                >
                  {note.content}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Last updated: {formatDate(note.updatedAt)}
                </Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            <IconButton 
              edge="end" 
              aria-label="edit"
              onClick={() => onEditNote(note)}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              edge="end" 
              aria-label="delete"
              onClick={() => deleteNote(note.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default NoteList;
