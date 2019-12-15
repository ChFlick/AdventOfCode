#!/usr/bin/ruby
# frozen_string_literal: true

input = IO.binread('input.txt')
width = 25
height = 6
image_size = height * width
layers = input.scan(/.{#{image_size}}/)

result = '2' * image_size
layers.each do |layer|
  result = result.chars.map.with_index { |x, i| x == '2' ? layer[i] : x }.join('')
end

result.gsub!('0', '.')
result.gsub!('1', '#')
rows = result.scan(/.{#{width}}/)
rows.each do |r|
  print r
  print "\n"
end
