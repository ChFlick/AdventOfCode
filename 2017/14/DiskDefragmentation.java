package main;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;

public class DiskDefragmentation {
    private static final int SIZE = 128;

    public static void main(String args[]) {
        String inputString = "jxqlasbh";

        DiskDefragmentation discDefragmentation = new DiskDefragmentation(inputString);

        System.out.println(discDefragmentation.countFilledDiscSpaces());
        System.out.println(discDefragmentation.countFragments());
        discDefragmentation.print();
    }

    private Disc disc = new Disc();

    public DiskDefragmentation(String code) {
        List<String> discRows = new ArrayList<String>();

        for (int i = 0; i < SIZE; i++) {
            discRows.add(code + "-" + i);
        }

        KnotHash kh = new KnotHash();

        for (int rowNum = 0; rowNum < discRows.size(); rowNum++) {
            String binaryHashedRow = hashAndBinarifyAndPrepareRow(kh, discRows.get(rowNum));

            for (int colNum = 0; colNum < binaryHashedRow.length(); colNum++) {
                disc.put(new Position(colNum, rowNum), new DiscSpace(binaryHashedRow.toCharArray()[colNum]));
            }
        }
    }

    private String hashAndBinarifyAndPrepareRow(KnotHash kh, String row) {
        String result = kh.hash(row);
        result = new BigInteger(result, 16).toString(2);
        result = result.replace('1', '#');
        result = StringUtils.leftPad(result, SIZE, '0');
        return result;

    }

    public int countFilledDiscSpaces() {
        return disc.values().stream().mapToInt(e -> e.isFree() ? 0 : 1).sum();
    }

    public int countFragments() {
        int numFragments = 0;
        for (Position pos : disc.keySet()) {
            if (createGroup(pos, numFragments + 1)) {
                numFragments++;
            }
        }

        return numFragments;
    }

    private boolean createGroup(Position position, int number) {
        DiscSpace discSpace = MapUtils.getObject(disc, position, new DiscSpace("0"));

        if (!discSpace.isFree() && !discSpace.hasGroup()) {
            discSpace.space = String.valueOf(number);

            createGroup(new Position(position.posX + 1, position.posY), number);
            createGroup(new Position(position.posX - 1, position.posY), number);
            createGroup(new Position(position.posX, position.posY + 1), number);
            createGroup(new Position(position.posX, position.posY - 1), number);

            return true;
        }

        return false;
    }

    public void print() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                System.out.print(disc.get(new Position(j, i)) + " ");
            }
            System.out.println();
        }
    }

    private class Disc extends HashMap<Position, DiscSpace> {
    }

    private class DiscSpace {
        String space = "0";

        public DiscSpace(char space) {
            this.space = String.valueOf(space);
        }

        public DiscSpace(String space) {
            this.space = space;
        }

        public boolean isFree() {
            return space.equals("0") ? true : false;
        }

        public boolean hasGroup() {
            return space.equals("#") ? false : true;
        }

        @Override
        public String toString() {
            if (space.length() == 1) {
                return "   " + space;
            } else if (space.length() == 2) {
                return "  " + space;
            } else if (space.length() == 3) {
                return " " + space;
            }
            return space;
        }
    }

    private class Position {
        int posX = 0;
        int posY = 0;

        public Position(int x, int y) {
            posX = x;
            posY = y;
        }

        @Override
        public int hashCode() {
            final int prime = 31;
            int result = 1;
            result = prime * result + getOuterType().hashCode();
            result = prime * result + posX;
            result = prime * result + posY;
            return result;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null)
                return false;
            if (getClass() != obj.getClass())
                return false;
            Position other = (Position) obj;
            if (!getOuterType().equals(other.getOuterType()))
                return false;
            if (posX != other.posX)
                return false;
            if (posY != other.posY)
                return false;
            return true;
        }

        private DiskDefragmentation getOuterType() {
            return DiskDefragmentation.this;
        }
    }
}