<template>
  <div id="app">
    <label for="servings">Servings</label>
    <input name="servings" v-model="servings" />
    <div>
      <div v-for="(recipe, index) in recipies" :key="recipe.url" class="recipe">
        <button @click="deleteIndex(index)">Delete</button>
        <div class="recipe-name">{{recipe.name}}</div>
        <a :href="recipe.url" class="recipe-url">{{recipe.url}}</a>
      </div>
    </div>
    <button @click="handleAdd">Add Current Page</button>
    <div v-if="error" class="error">{{error.message}}</div>
    <div v-if="ingredients">{{ingredients}}</div>
    <button @click="handleGroceryList">Grocery List</button>
  </div>
</template>

<script>
/* global chrome */

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
      recipies: [],
      error: null,
      ingredients: null
    }
  },
  methods: {
    handleAdd() {
      sendMessage({ type: "get_recipe" }).then(response => {
        if (response.error) {
          this.error = response.error
        } else {
          this.recipies.push(response.recipe)
          this.ingredients = response.recipe.ingredients
        }
      });
    },
    handleGroceryList() {
      chrome.tabs.create({ url: chrome.runtime.getURL("grocery-list.html") })
    },
    deleteIndex(index) {
      this.$delete(this.recipies, index)
    }
  },
  mounted() {
    chrome.storage.sync.get([RECIPES_KEY], data => {
      this.recipies = data.recipes || []
    })
  },
  watch: {
    recipies(recipes) {
      chrome.storage.sync.set({ [RECIPES_KEY]: recipes });
    }
  }
}
</script>

<style>
.recipe {}

.recipe-url {}

.error {}
</style>
