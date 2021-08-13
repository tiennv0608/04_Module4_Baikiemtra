package com.codegym.demo.controller;

import com.codegym.demo.model.City;
import com.codegym.demo.model.Nation;
import com.codegym.demo.service.nation.INationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/nations")
@CrossOrigin("*")
public class NationController {
    @Autowired
    private INationService nationService;

    @GetMapping
    public ResponseEntity<Iterable<Nation>> findAll(){
        List<Nation> nations = (List<Nation>) nationService.findAll();
        if (nations.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(nations, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Nation> create(@RequestBody Nation nation){
        nationService.save(nation);
        return new ResponseEntity<>(nation, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nation> findOne(@PathVariable Long id){
        Optional<Nation> nation = nationService.findById(id);
        if (!nation.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(nation.get(), HttpStatus.OK);
    }
}
