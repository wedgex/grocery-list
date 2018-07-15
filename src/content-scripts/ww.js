/* global chrome */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "get_recipe") {
    const recipeEl = getRecipe();
    if (recipeEl) {
      const recipePage = new RecipePage(document);
      console.log(recipePage.parse());
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

function parseFraction(fraction) {
  const parts = fraction.split("⁄");
  return parts.length > 1 ? parseFloat(parts[0]) / parseFloat(parts[1]) : parseFloat(fraction);
}

function parseNumber(string) {
  return string.split(" ").reduce((total, value) => total + parseFraction(value), 0);
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
      servings: parseNumber(this.servings()),
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
      amount: parseNumber(this.amount()),
      portionSize: this.portionSize(),
      name: this.name()
    };
  }
}
