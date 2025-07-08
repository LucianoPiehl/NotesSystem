    package com.exam.backend.Services;

import com.exam.backend.Model.Tag;
import com.exam.backend.Repository.RepositoryTag;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceTag {
    private final RepositoryTag repositoryTag;

    public ServiceTag(RepositoryTag repositoryTag) {
        this.repositoryTag = repositoryTag;
    }
    //Get tags
    public List<Tag> getAllTags() {
        return repositoryTag.findAll();
    }

    //Save tag
    public Tag saveTag(Tag tag) {

        if (repositoryTag.existsByColor(tag.getColor())) {
            throw new IllegalArgumentException("COLOR_ALREADY_EXISTS");
        }
        return repositoryTag.save(tag);
    }
    //Delete tag by id
    public void deleteTagById(Long id) {
        repositoryTag.deleteById(id);
    }
}
