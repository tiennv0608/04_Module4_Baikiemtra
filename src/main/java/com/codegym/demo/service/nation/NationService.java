package com.codegym.demo.service.nation;

import com.codegym.demo.model.Nation;
import com.codegym.demo.repository.NationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class NationService implements INationService{
    @Autowired
    private NationRepository nationRepository;

    @Override
    public Iterable<Nation> findAll() {
        return nationRepository.findAll();
    }

    @Override
    public Optional<Nation> findById(Long id) {
        return nationRepository.findById(id);
    }

    @Override
    public void save(Nation nation) {
        nationRepository.save(nation);
    }

    @Override
    public void remove(Long id) {
        nationRepository.deleteById(id);
    }
}
