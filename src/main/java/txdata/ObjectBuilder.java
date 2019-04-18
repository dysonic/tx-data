package txdata;

public interface ObjectBuilder {
	
	public void add(String tagName, String value);
	public Object build();

}
