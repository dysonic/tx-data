package txdata;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class TransactionBuilder implements ObjectBuilder {

	private static final String TYPE =  "TRNTYPE";
	private static final String DATE_POSTED =  "DTPOSTED";
	private static final String AMOUNT =  "TRNAMT";
	private static final String NAME = "NAME";
	private static final String MEMO = "MEMO";

	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
	private Transaction transaction;
	
	TransactionBuilder() {
		transaction = new Transaction();
	}
	
	private void setTransactionTypeFromValue(String value) {
		if (value.equals("DEBIT")) {
			transaction.setType(TransactionType.DEBIT);
		}
		if (value.equals("CREDIT")) {
			transaction.setType(TransactionType.CREDIT);
		}
	}
	
	@Override
	public void add(String tagName, String value) {
		switch(tagName) {
			case TYPE: setTransactionTypeFromValue(value); break;
			case DATE_POSTED: transaction.setDate(LocalDate.parse(value, formatter)); break;
			case AMOUNT: transaction.setAmount(Float.parseFloat(value)); break;
			case NAME: transaction.setName(value); break;
			case MEMO: transaction.setDetails(value); break;
		}
	}

	@Override
	public Object build() {
		return transaction;
	}

}
