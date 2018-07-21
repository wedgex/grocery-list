<template>
  <div>
    <h1>Grocery List</h1>
    <div class="recipes">
      {{servings}} servings.
      <span v-for="recipe in recipes" :key="recipe.url" class="recipe">{{recipe.name}}</span>
    </div>
    <table>
      <tr v-for="[name, ingredients] in list" :key="name">
        <td>
          <input type="checkbox" />
        </td>
        <td>
          <span v-for="ingredient in ingredients" :key="ingredient.amount + ingredient.portionSize" class="portion">
            {{ingredient.amount.toLocaleString()}} {{ingredient.portionSize}}
          </span>
        </td>
        <td>{{name}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as GroceryList from './list'
import * as Recipes from '@/recipes'
import * as store from '@/store'

export default {
  data () {
    return {
      recipes: [],
      servings: 1
    }
  },
  computed: {
    list() {
      return GroceryList.build(this.normalizedRecipes)
    },
    normalizedRecipes() {
      return this.recipes.map(recipe => Recipes.normalizeServings(recipe, this.servings))
    }
  },
  mounted() {
    store.getRecipes().then(recipies => (this.recipes = recipies))
    store.getServings().then(servings => (this.servings = servings))
  }
}
</script>

<style scoped>
.portion::after {
  content: "+ ";
}

.portion:last-child::after {
  content: "";
}

.recipes {
  font-style: italic;
}

.recipe::after {
  content: ", ";
}

.recipe:last-child:after {
  content: "";
}
</style>


