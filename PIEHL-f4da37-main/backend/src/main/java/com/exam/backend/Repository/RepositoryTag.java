package com.exam.backend.Repository;

import com.exam.backend.Model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RepositoryTag extends JpaRepository<Tag, Long> {
        boolean existsByColor(String color);
}
