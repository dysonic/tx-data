package txdata;

import java.util.List;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import txdata.services.StorageService;

@RestController
public class AccountController {

    @GetMapping(value = "/api/accounts")
    public List<Account> getAccounts() {
    	return new StorageService().getAccounts();
    }
    
    @GetMapping(value = "/api/accounts/{id}")
    public Account getAccount(@PathVariable("id") @NotNull @DecimalMin("0") int id) {
          return new StorageService().getAccount(id);
    } 
}
