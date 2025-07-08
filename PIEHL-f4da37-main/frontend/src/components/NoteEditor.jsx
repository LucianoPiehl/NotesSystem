import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const NoteEditor = ({
  note,
  onSaveNote,
  availableTags,
  onAddTagToNote,
  onRemoveTagFromNote,
  onDeleteNote,
}) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [tags, setTags] = useState(note ? note.tags : []);
  const [isDeleteClicked, setIsDeleteClicked] = React.useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setTags(note.tags || []);
    }
  }, [note]);

  useEffect(() => {
    if (!note || !note.id) return;
    const timeout = setTimeout(() => {
      const updatedNote = { ...note, title, content, tags };
      onSaveNote(updatedNote);
    }, 800);
    return () => clearTimeout(timeout);
  }, [title, content, tags]);

 const [animatedTagId, setAnimatedTagId] = useState(null);

 const onDropTag = (e) => {
   e.preventDefault();
   const tagId = e.dataTransfer.getData("text/plain");
   const tag = availableTags.find((t) => t.id.toString() === tagId);
   if (tag && !tags.some((t) => t.id === tag.id)) {
     const newTags = [...tags, tag];
     setTags(newTags);
     onAddTagToNote(note.id, tag);
     setAnimatedTagId(tag.id);
     setTimeout(() => setAnimatedTagId(null), 300); // duración animación
   }
 };

  const onDragOverTag = (e) => e.preventDefault();

  const removeTag = (tagId) => {
    const newTags = tags.filter((t) => t.id !== tagId);

    setTags(newTags);
    onRemoveTagFromNote(note.id, tagId);
  };

  if (!note) return <div style={{ padding: "20px", flex: 1 }}></div>;

  return (
    <div
      style={{
        flex: 1,
        borderRadius: "20px",
        marginLeft: "5px",
        marginRight: "25px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e3e6ea",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        boxSizing: "border-box",
        animation: "slideIn 0.4s ease",
        border: "none",
      }}
      onDrop={onDropTag}
      onDragOver={onDragOverTag}
    >
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          borderRadius: "15px",
          border: "none",
          marginBottom: "12px",
          padding: "10px",
          fontSize: "1.2rem",
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
          outline: "none",
          backgroundColor: "#e9ecef"
        }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={{
          borderRadius: "15px",
          border: "none",
          padding: "10px",
          fontSize: "1rem",
          minHeight: "150px",
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
          outline: "none",
          resize: "vertical",
          backgroundColor: "#e9ecef"
        }}
      />

      <div
        style={{
          color: "#999",
          marginTop: "10px",
          display: tags.length === 0 ? "flex" : "none",
          flexWrap: "wrap",
          gap: "8px",
          fontStyle: "italic",
        }}
      >
        Drag the tags here to assign them to the note.
      </div>

      <div
        style={{
          marginTop: tags.length === 0 ? 0 : "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {tags.map((tag) => (
          <div
            key={tag.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", tag.id)}
            style={{
              backgroundColor: tag.color,
              padding: "6px 14px",
              borderRadius: "20px",
              color: "white",
              cursor: "default",  // antes era grab
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
              userSelect: "none",
              transition: "transform 0.3s ease",
              transform: tag.id === animatedTagId ? "scale(1.1)" : "scale(1)"
            }}
            title="Drag to remove or click"
            onClick={() => removeTag(tag.id)}
          >
            {tag.name} &nbsp; &#10005;
          </div>
        ))}
      </div>




<button
  style={{
    marginTop: "20px",
    alignSelf: "flex-start",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "red",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "1.3rem",
    transition: "transform 0.1s ease",
    transform: isDeleteClicked ? "scale(0.9)" : "scale(1)",
  }}
  onClick={() => {
    setIsDeleteClicked(true);
    setTimeout(() => {
      onDeleteNote(note.id);
      setIsDeleteClicked(false);
    }, 150); // esperar 150ms para que se vea la animación
  }}
  title="Delete Note"
>
  <FaTrash />
</button>

    </div>
  );
};

export default NoteEditor;
