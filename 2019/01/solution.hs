import System.Environment
import Control.Monad

import System.IO

process :: Int -> Int
process x = quot x 3 - 2

main = do
      file <- openFile "input.txt" ReadMode
      contents <- hGetContents file
      let stringLines = lines contents
      let intLines = map read stringLines :: [Int]
      let processedVals = map process intLines
      print(sum processedVals)
