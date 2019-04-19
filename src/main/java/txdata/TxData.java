package txdata;

import java.time.LocalDate;
import java.util.ArrayList;

public class TxData {

    private long id;
	private Account account;
	private LocalDate startDate;
	private LocalDate endDate;
	private ArrayList<Transaction> transactions;

	public TxData() {
		transactions = new ArrayList<Transaction>();
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

    public long getId() {
    	return id;
    }

    public void setId(long id) {
    	this.id = id;
    }

    public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
	
	public void addTransaction(Transaction transaction) {
		transactions.add(transaction);
	}

}
