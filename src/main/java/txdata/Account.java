package txdata;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Account implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	private static final String EMPTY_ACCOUNT_NUMBER = "00-0000-0000000-000";

	private int id;
	private String bank = "00";
	private String branch = "0000";
	private String accountNumber = "0000000";
	private String suffix = "000";
	private String type = "";
	private String alias = "";

	public Account() {
	}

	public Account(String formattedAccountNumber) {
		parse(formattedAccountNumber);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getSuffix() {
		return suffix;
	}

	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	@JsonProperty("formatted")
	public String getFormattedAccountNumber() {
		String[] parts = new String[] { bank, branch, accountNumber, suffix };
		String accountNumber = String.join("-", parts);
		return accountNumber;
	}

	public void parse(String formattedAccountNumber) {
		String[] parts = formattedAccountNumber.split("-");
		setBank(parts[0]);
		setBranch(parts[1]);
		setAccountNumber(parts[2]);
		setSuffix(parts[3]);
	}

	public boolean hasEmptyAccountNumber() {
		return getFormattedAccountNumber().equals(EMPTY_ACCOUNT_NUMBER);
	}

	public String toString() {
		return getFormattedAccountNumber();
	}

	public boolean equals(Object o) {
		if (o == this) {
			return true;
		}
		if (!(o instanceof Account)) {
			return false;
		}
		Account account = (Account) o;
		return toString().equals(account.toString());
	}

	public int hashCode() {
		int result = 17;
		result = 31 * result + bank.hashCode();
		result = 31 * result + branch.hashCode();
		result = 31 * result + accountNumber.hashCode();
		result = 31 * result + suffix.hashCode();
		return result;
	}
}
