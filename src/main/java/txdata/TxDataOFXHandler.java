package txdata;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Stack;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.webcohesion.ofx4j.io.OFXHandler;
import com.webcohesion.ofx4j.io.OFXSyntaxException;

public class TxDataOFXHandler implements OFXHandler {

	private static final String BANK_ACCOUNT_FROM = "BANKACCTFROM";
	private static final String BANK_TRANSACTION_LIST = "BANKTRANLIST";
	private static final String STATEMENT_TRANSACTION = "STMTTRN";
	
	Logger logger = LoggerFactory.getLogger(LoggingController.class);
	TxData txData;
	Stack<ObjectBuilder> builders;
	ObjectBuilder noopBuilder;
	

	class NoopBuilder implements ObjectBuilder {

		@Override
		public void add(String tagName, String value) {			
		}

		@Override
		public Object build() {
			return null;
		}
		
	}
	
	class TxDataBuilder implements ObjectBuilder {

		private static final String DATE_START =  "DTSTART";
		private static final String DATE_END =  "DTEND";
		
		private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
		
		@Override
		public void add(String tagName, String value) {
			switch(tagName) {
				case DATE_START: txData.setStartDate(LocalDate.parse(value, formatter)); break;
				case DATE_END: txData.setEndDate(LocalDate.parse(value, formatter)); break;
			}
		}

		@Override
		public Object build() {
			return null;
		}
	}

	public TxDataOFXHandler(TxData txData) {
		this.txData = txData;
		builders = new Stack<ObjectBuilder>();
		noopBuilder = new NoopBuilder();
	}

	public TxData getTxData() {
		return txData;
	}
	
	@Override
	public void onHeader(String name, String value) throws OFXSyntaxException {
//		logger.info("onHeader: name: " + name + ", value: " + value);
	}

	@Override
	public void onElement(String name, String value) throws OFXSyntaxException {
//		logger.info("onElement: name: " + name + ", value: " + value);
		getBuilder().add(name, value);
		
	}

	private void pushBuilder(ObjectBuilder objectBuilder) {
		builders.push(objectBuilder);
//		logger.info("pushBuilder: #" + builders.size() + " after");
	}
	
	private ObjectBuilder popBuilder() {
//		logger.info("popBuilder: #" + builders.size() + " before");
		return builders.pop();
	}
	
	private ObjectBuilder getBuilder() {
		return builders.peek();
	}

	@Override
	public void startAggregate(String aggregateName) throws OFXSyntaxException {
//		logger.info("startAggregate: " + aggregateName);
		switch(aggregateName) {
			case BANK_ACCOUNT_FROM: pushBuilder(new AccountBuilder()); break;
			case BANK_TRANSACTION_LIST: pushBuilder(new TxDataBuilder()); break;
			case STATEMENT_TRANSACTION: pushBuilder(new TransactionBuilder()); break;
			default: pushBuilder(noopBuilder);
		}
		
	}

	@Override
	public void endAggregate(String aggregateName) throws OFXSyntaxException {
//		logger.info("endAggregate: " + aggregateName);
		switch(aggregateName) {
			case BANK_ACCOUNT_FROM: txData.setAccount((Account) popBuilder().build()); break;
			case STATEMENT_TRANSACTION: txData.addTransaction((Transaction) popBuilder().build()); break;
			default: popBuilder();
		}
	}

}
