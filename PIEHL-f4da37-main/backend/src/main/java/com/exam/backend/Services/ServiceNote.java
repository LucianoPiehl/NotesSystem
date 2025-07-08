package com.exam.backend.Services;

import com.exam.backend.Model.Note;
import com.exam.backend.Model.Tag;
import com.exam.backend.Repository.RepositoryNote;
import com.exam.backend.Repository.RepositoryTag;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ServiceNote {
    private final RepositoryNote repositoryNote;
    private final RepositoryTag repositoryTag;
    public ServiceNote(RepositoryNote repositoryNote,RepositoryTag repositoryTag){
        this.repositoryNote=repositoryNote;
        this.repositoryTag=repositoryTag;
    }
    //Get notes
    public List<Note> getNotes(){
        return repositoryNote.findAll();
    }
    //Get notes by id
    public Note getNoteById(Long id){
        return repositoryNote.findById(id).orElseThrow(()-> new EntityNotFoundException("Note with "+id+ " doesn't exist"));
    }

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void deleteNoteById(Long id) {
        entityManager.createNativeQuery("DELETE FROM note_tags WHERE note_id = :id")
                .setParameter("id", id)
                .executeUpdate();

        repositoryNote.deleteById(id);
    }

    //Update note
    public Note updateNote(Long id, Note update){
        Note findNote =  repositoryNote.findById(id).orElseThrow(()-> new EntityNotFoundException("Note with "+id+ " doesn't exist"));
        findNote.setTitle(update.getTitle());
        findNote.setContent(update.getContent());
        findNote.setId(update.getId());
        findNote.setTags(update.getTags());
        findNote.setArchived((update.isArchived()));
        return repositoryNote.save(findNote);
    }

    //Save note
    public void saveNote(Note newNote) {
        Set<Tag> managedTags = new HashSet<>();

        for (Tag tag : newNote.getTags()) {
            Tag managed = repositoryTag.findById(tag.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Tag not found with ID " + tag.getId()));
            managedTags.add(managed);
        }

        newNote.setTags(managedTags);
        repositoryNote.save(newNote);
    }


    //Find unfiled notes
    public List<Note> findUnfiledNotes(){
        return repositoryNote.findByArchivedFalse();
    }

    //Find archived notes
    public List<Note> findArchivedNotes(){
        return repositoryNote.findByArchivedTrue();
    }
    //Find notes by tagname
    public List<Note> getNotesByTagName(String tagName) {
        return repositoryNote.findByTagName(tagName);
    }

}
