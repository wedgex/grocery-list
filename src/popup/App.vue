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
import * as Recipes from '@/recipes'
const RECIPES_KEY = 'recipes'

function sendMessage(message) {
  return new Promise(function(resolve) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, message, response => {
        resolve(response);
      });
    });
  });
}

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
      sendMessage({ type: "get_recipe" }).then(response => {
        if (response.error) {
          this.error = response.error
        } else {
          const recipe = Recipes.normalizeServings(response.recipe, this.servings)
          this.recipes.push(recipe)
          this.ingredients = recipe.ingredients
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
    chrome.storage.sync.get([RECIPES_KEY], data => {
      this.recipes = data.recipes || []
    })
  },
  watch: {
    recipes(recipes) {
      chrome.storage.sync.set({ [RECIPES_KEY]: recipes });
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
