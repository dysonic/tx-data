package txdata;

public class TxData {

    private long id;

	private Account account;


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

}
