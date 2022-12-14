package co.edu.sena.repository;

import co.edu.sena.domain.DocumentType;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DocumentType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentTypeRepository extends JpaRepository<DocumentType, Long> {
    Optional<DocumentType> findByDocumentName(String documentName);
    Optional<DocumentType> findByInitials(String initials);
}
