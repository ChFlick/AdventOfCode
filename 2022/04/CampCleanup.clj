(require '[clojure.string :as str])
(require '[clojure.set :as setFn])

(def input (slurp "2022/04/input.txt"))
(def lines-input (str/split-lines input))
(def pairs (map #(str/split % #",") lines-input))

(defn range-to-set [range]
      (mapv #(. Integer parseInt %) (str/split range #"-")))
(def pairs-ranges (map #(mapv range-to-set %) pairs))

(defn is-overlapping? [first second]
      (let [x1 (get first 0)
            x2 (get first 1)
            y1 (get second 0)
            y2 (get second 1)]
           (or
               (and (<= x1 y1) (>= x2 y2))
               (and (>= x1 y1) (<= x2 y2)))))

(def result (filter #(apply is-overlapping? %) pairs-ranges))

(println (count result))

(defn is-overlapping-2? [first second]
      (let [x1 (get first 0)
            x2 (get first 1)
            y1 (get second 0)
            y2 (get second 1)]
           (or
               (and (>= x1 y1) (<= x1 y2))
               (and (>= y1 x1) (<= y1 x2)))))

(def result-2 (filter #(apply is-overlapping-2? %) pairs-ranges))
(println (count result-2))
