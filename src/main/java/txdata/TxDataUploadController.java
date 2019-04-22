package txdata;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

import com.webcohesion.ofx4j.io.OFXParseException;
import com.webcohesion.ofx4j.io.OFXReader;
import com.webcohesion.ofx4j.io.nanoxml.NanoXMLOFXReader;

@Controller
public class TxDataUploadController {

	Logger logger = LoggerFactory.getLogger(LoggingController.class);

	@ExceptionHandler(HttpMediaTypeNotAcceptableException.class)
	public String handleHttpMediaTypeNotAcceptableException(HttpServletRequest req, Exception ex) {
		logger.error("handleHttpMediaTypeNotAcceptableException");
		return "acceptable MIME type:" + MediaType.APPLICATION_JSON_VALUE;
	}

	@PostMapping(value = "/api/tx-data/upload", produces = "application/json")
	@ResponseBody
	public TxData handleFileUpload(@RequestParam("file") final MultipartFile file) throws Exception {
		String filename = file.getOriginalFilename();
		long size = file.getSize();
		logger.info("uploadFile: " + filename + " (" + size + " bytes)");
		throwExceptionIfEmpty(file);
//		throwExceptionIfNotOfx(file);
		TxData txData = parseOfx(file);
		return txData;
	}
	
	private void throwExceptionIfEmpty(final MultipartFile file) throws Exception {
		if (file.isEmpty()) {
			throw new Exception("file is empty");
		}
	}
	
	private void throwExceptionIfNotOfx(final MultipartFile file) throws Exception {
		if (!file.getOriginalFilename().toLowerCase().matches("[.]ofx$")) {
			throw new Exception("file is not of type ofx");
		}
	}
	
	private TxData parseOfx(final MultipartFile file) throws IOException, OFXParseException {
		OFXReader ofxReader = new NanoXMLOFXReader();
		final TxData txData = new TxData();
		txData.setFilename(file.getOriginalFilename());
		txData.setSize(file.getSize());
		TxDataOFXHandler txDataOFXHandler = new TxDataOFXHandler(txData);
		txData.setId(1);
		ofxReader.setContentHandler(txDataOFXHandler);
		ofxReader.parse(file.getInputStream());
		logger.info("# of txs: " + txData.getTransactions().size());
		return txData;
	}
	
	
}
