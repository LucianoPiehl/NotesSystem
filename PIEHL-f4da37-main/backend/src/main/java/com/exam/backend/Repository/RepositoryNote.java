package com.exam.backend.Repository;

import com.exam.backend.Model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RepositoryNote extends JpaRepository<Note,Long> {
    List<Note> findByArchivedTrue();
    List<Note> findByArchivedFalse();
    @Query("SELECT n FROM Note n JOIN n.tags t WHERE t.name = :tagName")
    List<Note> findByTagName(@Param("tagName") String tagName);


}
