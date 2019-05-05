package txdata;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import txdata.services.StorageService;

public class AccountController {

	@RestController
	public class TxDataController {

	    @RequestMapping("/api/accounts")
	    public List<Account> getAccounts() {
	    	return new StorageService().getAccounts();
	    }
	}
}
