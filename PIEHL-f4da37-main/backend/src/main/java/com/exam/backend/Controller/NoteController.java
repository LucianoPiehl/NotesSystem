package com.exam.backend.Controller;

import com.exam.backend.Model.Note;
import com.exam.backend.Services.ServiceNote;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("notes")
@CrossOrigin(origins = "*")

public class NoteController {
    private final ServiceNote serviceNote;

    public NoteController(ServiceNote serviceNote){
        this.serviceNote = serviceNote;
    }
    //Get Notes
    @GetMapping("/getNotes")
    public List<Note> getNotes(){
        return serviceNote.getNotes();
    }
    //Find archived notes
    @GetMapping("/getArchivedNotes")
    public List<Note> findByArchivedTrue(){
        return serviceNote.findArchivedNotes();
    }

    //Find unfiled notes
    @GetMapping("/getUnfiledNotes")
    public List<Note> findByArchivedFalse(){
        return serviceNote.findUnfiledNotes();
    }

    //Get note by id
    @GetMapping("/getNoteById/{id}")
    public Note getNoteByID(@PathVariable Long id){
        return serviceNote.getNoteById(id);
    }

    //Delete note by id
    @DeleteMapping("/deleteNote/{id}")
    public void deleteNoteById(@PathVariable Long id){
        serviceNote.deleteNoteById(id);
    }

    //Save note
    @PostMapping("/saveNote")
    public void saveNote(@RequestBody Note note){
        serviceNote.saveNote(note);
    }

    //Update note
    @PutMapping("/updateNote/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note update){
        return serviceNote.updateNote(id,update);
    }

    @GetMapping("/getNotesByTag/{tagName}")
    public List<Note> getNotesByTagName(@PathVariable String tagName) {
        return serviceNote.getNotesByTagName(tagName);
    }


}

