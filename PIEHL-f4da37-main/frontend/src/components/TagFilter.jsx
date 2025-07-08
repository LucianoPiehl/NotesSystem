import React, { useState } from "react";

const TagFilter = ({ filterTags, onRemoveFilterTag, onDropTag, onDragOverTag }) => {
  const [animatedTagId, setAnimatedTagId] = useState(null);

  const handleDropTag = (e) => {
    e.preventDefault();
    const tagId = e.dataTransfer.getData("text/plain");
    onDropTag(e); // Llamar a la prop para agregar el tag

    setAnimatedTagId(tagId);
    setTimeout(() => setAnimatedTagId(null), 300);
  };

  return (
    <div
      onDrop={handleDropTag}
      onDragOver={onDragOverTag}
      style={{
        minHeight: "40px",
        borderRadius: "20px",
        marginBottom: "12px",
        padding: "10px",
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        backgroundColor: "#e3e6ea",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        boxSizing: "border-box",
        animation: "slideIn 0.4s ease",
        border: "none",
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

      {filterTags.length === 0 && (
        <div style={{ color: "#999", fontStyle: "italic", flexGrow: 1 }}>
          Drag tags here to filter notes
        </div>
      )}

      {filterTags.map((tag) => (
        <div
          key={tag.id}
          style={{
            backgroundColor: tag.color,
            color: "white",
            borderRadius: "20px",
            padding: "6px 14px",
            display: "flex",
            alignItems: "center",
            cursor: "default",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
            userSelect: "none",
            transition: "transform 0.3s ease",
            transform: tag.id.toString() === animatedTagId ? "scale(1.1)" : "scale(1)",
          }}
        >
          {tag.name}
          <button
            style={{
              marginLeft: "8px",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              lineHeight: "1",
              userSelect: "none",
            }}
            onClick={() => onRemoveFilterTag(tag.id)}
            aria-label={`Remove tag ${tag.name}`}
          >
            &#10005;
          </button>
        </div>
      ))}
    </div>
  );
};

export default TagFilter;
