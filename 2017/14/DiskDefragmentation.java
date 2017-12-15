import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

public class DiskDefragmentation {
	public static void main(String args[]){
		String inputString = "jxqlasbh";
		List<String> inputs = new ArrayList<String>();
		List<String> output = new ArrayList<String>();
		
		for(int i = 0; i < 128; i++){
			inputs.add(inputString + "-" + i);
		}
		
		KnotHash kh = new KnotHash();
		
		int numOnes = 0;
		for(String input : inputs){
			numOnes += StringUtils.countMatches(new BigInteger(kh.hash(input), 16).toString(2), "1");
		}
		
		System.out.println(numOnes);
		
	}
}
