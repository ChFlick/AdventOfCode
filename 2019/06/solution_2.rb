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

  def connected_planets()
    @parent.nil? ? @childs : @childs + [@parent]
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

traversed = []
you = planets.find { |planet| planet.value == 'YOU' }
current = [you]
steps = 0

until current.any? { |planet| planet.value == 'SAN' }
  next_list = []
  traversed = traversed.union(current)
  current.each do |planet|
    next_list = next_list.union(planet.connected_planets.filter { |n| !traversed.include?(n) })
  end
  current = next_list
  steps += 1
end

print(steps - 2)
