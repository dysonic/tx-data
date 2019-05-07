package txdata;

import static org.junit.Assert.*;

import org.junit.Test;

public class AccountTest {
	
	Account accountOne = new Account("11-1111-1111111-111");
	Account accountTwo = new Account("22-2222-2222222-222");	
	Account accountThree = new Account("11-1111-1111111-111");
	
	@Test
	public void testParse() {
		Account account = new Account("BB-bbbb-AAAAAAA-SSS");

		assertEquals("BB", account.getBank());
		assertEquals("bbbb", account.getBranch());
		assertEquals("AAAAAAA", account.getAccountNumber());
		assertEquals("SSS", account.getSuffix());
	}
	
	@Test
	public void testHashCode() {
		int hashCodeOne = accountOne.hashCode();
		int hashCodeTwo = accountTwo.hashCode();		
		int hashCodeThree = accountThree.hashCode();
		
		assertEquals(hashCodeOne, hashCodeThree);
		assertNotEquals(hashCodeTwo, hashCodeOne);
		assertNotEquals(hashCodeTwo, hashCodeThree);
	}

	@Test
	public void testEquals() {
		assertTrue(accountOne.equals(accountThree));
		assertFalse(accountTwo.equals(accountOne));
		assertFalse(accountTwo.equals(accountThree));
	}
}
