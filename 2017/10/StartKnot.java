package osplus.wps.neo.service.wps;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;


public class StartKnot {
    // V1
//    public static void main(String[] args) {
//        List<String> lengthsStr = Arrays.asList("14,58,0,116,179,16,1,104,2,254,167,86,255,55,122,244".split(","));
//        List<Integer> lengths = new ArrayList<Integer>(lengthsStr.size());
//        for(String length : lengthsStr){
//            lengths.add(Integer.parseInt(length));
//        }
//
//        KnotHash kh = new KnotHash(256);
//        kh.tie(lengths);
//        System.out.println(kh.getResult().get(0) * kh.getResult().get(1));
//    }

    public static void main(String[] args) throws UnsupportedEncodingException {
        String input = "14,58,0,116,179,16,1,104,2,254,167,86,255,55,122,244";
        List<Byte> bytes = new ArrayList<Byte>(Arrays.asList(ArrayUtils.toObject(input.getBytes("US-ASCII"))));


        KnotHash kh = new KnotHash();
        System.out.println(kh.mulitTie(bytes));
    }
}
