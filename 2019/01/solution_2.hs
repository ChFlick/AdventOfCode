import System.Environment
import Control.Monad

import System.IO

process :: Int -> Int
process x = do
      let result = quot x 3 - 2
      if result < 0 then 0
      else result + process result

processList :: [Int] -> [Int]
processList list = map process list

main = do
      file <- openFile "input.txt" ReadMode
      contents <- hGetContents file
      let stringLines = lines contents
      let intLines = map read stringLines :: [Int]
      let processedVals = processList intLines

      print(sum processedVals)
