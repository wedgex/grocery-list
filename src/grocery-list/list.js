import groupBy from "lodash/groupBy";
import flatMap from "lodash/flatMap";

export function build(recipes) {
  return group(flatMap(recipes, recipe => recipe.ingredients));
}

function group(ingredients) {
  return Object.entries(groupBy(ingredients, "name"));
}
