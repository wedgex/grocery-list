<template>
  <div>
    <h1>Grocery List</h1>
    <div v-for="recipe in recipes" :key="recipe.url">
      {{recipe.name}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recipes: []
    }
  },
  mounted() {
    this.recipies = JSON.parse(window.localStorage.getItem(RECIPES_KEY)) || []
  }
}
</script>

