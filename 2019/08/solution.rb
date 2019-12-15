#!/usr/bin/ruby
# frozen_string_literal: true

input = IO.binread('input.txt')
image_width = 25 * 6
layers = input.scan(/.{#{image_width}}/)

min_layer = layers.min_by { |x| x.count('0') }

print(min_layer.count('1') * min_layer.count('2'))
