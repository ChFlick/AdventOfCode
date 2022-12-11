(require '[clojure.string :as str])
(require '[clojure.set :as setFn])

(defn char-code [character]
  (let [charCode (int character)]
    (if (> charCode 96)
      (- charCode 96)
      (- charCode 38))))
(def input (slurp "2022/03/input.txt"))
(def rucksacks (str/split-lines input))

(def duplicates-in-halves (map
  (fn [[one two]]
      (first (setFn/intersection (set one) (set two))))
  (map
    #(split-at (/ (count %) 2) %) rucksacks)))
(def result1 (reduce + (map char-code duplicates-in-halves)))

(println result1)

(def duplicates-in-triplets
  (map
    #(first (apply setFn/intersection %))
    (partition 3 (map set rucksacks))))

(def result2
  (reduce + (map char-code duplicates-in-triplets)))

(println result2)
