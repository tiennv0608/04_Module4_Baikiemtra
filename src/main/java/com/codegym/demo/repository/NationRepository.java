package com.codegym.demo.repository;

import com.codegym.demo.model.Nation;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NationRepository extends PagingAndSortingRepository<Nation, Long> {
}
