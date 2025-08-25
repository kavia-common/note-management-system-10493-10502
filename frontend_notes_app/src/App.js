import { useState, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Fab,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { NotesProvider } from './contexts/NotesContext';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import './App.css';

// Create theme with the specified colors
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#424242',
    },
    accent: {
      main: '#ffca28',
      contrastText: '#000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
      },
    },
  },
});

// PUBLIC_INTERFACE
function App() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAddNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setSelectedNote(null);
  };

  const appBarSx = useMemo(() => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotesProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static" sx={appBarSx}>
            <Toolbar>
              <Typography 
                variant="h6" 
                component="h1" 
                sx={{ 
                  flexGrow: 1,
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                Notes App
              </Typography>
            </Toolbar>
          </AppBar>

          <Container 
            maxWidth="lg" 
            sx={{ 
              flex: 1, 
              py: 4,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ flex: 1 }}>
              {isEditorOpen ? (
                <NoteEditor
                  noteToEdit={selectedNote}
                  onClose={handleCloseEditor}
                />
              ) : (
                <NoteList onEditNote={handleEditNote} />
              )}
            </Box>
          </Container>

          {!isEditorOpen && (
            <Fab
              color="primary"
              aria-label="add note"
              onClick={handleAddNote}
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <AddIcon />
            </Fab>
          )}
        </Box>
      </NotesProvider>
    </ThemeProvider>
  );
}

export default App;
