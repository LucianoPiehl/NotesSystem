package com.exam.backend.Controller;

import com.exam.backend.Model.Tag;
import com.exam.backend.Services.ServiceTag;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("tags")
@CrossOrigin(origins = "*")

public class TagController {
    private final ServiceTag serviceTag;

    public TagController(ServiceTag serviceTag) {
        this.serviceTag = serviceTag;
    }
    //Get tags
    @GetMapping("/getTags")
    public List<Tag> getAllTags() {
        return serviceTag.getAllTags();
    }
    //Save tag
    @PostMapping(value = "/saveTag", consumes = "application/json")
    public Tag saveTag(@RequestBody Tag tag) {
        return serviceTag.saveTag(tag);
    }
    //Delete tag by id
    @DeleteMapping("/deleteTag/{id}")
    public void deleteTagById(@PathVariable Long id) {
        serviceTag.deleteTagById(id);
    }
}
