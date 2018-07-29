export function normalizeServings(recipe) {
  const ratio = recipe.servings / recipe.originalServings;
  return {
    ...recipe,
    ingredients: recipe.ingredients.map(ingredient => ({
      ...ingredient,
      amount: ratio * ingredient.amount
    }))
  };
}
