import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import TagList from "./components/TagList";
import TagFilter from "./components/TagFilter";



function App() {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [filterTags, setFilterTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotes();
    loadTags();
  }, []);

  const loadNotes = useCallback(() => {
    let url = showArchived ? `/notes/getArchivedNotes` : `/notes/getUnfiledNotes`;

    if (filterTags.length > 0) {
      Promise.all(
        filterTags.map((tag) => axios.get(`/notes/getNotesByTag/${tag.name}`))
      )
        .then((results) => {
          const allNotes = results.flatMap((res) => res.data);

          const uniqueNotes = Array.from(
            new Map(allNotes.map((note) => [note.id, note])).values()
          );

          const filtered = uniqueNotes.filter((note) =>
            filterTags.every((fTag) =>
              note.tags.some((ntTag) => ntTag.id === fTag.id)
            )
          );

          setNotes(filtered);
        })
        .catch(() => setError("Error loading filtered notes"));
    } else {
      axios
        .get(url)
        .then((res) => {
          setNotes(res.data);
          setError(null);
        })
        .catch(() => setError("Error loading notes"));
    }
  }, [showArchived, filterTags]);

  const loadTags = () => {
    axios
      .get(`/tags/getTags`)
      .then((res) => {
        setTags(res.data);
        setError(null);
      })
      .catch(() => setError("Error loading tags"));
  };

  const handleCreateNote = () => {
    const newNote = { title: "", content: "", tags: [], archived: showArchived };
    axios
      .post(`/notes/saveNote`, newNote)
      .then((res) => {
        setSelectedNote(res.data);
        loadNotes();
      })
      .catch(() => setError("Error creating note"));
  };

  const handleSaveNote = (noteToSave) => {
    if (!noteToSave) return;

    if (noteToSave.id) {
      setSelectedNote(noteToSave);
      return axios
        .put(`/notes/updateNote/${noteToSave.id}`, noteToSave)
        .then(() => loadNotes())
        .catch(() => setError("Error saving note"));
    }
  };

  const handleSelectNote = (note) => {
    if (!note || !note.id) return;

    if (note.toggleArchive !== undefined) {
      const toggledNote = { ...note, archived: !note.archived };
      axios
        .put(`/notes/updateNote/${note.id}`, toggledNote)
        .then(() => {
          loadNotes();
          setSelectedNote(null);
        })
        .catch(() => setError("Error updating note archive status"));
      return;
    }

    if (selectedNote && selectedNote.id === note.id) return;

    if (selectedNote && selectedNote.id) {
      handleSaveNote(selectedNote);
    }

    setSelectedNote(note);
  };

  const handleAddTagToNote = (noteId, tag) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;
    const updatedTags = [...note.tags, tag];
    const updatedNote = { ...note, tags: updatedTags };
    handleSaveNote(updatedNote);
    setSelectedNote(updatedNote);
  };

  const handleRemoveTagFromNote = (noteId, tagId) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;
    const updatedTags = note.tags.filter((t) => t.id !== tagId);
    const updatedNote = { ...note, tags: updatedTags };
    handleSaveNote(updatedNote);
    setSelectedNote(updatedNote);
  };

  const handleAddTag = (tagData) => {
    axios
      .post(`/tags/saveTag`, {
        name: tagData.name,
        color: tagData.color,
      })
      .then((res) => {
        const newTag = res.data;

        setTags([...tags, newTag]);
        setError(null);
      })
      .catch(() => setError("Error adding tag"));
  };

  const handleDeleteTag = (tagId) => {
    axios
      .delete(`/tags/deleteTag/${tagId}`)
      .then(() => {
        setTags(tags.filter((t) => t.id !== tagId));
        loadNotes();
        setError(null);
      })
      .catch(() => setError("Error deleting tag"));
  };

  const handleDeleteNote = (noteId) => {
    axios
      .delete(`/notes/deleteNote/${noteId}`)
      .then(() => {
        loadNotes();
        setSelectedNote(null);
        setError(null);
      })
      .catch(() => setError("Error deleting note"));
  };

  const onDropFilterTag = (e) => {
    e.preventDefault();
    const tagId = e.dataTransfer.getData("text/plain");
    const tag = tags.find((t) => t.id.toString() === tagId);
    if (tag && !filterTags.some((f) => f.id === tag.id)) {
      setFilterTags([...filterTags, tag]);
    }
  };

  const onDragOverFilterTag = (e) => {
    e.preventDefault();
  };

  const removeFilterTag = (tagId) => {
    setFilterTags(filterTags.filter((t) => t.id !== tagId));
  };

  useEffect(() => {
    const handler = (e) => {
      if (selectedNote) {
        e.preventDefault();
        handleSaveNote(selectedNote);
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [selectedNote]);

  useEffect(() => {
    loadNotes();
  }, [showArchived, filterTags, loadNotes]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        padding: "10px",
        gap: "10px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <TagList tags={tags} onAddTag={handleAddTag} onDeleteTag={handleDeleteTag} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TagFilter
          filterTags={filterTags}
          onRemoveFilterTag={removeFilterTag}
          onDropTag={onDropFilterTag}
          onDragOverTag={onDragOverFilterTag}
        />

        <NoteList
          notes={notes}
          onSelectNote={handleSelectNote}
          showArchived={showArchived}
          onToggleArchive={setShowArchived}
          onCreateNote={handleCreateNote}
          selectedNoteId={selectedNote?.id}
        />
      </div>

      <NoteEditor
        note={selectedNote}
        onSaveNote={handleSaveNote}
        availableTags={tags}
        onAddTagToNote={handleAddTagToNote}
        onRemoveTagFromNote={handleRemoveTagFromNote}
        onDeleteNote={handleDeleteNote}
      />

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            padding: "10px 40px 10px 10px",
            borderRadius: "5px",
            position: "fixed",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "90vw",
            boxSizing: "border-box",
            wordWrap: "break-word",
            zIndex: 9999,
          }}
        >
          {error}
          <button
            onClick={() => setError("")}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              color: "#721c24",
            }}
            aria-label="Close error message"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
 