package txdata;

import java.util.concurrent.atomic.AtomicInteger;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import txdata.services.StorageService;

@RestController
public class TxDataController {

    private final AtomicInteger counter = new AtomicInteger();

    @GetMapping(value = "/api/tx-data")
    public TxData greeting(@RequestParam(value="name", defaultValue="World") String name) {
    	TxData txData = new TxData();
    	txData.setId(counter.incrementAndGet());
    	// String.format(template, name)
        return txData;
    }
    
    @GetMapping(value = "/api/tx-data/{id}")
    public TxData getTxData(@PathVariable("id") @NotNull @DecimalMin("0") int id) {
          return new StorageService().getTxData(id);
    }
}
