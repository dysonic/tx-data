package txdata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import txdata.persistence.HibernateAwareObjectMapper;
import txdata.persistence.HibernateUtil;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
    	
    	// Start hibernate to surface configuration errors early.
    	HibernateUtil.getSessionFactory();
    	
        SpringApplication.run(Application.class, args);
    }
    
    @Bean
    @Primary
    public ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
	    ObjectMapper objectMapper = new HibernateAwareObjectMapper();
	    objectMapper.registerModule(new JavaTimeModule());
	    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);	    
	    return objectMapper;
	}
}
