package txdata;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TransactionBuilder implements ObjectBuilder {

	Logger logger = LoggerFactory.getLogger(LoggingController.class);
	
	private static final String DATE_POSTED =  "DTPOSTED";
	private static final String AMOUNT =  "TRNAMT";
	private static final String NAME = "NAME";
	private static final String MEMO = "MEMO";

	private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
	private Transaction transaction;
	
	TransactionBuilder(int sequence) {
		transaction = new Transaction();
		transaction.setTxSequence(sequence);
	}
	
	@Override
	public void add(String tagName, String value) {
		switch(tagName) {
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
