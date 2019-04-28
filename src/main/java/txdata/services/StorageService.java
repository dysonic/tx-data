package txdata.services;

import org.hibernate.Session;

import txdata.TxData;
import txdata.persistence.HibernateUtil;

public class StorageService {

	
	public void save(TxData txData) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        
        session.beginTransaction();
        session.save(txData);
        session.getTransaction().commit();
	}
}
