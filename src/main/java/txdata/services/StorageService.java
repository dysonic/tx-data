package txdata.services;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.hibernate.type.IntegerType;

import txdata.Account;
import txdata.TxData;
import txdata.persistence.HibernateUtil;
public class StorageService {

    Session session = HibernateUtil.getSessionFactory().openSession();
    
	public void save(TxData txData) {
		session.beginTransaction();
		
		// Save the account if does not exist.
		// Otherwise update txData with the saved account details.
		Account account = txData.getAccount();
        List<Account> accounts = getAccounts();
        if (accounts.contains(account)) {
        	txData.setAccount(accounts.get(accounts.indexOf(account)));
        } else {
        	session.save(account);        	
        }
        
        // Save txData.
        session.save(txData);
        session.getTransaction().commit();
	}

	public Account getAccount(int id) {
		  Query<Account> query = session.createQuery("from Account where id = :id", Account.class);
		  query.setParameter("id", id, IntegerType.INSTANCE);
		  return query.uniqueResult();
	}
	
	public List<Account> getAccounts() {
		  Query<Account> query = session.createQuery("from Account", Account.class);
		  return query.list();
	}
	
	
	private boolean hasAccountBeenSaved(Account account) {
		return getAccounts().contains(account);
	}
}
