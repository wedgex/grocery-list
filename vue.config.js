module.exports = {
  pages: {
    popup: {
      entry: "src/popup/index.js",
      template: "public/index.html",
      filename: "popup.html",
      title: "Grocery List"
    },
    groceryList: {
      entry: "src/grocery-list/index.js",
      template: "public/index.html",
      filename: "grocery-list.html",
      title: "Grocery List"
    }
  },
  configureWebpack: {
    output: {
      filename: "js/[name].js"
    }
  },
  chainWebpack: config => {
    config.entryPoints.delete("app");
    config.optimization.delete("splitChunks");
    config.output.filename("[name]");
    config
      .entry("popup")
      .add("./src/popup/index.js")
      .end();
    config
      .entry("grocery-list")
      .add("./src/grocery-list/index.js")
      .end();
    config
      .entry("ww-content")
      .add("./src/content-scripts/ww.js")
      .end();
  }
};
