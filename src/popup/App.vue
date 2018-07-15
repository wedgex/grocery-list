<template>
  <div id="app">
    <button @click="handleSend">Send</button>
    <div v-if="error">{{error.message}}</div>
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
      error: null
    }
  },
  methods: {
    handleSend() {
      sendMessage({ type: "get_recipe" }).then(response => {
        this.error = response.error
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
