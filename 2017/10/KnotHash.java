package osplus.wps.neo.service.wps;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.codec.binary.Hex;


public class KnotHash {
    private CircularList<Integer> numbers;
    private int skipSize = 0;
    private int currentPosition = 0;
    private int iterations = 64;

    public KnotHash(){
    }

    public KnotHash(int iterations){
        this.iterations = iterations;
    }

    private void init() {
        numbers = new CircularList<Integer>(256);
        for(int i = 0; i < 256; i++){
            numbers.add(i);
        }
        skipSize = 0;
        currentPosition = 0;
    }

    public String mulitTie(List<Byte> bytes) {
        init();

        List<Byte> workBytes = new ArrayList<Byte>(bytes);
        byte[] denseHash = new byte[16];

        workBytes.add((byte)17);
        workBytes.add((byte)31);
        workBytes.add((byte)73);
        workBytes.add((byte)47);
        workBytes.add((byte)23);

        for(int i = 1; i < iterations + 1; i++){
            tie(workBytes, i);
        }

        for(int i = 0; i < 16; i++){
            int startOfBlock = i * 16;
            int denseVal = numbers.get(startOfBlock);
            for(int offset = 1; offset < 16; offset++){
                denseVal ^= numbers.get(startOfBlock + offset);
            }

            denseHash[i] = (byte)denseVal;
        }

        return Hex.encodeHexString(denseHash);
    }

    private void tie(List<Byte> lengths, int iteration){
        for(; skipSize < lengths.size() * iteration; skipSize++){
            int length = lengths.get(skipSize % lengths.size());
            if(length == 0 || length > numbers.size()){
                currentPosition += skipSize;
                continue;
            }

            numbers.reverseVals(currentPosition, currentPosition + length);
            currentPosition += length + skipSize;
        }
    }

//    V1
//    public void tie(List<Integer> lengths){
//        int currentPosition = 0;
//        for(int skipSize = 0; skipSize < lengths.size(); skipSize++){
//            int length = lengths.get(skipSize);
//            if(length == 0 || length > numbers.size()){
//                currentPosition += skipSize;
//                continue;
//            }
//
//            int endPosition = currentPosition + length;
//            numbers.reverseVals(currentPosition, endPosition);
//
//            currentPosition += length + skipSize;
//        }
//    }

    private class CircularList<E> extends ArrayList<E>{
        public CircularList(int size) {
            super(size);
        }

        @Override
        public E get(int index){
            return super.get(index % size());
        }

        @Override
        public E set(int index, E element) {
            return super.set(index % size(), element);
        }

        public void reverseVals(int fromIndex, int toIndex) {
            int from = fromIndex % size();
            int to = toIndex % size();

            if(from >= to){
                // Reverse manually
                List<E> subList = new ArrayList<E>(super.subList(from, size()));
                subList.addAll(new ArrayList<E>(super.subList(0, to)));

                Collections.reverse(subList);

                for(int i = 0; i < subList.size(); i++){
                    this.set(fromIndex + i,  subList.get(i));
                }
            } else {
                Collections.reverse(super.subList(from, to));
            }
        }
    }
}
