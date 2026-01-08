package com.uchilishte1.demo.repos;

import com.uchilishte1.demo.models.entities.Klas;
import com.uchilishte1.demo.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KlasRepository extends JpaRepository<Klas, UUID> {
    List<Klas> findByTeacher(User teacher);
}

