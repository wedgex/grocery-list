<template>
  <div id="app">
    <div>
      <div v-for="recipe in recipies" :key="recipe.url" class="recipe">
        <div class="recipe-name">{{recipe.name}}</div>
        <a :href="recipe.url" class="recipe-url">{{recipe.url}}</a>
      </div>
    </div>
    <button @click="handleAdd">Add Current Page</button>
    <div v-if="error" class="error">{{error.message}}</div>
    <div v-if="ingredients">{{ingredients}}</div>
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
    }
  },
  mounted() {
    this.recipies = JSON.parse(window.localStorage.getItem(RECIPES_KEY)) || []
  },
  watch: {
    recipies(recipes) {
      window.localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes))
    }
  }
}
</script>

<style>
.recipe {}

.recipe-url {}

.error {}
</style>
