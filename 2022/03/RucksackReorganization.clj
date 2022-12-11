(require '[clojure.string :as str])
(require '[clojure.set :as setFn])

(defn char-code [character]
  (let [charCode (int character)]
    (if (> charCode 96)
      (- charCode 96)
      (- charCode 38))))
(def input (slurp "2022/03/input.txt"))
(def rucksacks (str/split-lines input))

(def duplicate-chars (map
  (fn [[one two]]
      (first (setFn/intersection (set one) (set two))))
  (map
    #(split-at (/ (count %) 2) %) rucksacks)))
(def result (reduce + (map char-code duplicate-chars)))

(println result)
