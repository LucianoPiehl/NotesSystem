import React, { useState } from "react";
import { FaArchive, FaBoxOpen } from "react-icons/fa";

const NoteList = ({ notes, onSelectNote, showArchived, onToggleArchive, onCreateNote, selectedNoteId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedButtonId, setClickedButtonId] = useState(null);
  const notesPerPage = 10;
  const filteredNotes = notes.filter(note => note.archived === showArchived);
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const [isClicked, setIsClicked] = React.useState(false);
  const [isToggleClicked, setIsToggleClicked] = React.useState(false);

  const renderTagColors = (tags) => {
    if (!tags || tags.length === 0) return null;
    const widthPercent = 100 / tags.length;
    return (
      <div
        style={{
          display: "flex",
          height: "20px",
          marginTop: "6px",
          borderRadius: "8px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {tags.map((tag) => (
          <div
            key={tag.id}
            title={tag.name}
            style={{
              backgroundColor: tag.color,
              width: `${widthPercent}%`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
              boxShadow: "none",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scaleY(1.3)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scaleY(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        ))}
      </div>
    );
  };


  return (
    <div
      style={{
        minHeight: "70vh",
        overflowY: "auto",
        width: "100%",
        padding: "16px",
        borderRadius: "20px",
        backgroundColor: "#e3e6ea",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        boxSizing: "border-box",
        animation: "slideIn 0.4s ease",
      }}
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


     <button
       style={{
         marginBottom: "8px",
         width: "100%",
         backgroundColor: "rgb(224, 224, 224)",
         color: "#333",
         border: "none",
         padding: "8px 12px",
         borderRadius: "20px",
         cursor: "pointer",
         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
         transition: "transform 0.1s ease",
         transform: isToggleClicked ? "scale(0.95)" : "scale(1)",
       }}
       onClick={() => {
         setIsToggleClicked(true);
         onToggleArchive(!showArchived);
         setTimeout(() => setIsToggleClicked(false), 150);
       }}
     >
       {showArchived ? "Show Active Notes" : "Show Archived Notes"}
     </button>


  <div style={{ display: "flex", gap: "5px", marginBottom: "10px", justifyContent: "flex-end" }}>
    <button
      style={{
        backgroundColor: "rgb(224, 224, 224)", // mismo color que las notas
        color: "#333",
        border: "none",
        padding: "8px 12px",
        borderRadius: "20px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "transform 0.1s ease",
        transform: isClicked ? "scale(0.95)" : "scale(1)",
      }}
      onClick={() => {
        setIsClicked(true);
        onCreateNote();
        setTimeout(() => setIsClicked(false), 150);
      }}
    >
      <span style={{ fontSize: "20px" }}>📝</span> +
    </button>
  </div>

      {currentNotes.map((note) => {
        const isSelected = note.id === selectedNoteId;
        const isButtonClicked = clickedButtonId === note.id;
        return (
          <div
            key={note.id}
            onClick={() => onSelectNote(note)}
            style={{
              marginBottom: "8px",
              padding: "6px",
              cursor: "pointer",
              userSelect: "none",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "none",
              backgroundColor: isSelected ? "#f7f8fa" : "#d1d6dc",
              boxShadow: isSelected
                ? "0 16px 32px rgba(0,0,0,0.3), 0 6px 20px rgba(0,0,0,0.2)"
                : "0 4px 12px rgba(0,0,0,0.15)",
              transition: "box-shadow 0.3s ease, background-color 0.3s ease, transform 0.3s ease",
              transform: isSelected ? "translateY(-6px)" : "translateY(0)"
            }}
            onMouseEnter={e => {
              if (!isSelected) e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={e => {
              if (!isSelected) e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
          >
            <div>{note.title?.trim() ? note.title : "New Note"}</div>
           <div style={{ color: "#555", fontSize: "0.9rem", marginTop: "4px" }}>
             {(() => {
               const maxWords = 4;
               const maxChars = 45;
               const words = (note.content || "").split(" ");
               let preview = "";
               let count = 0;

               for (let word of words) {
                 if (count >= maxWords || (preview + word).length > maxChars) break;
                 preview += (preview ? " " : "") + word;
                 count++;
               }

               return preview + (words.length > count ? "..." : "");
             })()}
           </div>



            {renderTagColors(note.tags)}
            <button
              style={{
                marginTop: "4px",
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.1s ease",
                transform: isButtonClicked ? "scale(0.9)" : "scale(1)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setClickedButtonId(note.id);
                setTimeout(() => {
                  onSelectNote({ ...note, toggleArchive: true });
                  setClickedButtonId(null);
                }, 150);
              }}
              title={showArchived ? "Unarchive" : "Archive"}
            >
              {showArchived ? <FaBoxOpen style={{ fontSize: "1.4rem" }} /> : <FaArchive style={{ fontSize: "1.4rem" }} />}
            </button>

          </div>
        );
      })}

    </div>
  );
};

export default NoteList;
