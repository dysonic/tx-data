package txdata.persistence;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;

public class HibernateAwareObjectMapper extends ObjectMapper {
	private static final long serialVersionUID = 1L;

    public HibernateAwareObjectMapper() {
        // This for Hibernate 5; change 5 to 4 or 3 if you need to support
        // Hibernate 4 or Hibernate 3 instead
        registerModule(new Hibernate5Module());
    }
}
