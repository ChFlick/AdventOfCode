import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.ListUtils;


public class RecursiveCircus {
    public static void main(final String[] args){
        final List<String> input = new ArrayList<String>();
        final Scanner sc = new Scanner(System.in);

        while(true) {
            final String nextLine = sc.nextLine();
            if ( nextLine.equals("") ) {
               break;
            }
            input.add(nextLine);
        }

        final RecursiveCircus rc = new RecursiveCircus(input);
    }

    Element root;

    public RecursiveCircus(final List<String> input){
        List<String> subElements = new ArrayList<String>();
        final List<String> allElements = new ArrayList<String>();
        for (final String string : input) {
            allElements.add(string.split(" ")[0].trim());

            if(string.contains(" -> ")){
                final String[] subElementNames = string.split(" -> ")[1].split(", ");
                subElements = ListUtils.union(subElements, Arrays.asList(subElementNames));
            }
        }

        final String rootName = (String) ListUtils.removeAll(allElements, subElements).get(0);

        String rootInfo = "";
        for (final String string : input) {
            if(string.split(" ")[0].contains(rootName)){
                rootInfo = string;
            }
        }
        final Element root = new Element(rootInfo, input);

        System.out.println(root);
        root.printImbalance();
    }


    private class Element{
        String name = "";
        List<Element> subElements = new ArrayList<Element>();
        int weight = 0;
        int fullWeight = 0;

        public Element(final String info, final List<String> allElementInfos){
            name = info.split(" ")[0];
            Matcher matcher = Pattern.compile("[0-9]+").matcher(info);
            if(matcher.find()){
                weight = Integer.valueOf(matcher.group(0));
                fullWeight += weight;
            }

            if(info.contains(" -> ")){
                final String[] subElementNames = info.split(" -> ")[1].split(", ");
                for (final String subElementName : subElementNames) {
                    String subElementInfo = "";
                    for(final String elementInfo : allElementInfos){
                        if(elementInfo.split(" ")[0].contains(subElementName)){
                            subElementInfo = elementInfo;
                            break;
                        }
                    }

                    Element element = new Element(subElementInfo, allElementInfos);
                    subElements.add(element);
                    fullWeight += element.fullWeight;
                }
            }
        }

        public void printImbalance() {
            for (Element element : subElements) {
                element.printImbalance();
            }

            Map<Integer, Element> weights = new HashMap<Integer, Element>();
            for (Element ele : subElements) {
                weights.put(ele.fullWeight, ele);
                System.out.println(ele.fullWeight + " = " + ele.weight + " + " + (ele.fullWeight - ele.weight));
            }

            if(weights.size() > 1){
                System.out.println("ERROR HERE");
                throw new RuntimeException();
            }

            System.out.println("Back Up");
        }
    }
}
