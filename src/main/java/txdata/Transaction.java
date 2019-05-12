package txdata;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Transaction implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	
	private int id;
	private LocalDate date;
	private float amount;
	private String name;
	private String details;
	private TxData txData;
	private int txSequence;
	private Account account;

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	@JsonIgnore
	public TxData getTxData() {
		return txData;
	}
	
	public int getTxDataId() {
		if (txData != null) {			
			return txData.getId();
		}
		return 0;
	}
    
	public void setTxData(TxData txData) {
		this.txData = txData;
	}

	public int getTxSequence() {
		return txSequence;
	}

	public void setTxSequence(int sequence) {
		this.txSequence = sequence;
	}

	@JsonIgnore
	public Account getAccount() {
		return account;
	}
	
	public int getAccountId() {
		if (account != null) {
			return account.getId();
		}
		return 0;
	}
    
	public void setAccount(Account account) {
		this.account = account;
	}
	
	
}
