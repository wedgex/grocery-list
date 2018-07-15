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
  </div>
</template>

<script>
/* global chrome */
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
      recipies: [
        {
          name: 'Slow Cooker Shredded Chicken Nachos',
          url: 'https://cmx.weightwatchers.com/nui/explore/details2/WWRECIPE:5a65fc5176e638041f4f417b'
        },
        {
          name: 'Rustic Italian Flatbread Pizza',
          url: 'https://cmx.weightwatchers.com/nui/explore/details2/WWRECIPE:593f0d182787d61970aea102'
        }
      ],
      error: null
    }
  },
  methods: {
    handleAdd() {
      sendMessage({ type: "get_recipe" }).then(response => {
        this.error = response.error
      });
    }
  }
}
</script>

<style>
.recipe {}

.recipe-url {}

.error {}
</style>
