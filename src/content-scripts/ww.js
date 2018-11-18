import RecipePage from "./RecipePage";

/* global chrome */
console.log("adding listener");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("recieved request", request);
  if (request.type === "get_recipe") {
    const recipeEl = getRecipe();
    if (recipeEl) {
      console.log("recipe found. parsing.");
      const recipePage = new RecipePage(document);
      console.log("recipe parsed.", recipePage.parse());
      sendResponse({
        recipe: recipePage.parse()
      });
    } else {
      console.log("no recipe found.");
      sendResponse({
        error: { message: "Could not find a recipe in the page." }
      });
    }
  }
  return true;
});

function getRecipe() {
  return document.querySelector(".recipe-section");
}
