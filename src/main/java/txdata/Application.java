package txdata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import txdata.persistence.HibernateUtil;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
    	
    	// Start hibernate to surface configuration errors early.
    	HibernateUtil.getSessionFactory();
    	
        SpringApplication.run(Application.class, args);
    }
}
