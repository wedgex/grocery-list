<template>
  <div class="popup">
    <div class="servings">
      <label for="servings" class="servings-label">Servings</label>
      <input type="number" name="servings" class="validate servings-input" v-model="servings" />
    </div>
    <ul class="collection recipies">
      <li v-for="(recipe, index) in recipes" :key="recipe.url" class="collection-item recipe">
        <div>
          <a :href="recipe.url" class="recipe-name" target="_blank">
            {{recipe.name}}
          </a>
          <button @click="deleteIndex(index)" class="secondary-content btn btn-small waves-effect waves-light red recipie-delete">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </li>
    </ul>
    <div v-if="error" class="red-text error">{{error.message}}</div>
    <button @click="handleAdd" class="btn-floating btn-small waves-effect waves-light">
      <i class="material-icons">add</i>
    </button>
    <button @click="handleGroceryList" class="btn right btn-small waves-effect waves-light build-grocery-list">
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
  padding: 5px;
}
</style>
