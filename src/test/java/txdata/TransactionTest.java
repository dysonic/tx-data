package txdata;

import static org.hamcrest.CoreMatchers.containsString;
import static org.junit.Assert.*;

import org.junit.Test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TransactionTest {

	@Test
	public void testGetTxDataId() {
		Transaction tx = new Transaction();

		assertEquals(0, tx.getTxDataId());
	}

	@Test
	public void testGetAccountId() {
		Transaction tx = new Transaction();

		assertEquals(0, tx.getAccountId());
	}

	@Test
	public void testAccountNotSerialized() throws JsonProcessingException {
	    Account account = new Account();
	    Transaction tx = new Transaction();
	    tx.setAccount(account);
	 
	    String result = new ObjectMapper().writeValueAsString(tx);
	 
	    assertThat(result, containsString("accountId"));
	}
	
	@Test
	public void testTxDataNotSerialized() throws JsonProcessingException {
	    TxData txData = new TxData();
	    Transaction tx = new Transaction();
	    tx.setTxData(txData);
	 
	    String result = new ObjectMapper().writeValueAsString(tx);
	 
	    assertThat(result, containsString("txDataId"));
	}
	
}