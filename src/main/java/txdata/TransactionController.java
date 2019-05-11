package txdata;

import java.util.List;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import txdata.services.StorageService;

@RestController
public class TransactionController {

    @GetMapping(value = "/api/transactions")
    public List<Transaction> getTransactions() {
    	return new StorageService().getTransactions();
    }
    
    @GetMapping(value = "/api/transactions/{id}")
    public Transaction getTransaction(@PathVariable("id") @NotNull @DecimalMin("0") int id) {
          return new StorageService().getTransaction(id);
    } 
}