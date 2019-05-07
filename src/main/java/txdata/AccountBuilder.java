package txdata;

public class AccountBuilder implements ObjectBuilder {

	private static final String BANK =  "BANKID";
	private static final String BRANCH =  "BRANCHID";
	private static final String ACCOUNT_ID =  "ACCTID";
	private static final String ACCOUNT_TYPE = "ACCTTYPE";
	
	Account account = new Account();

	@Override
	public void add(String tagName, String value) {
		switch(tagName) {
			case BANK: account.setBank(value); break;
			case BRANCH: account.setBranch(value); break;
			case ACCOUNT_ID: setAccountNumberAndSuffix(account, value); break;
			case ACCOUNT_TYPE: account.setType(value); break;
		}
	}

	private void setAccountNumberAndSuffix(Account account, String accountId) {
		String [] parts = accountId.split("-");
		account.setAccountNumber(parts[0]);
		account.setSuffix(threeDigitSuffix(parts[1]));
	}
	
	private String threeDigitSuffix(String suffix) {
		if (suffix.length() == 2) {
			return "0" + suffix;
		}
		return suffix;
	}

	@Override
	public Object build() {
		return account;
	}

}
