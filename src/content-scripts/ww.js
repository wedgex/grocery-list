/* global chrome */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "get_recipe") {
    const recipeEl = getRecipe();
    console.log("hi");
    if (recipeEl) {
      console.log("bye");
      const recipePage = new RecipePage(document);
      sendResponse({
        recipe: recipePage.parse()
      });
    } else {
      sendResponse({
        error: { message: "Could not find a recipe in the page." }
      });
    }
  }
});

function getRecipe() {
  return document.querySelector(".recipe-section");
}

class RecipePage {
  constructor(el) {
    this.el = el;
  }

  name() {
    return this.el.querySelector(".item-title").textContent;
  }

  url() {
    return window.location.href;
  }

  servings() {
    return this.el.querySelector('[translate="NUI.ITEM_DETAIL.SERVES"]').nextSibling.textContent;
  }

  ingredients() {
    return [...this.el.querySelectorAll(".recipe-ingredients ul li")]
      .map(el => new IngredientParser(el))
      .map(ingredient => ingredient.parse());
  }

  parse() {
    return {
      name: this.name(),
      url: this.url(),
      servings: this.servings(),
      ingredients: this.ingredients()
    };
  }
}

class IngredientParser {
  constructor(el) {
    this.el = el;
  }

  amount() {
    return this.el.querySelector(".si-portion-amount").textContent;
  }

  portionSize() {
    return this.el.querySelector(".si-portion-name").textContent;
  }

  name() {
    return this.el.querySelector(".si-ingredient-name").textContent;
  }

  parse() {
    return {
      amount: this.amount(),
      portionSize: this.portionSize(),
      name: this.name()
    };
  }
}
