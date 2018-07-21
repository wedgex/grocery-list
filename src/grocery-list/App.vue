<template>
  <div>
    <h1>Grocery List</h1>
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

const RECIPES_KEY = 'recipes'

export default {
  data () {
    return {
      recipes: []
    }
  },
  computed: {
    list() {
      return GroceryList.build(this.recipes)
    }
  },
  mounted() {
    chrome.storage.sync.get([RECIPES_KEY], data => {
      this.recipes = data.recipes || []
    })
  }
}
</script>

<style scoped>
.portion::after {
  content: "+";
  margin-right: "2px";
}

.portion:last-child::after {
  content: "";
}
</style>


