package txdata.services;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.hibernate.type.IntegerType;

import txdata.Account;
import txdata.TxData;
import txdata.Transaction;
import txdata.persistence.HibernateUtil;

public class StorageService {

	Session session = HibernateUtil.getSessionFactory().openSession();

	public void save(TxData txData) {
		session.beginTransaction();

		// Update txData with the saved account details,
		// or save the account if does not exist.
		useStoredAccountOrSaveAccount(txData);

		// Save txData.
		session.save(txData);

		// Save the transactions.
		saveTransactions(txData);

		session.getTransaction().commit();
	}

	public TxData getTxData(int id) {
		Query<TxData> query = session.createQuery("from TxData where id = :id", TxData.class);
		query.setParameter("id", id, IntegerType.INSTANCE);
		System.out.println("Before query txdata");
		TxData txData = query.uniqueResult();
		System.out.println("Before initialize account");
		Hibernate.initialize(txData.getAccount());
		System.out.println(txData.getAccount().toString() + " #" + txData.getAccount().getId());
//		System.out.println("Before initialize transactions");
//		Hibernate.initialize(txData.getTransactions());
//		System.out.println(txData.getTransactions().size());
		System.out.println("Before serialization");
		return txData;
	}

	public List<Account> getAccounts() {
		Query<Account> query = session.createQuery("from Account", Account.class);
		return query.list();
	}

	public Account getAccount(int id) {
		Query<Account> query = session.createQuery("from Account where id = :id", Account.class);
		query.setParameter("id", id, IntegerType.INSTANCE);
		return query.uniqueResult();
	}

	private void useStoredAccountOrSaveAccount(TxData txData) {
		Account account = txData.getAccount();
		List<Account> accounts = getAccounts();
		if (accounts.contains(account)) {
			txData.setAccount(accounts.get(accounts.indexOf(account)));
		} else {
			session.save(account);
		}
	}

	private void saveTransactions(TxData txData) {
		for (Transaction tx : txData.getTransactions()) {
			tx.setAccount(txData.getAccount());
			tx.setTxData(txData);
			session.save(tx);
		}
	}
}
