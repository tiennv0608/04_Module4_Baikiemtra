package com.codegym.demo.controller;

import com.codegym.demo.model.City;
import com.codegym.demo.model.Nation;
import com.codegym.demo.service.city.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cities")
@CrossOrigin("*")
public class CityController {
    @Autowired
    private ICityService cityService;

    @GetMapping
    public ResponseEntity<Iterable<City>> findAll(){
        List<City> cities = (List<City>) cityService.findAll();
        if (cities.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cities, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<City> create(@RequestBody City city){
        cityService.save(city);
        return new ResponseEntity<>(city, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> findOne(@PathVariable Long id){
        Optional<City> city = cityService.findById(id);
        if (!city.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(city.get(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> update(@PathVariable Long id, @RequestBody City city){
        Optional<City> cityOptional = cityService.findById(id);
        if (!cityOptional.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        city.setId(id);
        cityService.save(city);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        Optional<City> cityOptional = cityService.findById(id);
        if (!cityOptional.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cityService.remove(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
