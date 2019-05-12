package txdata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;

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
	    return new HibernateAwareObjectMapper();
	}
}
