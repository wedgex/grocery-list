<template>
  <div>
    <h1>Grocery List</h1>
    <div v-for="recipe in recipes" :key="recipe.url">
      {{recipe.name}}
    </div>
  </div>
</template>

<script>
const RECIPES_KEY = 'recipes'

export default {
  data () {
    return {
      recipes: []
    }
  },
  mounted() {
    chrome.storage.sync.get([RECIPES_KEY], data => {
      console.log(data)
      this.recipes = data.recipes || []
    })
  }
}
</script>

