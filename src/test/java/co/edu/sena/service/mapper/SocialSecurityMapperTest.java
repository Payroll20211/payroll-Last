package co.edu.sena.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SocialSecurityMapperTest {

    private SocialSecurityMapper socialSecurityMapper;

    @BeforeEach
    public void setUp() {
        socialSecurityMapper = new SocialSecurityMapperImpl();
    }
}
