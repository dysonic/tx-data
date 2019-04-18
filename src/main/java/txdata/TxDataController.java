package txdata;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TxDataController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/api/tx-data")
    public TxData greeting(@RequestParam(value="name", defaultValue="World") String name) {
    	TxData txData = new TxData();
    	txData.setId(counter.incrementAndGet());
    	// String.format(template, name)
        return txData;
    }
}
