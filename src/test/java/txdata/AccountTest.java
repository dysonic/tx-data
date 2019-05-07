package txdata;

import static org.junit.Assert.*;

import org.junit.Test;

public class AccountTest {
	
	Account accountOne = new Account("11-1111-1111111-111");
	Account accountTwo = new Account("22-2222-2222222-222");	
	Account accountThree = new Account("11-1111-1111111-111");
	Account accountEmpty = new Account();
	
	@Test
	public void testConstructor() {
		assertEquals("00", accountEmpty.getBank());
		assertEquals("0000", accountEmpty.getBranch());
		assertEquals("0000000", accountEmpty.getAccountNumber());
		assertEquals("000", accountEmpty.getSuffix());
		assertEquals("", accountEmpty.getType());
		assertEquals("", accountEmpty.getAlias());
	}
	
	@Test
	public void testConstructorWithAccount() {
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
	
	@Test
	public void testToString() {
		assertEquals("11-1111-1111111-111", accountOne.toString());
		assertEquals("22-2222-2222222-222", accountTwo.toString());
		assertEquals("11-1111-1111111-111", accountThree.toString());;
	}
	
	@Test
	public void testHasEmptyAccountNumber() {
		assertTrue(accountEmpty.hasEmptyAccountNumber());
		assertFalse(accountOne.hasEmptyAccountNumber());
	}
	
}
