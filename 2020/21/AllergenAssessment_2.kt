package `21`

import java.io.File

fun main(args: Array<String>) {
    data class Dish(val ingredients: List<String>, val allergens: List<String>)

    val dishes = File("${System.getProperty("user.dir")}/2020/21/input.txt")
        .readLines()
        .map {
            Dish(
                it.substringBefore(" (").split(" "),
                it.substringAfter("(contains ").substringBefore(")").split(", ")
            )
        }

    val allergens = dishes.flatMap { it.allergens }.toSet()


    val allergensByIngredient = mutableMapOf<String, String>()

    while (allergensByIngredient.size < allergens.size) {
        val foundAllergens = allergens.mapNotNull { allergen ->
            val potentialIngredients =
                dishes.filter { it.allergens.contains(allergen) }
                    .map { dish ->
                        dish.ingredients.filter {
                            it !in allergensByIngredient.values
                        }.toSet()
                    }
                    .reduce { res, curr -> res.intersect(curr) }

            if (potentialIngredients.size == 1)
                allergen to potentialIngredients.first()
            else
                null
        }
        allergensByIngredient += foundAllergens
    }

    println(allergensByIngredient.toSortedMap().values.joinToString(","))
}
