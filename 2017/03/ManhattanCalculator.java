import java.util.HashMap;
import java.util.Map;

import com.ibm.commons.collections.MapUtils;

public class ManhattanCalculator {

	private int rightUp;
	private int leftDown;

	private int tempRight;
	private int tempUp;
	private int tempLeft;
	private int tempDown;

	public int getManhattanDistance(int input) {
		Position pos = this.getManhattanPosition(input);
		return Math.abs(pos.x) + Math.abs(pos.y);
	}

	public Position getManhattanPosition(int input) {
		Position pos = new Position(0, 0);
		initStartVariables();

		for (int i = 0; i < input - 1; i++) {
			if (tempRight != 0) {
				stepRight(pos);
			} else if (tempUp != 0) {
				stepUp(pos);
			} else if (tempLeft != 0) {
				stepLeft(pos);
			} else if (tempDown != 0) {
				stepDown(pos);
			} else {
				nextSpiral();

				stepRight(pos);
			}
		}

		return pos;
	}

	private void initStartVariables() {
		rightUp = 1;
		leftDown = 2;
		setTempVariables();
	}

	private void nextSpiral() {
		rightUp += 2;
		leftDown += 2;
		setTempVariables();
	}

	private void stepDown(Position pos) {
		tempDown--;
		pos.y--;
	}

	private void stepLeft(Position pos) {
		tempLeft--;
		pos.x--;
	}

	private void stepUp(Position pos) {
		tempUp--;
		pos.y++;
	}

	private void stepRight(Position pos) {
		tempRight--;
		pos.x++;
	}

	private void setTempVariables() {
		tempRight = rightUp;
		tempUp = rightUp;
		tempLeft = leftDown;
		tempDown = leftDown;
	}

	public int getSquareValueGreaterThan(int input) {
		Map<Position, Integer> values = new HashMap<Position, Integer>();
		values.put(new Position(0, 0), 1);

		int val = 0;
		int currentElement = 1;
		while (val < input - 1) {
			Position pos = this.getManhattanPosition(currentElement + 1);

			val = getValueForPosition(values, pos);
			values.put(pos, val);

			currentElement++;
		}

		return val;
	}

	private int getValueForPosition(Map<Position, Integer> values, Position pos) {
		int val = 0;

		for (int x = pos.x - 1; x < pos.x + 2; x++) {
			for (int y = pos.y - 1; y < pos.y + 2; y++) {
				val += MapUtils.getIntValue(values, new Position(x, y), 0);
			}
		}

		return val;
	}

	public static void main(String[] args) {
		ManhattanCalculator manhattanCalculator = new ManhattanCalculator();

		// #1
		System.out.println(manhattanCalculator.getManhattanDistance(23));
		System.out.println(manhattanCalculator.getManhattanDistance(1024));
		System.out.println(manhattanCalculator.getManhattanDistance(325489));

		// #2
		System.out.println(manhattanCalculator.getSquareValueGreaterThan(325489));
	}

	private static class Position {

		public Position(int x, int y) {
			this.x = x;
			this.y = y;
		}

		int x, y;

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + x;
			result = prime * result + y;
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj) {
				return true;
			}
			if (obj == null) {
				return false;
			}
			if (getClass() != obj.getClass()) {
				return false;
			}
			Position other = (Position) obj;
			if (x != other.x) {
				return false;
			}
			if (y != other.y) {
				return false;
			}
			return true;
		}

	}
}
