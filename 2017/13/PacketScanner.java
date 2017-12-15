package osplus.wpb.services.wps;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;

public class PacketScanner {
    private List<Layer> layers = new ArrayList<Layer>();

    public PacketScanner(Map<Integer, Integer> layerValues){
        int numLayers = Collections.max(layerValues.keySet()) + 1;
        for(int i = 0; i < numLayers; i++){
            layers.add(new Layer(i, MapUtils.getIntValue(layerValues, i)));
        }
    }

    public int getFewestPicosecondsToPass(){
        int picoseconds = 0;
        while(true){
            boolean caught = false;
            for(Layer layer : layers){
                if(layer.caughtAtTime(picoseconds + layers.indexOf(layer))){
                    caught = true;
                    break;
                }
            }

            if(!caught){
                return picoseconds;
            }
            picoseconds++;
        }
    }

    public int getScanningSeverity(){
        int severity = 0;
        for(Layer layer : layers){
            if(layer.caughtAtTime(layers.indexOf(layer))){
                severity += layer.getSeverity();
            }
        }

        return severity;
    }

    public class Layer {
        private int depth;
        private int range;

        public Layer(int depth, int range){
            this.depth = depth;
            this.range = range;
        }

        public int posAtTime(int time){
            if(range == 0){
                return -1;
            }

            int pos = time % ((range * 2) - 2);

            if(pos > range){
                return pos - range;
            } else {
                return pos;
            }
        }

        public boolean caughtAtTime(int time){
            return posAtTime(time) == 0;
        }

        public int getSeverity(){
            return depth * range;
        }
    }

    public static void main(String args[]){
        String[] recordedLayers = "0: 3,1: 2,4: 4,6: 4".split(",");
        Map<Integer, Integer> layerValues = prepareInput(recordedLayers);

        PacketScanner ps = new PacketScanner(layerValues);

        System.out.println(ps.getScanningSeverity());
        System.out.println(ps.getFewestPicosecondsToPass());


        recordedLayers = "0: 3,1: 2,2: 4,4: 4,6: 5,8: 6,10: 8,12: 8,14: 6,16: 6,18: 8,20: 8,22: 6,24: 12,26: 9,28: 12,30: 8,32: 14,34: 12,36: 8,38: 14,40: 12,42: 12,44: 12,46: 14,48: 12,50: 14,52: 12,54: 10,56: 14,58: 12,60: 14,62: 14,66: 10,68: 14,74: 14,76: 12,78: 14,80: 20,86: 18,92: 14,94: 20,96: 18,98: 17".split(",");
        layerValues = prepareInput(recordedLayers);

        ps = new PacketScanner(layerValues);

        System.out.println(ps.getScanningSeverity());
        System.out.println(ps.getFewestPicosecondsToPass());
    }

    private static Map<Integer, Integer> prepareInput(String[] recordedLayers) {
        Map<Integer, Integer> layerValues = new HashMap<Integer, Integer>();

        for (String recordedLayer : recordedLayers) {
            String[] recordedLayerValues = recordedLayer.split(": ");
            layerValues.put(Integer.parseInt(recordedLayerValues[0]), Integer.parseInt(recordedLayerValues[1]));
        }
        return layerValues;
    }
}
