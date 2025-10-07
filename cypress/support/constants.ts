export const SELECTORS = {
  CONSTRUCTOR: '[data-cy="constructor"]',
  CONSTRUCTOR_BUN_TOP: '[data-cy="constructor-bun-top"]',
  CONSTRUCTOR_BUN_BOTTOM: '[data-cy="constructor-bun-bottom"]',
  CONSTRUCTOR_INGREDIENTS: '[data-cy="constructor-ingredients"]',
  CONSTRUCTOR_PRICE: '[data-cy="constructor-price"]',

  INGREDIENT_CARD: (id: string) => `[data-cy="${id}"]`,

  MODAL: '[data-cy="modal"]',
  MODAL_OVERLAY: '[data-cy="modal-overlay"]',
  MODAL_CLOSE: '[data-cy="modal-close"]',
  INGREDIENT_DETAILS: '[data-cy="ingredient-details"]',
  INGREDIENT_CALORIES: '[data-cy="ingredient-calories"]',
  INGREDIENT_PROTEINS: '[data-cy="ingredient-proteins"]',
  INGREDIENT_FAT: '[data-cy="ingredient-fat"]',
  INGREDIENT_CARBOHYDRATES: '[data-cy="ingredient-carbohydrates"]',

  ORDER_BUTTON: '[data-cy="order-button"]',
  ORDER_DETAILS: '[data-cy="order-details"]',
  ORDER_NUMBER: '[data-cy="order-number"]',
};
