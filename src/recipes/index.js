export function normalizeServings(recipe, servings) {
  const ratio = servings / recipe.servings;
  return {
    ...recipe,
    servings,
    ingredients: recipe.ingredients.map(ingredient => ({
      ...ingredient,
      amount: ratio * ingredient.amount
    }))
  };
}
