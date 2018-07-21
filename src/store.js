/* global chrome */
const RECIPES_KEY = "recipes";
const SERVINGS_KEY = "servings";

export function setRecipes(recipes) {
  chrome.storage.sync.set({ [RECIPES_KEY]: recipes });
}

export function getRecipes() {
  console.log("getem");
  return new Promise(resolve =>
    chrome.storage.sync.get([RECIPES_KEY], data => resolve(data.recipes || []))
  );
}

export function setServings(servings) {
  chrome.storage.sync.set({ [SERVINGS_KEY]: servings });
}

export function getServings() {
  return new Promise(resolve =>
    chrome.storage.sync.get([SERVINGS_KEY], data => resolve(data.servings || 1))
  );
}
