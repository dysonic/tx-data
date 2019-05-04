package txdata;

import java.util.HashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class AccountHashCodeFactory {

	private static AccountHashCodeFactory factory = null;
	
	private final AtomicInteger counter = new AtomicInteger();
	HashMap<String, Integer> codes = new HashMap<String, Integer>();
	
	public static synchronized AccountHashCodeFactory getInstance() {
	    if (factory == null) { 
	    	factory = new AccountHashCodeFactory();
	    }
	    return factory;
	}
	
	private AccountHashCodeFactory() {
		codes = new HashMap<String, Integer>();
	}
	
	public int getHashCode(Account account) {
		String accountKey = account.toString();
		if (!codes.containsKey(accountKey)) {
			codes.put(accountKey, new Integer(counter.incrementAndGet()));
		}
		return codes.get(accountKey).intValue();
	}
}
