import React, { useState } from "react";
import { Plus, Check, X } from "lucide-react";
import ErrorMessage from "./ErrorMessage";


const TagList = ({ tags, onAddTag, onDeleteTag }) => {
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#ff0000");
  const startAdd = () => setAdding(true);
  const cancelAdd = () => {
    setAdding(false);
    setNewTagName("");
    setNewTagColor("#ff0000");
  };

    const submitAdd = () => {
      if (!newTagName.trim()) return;

      const colorExists = tags.some(tag => tag.color.toLowerCase() === newTagColor.toLowerCase());
      if (colorExists) {
        setError("There is already a tag with this color.");
        return;
      }

      onAddTag({ name: newTagName.trim(), color: newTagColor });
      cancelAdd();
      setError("");
    };


  const onDragStart = (e, tagId) => {
    e.dataTransfer.setData("text/plain", tagId);
  };

  return (
    <div
      style={{
        width: "18%",
        height: "90vh",
        overflowY: "auto",
        backgroundColor: "#e3e6ea",
        padding: "16px",
        borderRadius: "20px",
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
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      {tags.map((tag) => (
        <div
          key={tag.id}
          draggable
          onDragStart={(e) => onDragStart(e, tag.id)}
          style={{
            backgroundColor: tag.color,
            color: "white",
            marginBottom: "10px",
            padding: "8px 12px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "grab",
            userSelect: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
        >
          <div>{tag.name}</div>
          <button
            onClick={() => onDeleteTag(tag.id)}
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
            }}
          >
            &#10005;
          </button>
        </div>
      ))}

      {!adding && (
        <button
          onClick={startAdd}
          style={{
            backgroundColor: "#e0e0e0",
            border: "none",
            borderRadius: "50%",
            padding: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
            transition: "background 0.2s",
          }}
        >
          <Plus size={20} />
        </button>
      )}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}

      {adding && (

        <div style={{ marginTop: "16px", color: "#555" }}>
          <input
            type="text"
            placeholder="Tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "8px",
              borderRadius: "8px",
              padding: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <div style={{ marginBottom: "6px", fontSize: "12px" }}>
            Choose a label color
          </div>
          <input
            type="color"
            value={newTagColor}
            onChange={(e) => setNewTagColor(e.target.value)}
            style={{
              width: "100%",
              height: "36px",
              borderRadius: "13px",
              border: "none",
            }}
          />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={submitAdd}
              style={{
                backgroundColor: "#4caf50",
                border: "none",
                borderRadius: "6px",
                padding: "6px 10px",
                color: "white",
                cursor: "pointer",
              }}
            >
              <Check size={18} />
            </button>
            <button
              onClick={cancelAdd}
              style={{
                backgroundColor: "#f44336",
                border: "none",
                borderRadius: "6px",
                padding: "6px 10px",
                color: "white",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagList;
