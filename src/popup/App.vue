<template>
  <div class="popup">
    <div class="servings">
      <label for="servings" class="servings-label">Servings</label>
      <input type="number" name="servings" class="validate servings-input" v-model="servings" />
    </div>
    <ul v-if="recipes.length" class="collection recipies">
      <li v-for="(recipe, index) in recipes" :key="recipe.url" class="collection-item recipe">
        <a :href="recipe.url" class="recipe-name" target="_blank">
          {{recipe.name}}
        </a>
        <button @click="deleteIndex(index)" class="btn btn-small waves-effect waves-light red recipe-delete">
          <i class="material-icons">delete</i>
        </button>
      </li>
    </ul>
    <div v-else class="empty-list">
      <div>There are currently no recipes added. Click the + below to add a recipe from the current page.</div>
      <i class="material-icons">fastfood</i>
    </div>
    <div v-if="error" class="red-text error">{{error.message}}</div>
    <button @click="handleAdd" class="btn-floating btn-small waves-effect waves-light">
      <i class="material-icons">add</i>
    </button>
    <button @click="handleGroceryList" class="btn right btn-small waves-effect waves-light build-grocery-list" :disabled="!recipes.length">
      Grocery List
    </button>
  </div>
</template>

<script>
/* global chrome */
import 'materialize-css/dist/css/materialize.min.css'
import * as ActiveTab from '@/active-tab'
import * as store from '@/store'

export default {
  name: 'app',
  data () {
    return {
      servings: 2,
      recipes: [],
      error: null,
    }
  },
  methods: {
    handleAdd() {
      ActiveTab.sendMessage({ type: "get_recipe" }).then(response => {
        if (response.error) {
          this.error = response.error
        } else {
          this.recipes.push(response.recipe)
        }
      });
    },
    handleGroceryList() {
      chrome.tabs.create({ url: chrome.runtime.getURL("grocery-list.html") })
    },
    deleteIndex(index) {
      this.$delete(this.recipes, index)
    }
  },
  mounted() {
    store.getRecipes().then(recipes => (this.recipes = recipes))
    store.getServings().then(servings => (this.servings = servings))
  },
  watch: {
    recipes(recipes) {
      store.setRecipes(recipes)
    },
    servings(servings) {
      store.setServings(servings)
    }
  }
}
</script>

<style>
.popup {
  min-width: 500px;
  padding: 15px;
}

.recipe {
  display: flex;
  justify-content: space-between;
}

.empty-list {
  text-align: center;
  margin: 10px;
}
</style>
