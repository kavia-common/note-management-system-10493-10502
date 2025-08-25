import { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

// PUBLIC_INTERFACE
export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // PUBLIC_INTERFACE
  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      title: note.title,
      content: note.content,
      category: note.category || 'general',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  // PUBLIC_INTERFACE
  const updateNote = (id, updatedNote) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    ));
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // PUBLIC_INTERFACE
  const getNoteById = (id) => {
    return notes.find(note => note.id === id);
  };

  return (
    <NotesContext.Provider value={{
      notes,
      addNote,
      updateNote,
      deleteNote,
      getNoteById
    }}>
      {children}
    </NotesContext.Provider>
  );
};

// PUBLIC_INTERFACE
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
