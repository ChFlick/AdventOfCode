#!/usr/bin/ruby
# frozen_string_literal: true

class Node
  attr_reader :value, :childs
  attr_accessor :parent

  def initialize(value)
    @value = value
    @childs = []
    @parent = nil
  end

  def append_child(child)
    @childs.push(child)
  end
end

input = IO.binread('input.txt')
planets = []
input.split.each do |pair|
  pairs = pair.split(')')

  left = planets.find { |planet| planet.value == pairs[0] }
  if left.nil?
    left = Node.new(pairs[0])
    planets.push(left)
  end

  right = planets.find { |planet| planet.value == pairs[1] }
  if right.nil?
    right = Node.new(pairs[1])
    planets.push(right)
  end

  left.append_child(right)
  right.parent = left
end

def count_orbits_of(planet, val = 0)
  planet.parent.nil? ? val : count_orbits_of(planet.parent) + 1
end

result = planets.sum { |p| count_orbits_of(p) }
print(result)
