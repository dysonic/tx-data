package txdata;

public class AccountBuilder implements ObjectBuilder {

	private static final String BANK =  "BANKID";
	private static final String BRANCH =  "BRANCHID";
	private static final String ACCOUNT_ID =  "ACCTID";
	private static final String ACCOUNT_TYPE = "ACCTTYPE";
	
	Account account;
	
	AccountBuilder() {
		account = new Account();
	}

	@Override
	public void add(String tagName, String value) {
		switch(tagName) {
			case BANK: account.setBank(value); break;
			case BRANCH: account.setBranch(value); break;
			case ACCOUNT_ID: account.setAccountNumber(value); break;
			case ACCOUNT_TYPE: account.setType(value); break;
		}
	}

	@Override
	public Object build() {
		return account;
	}

}
