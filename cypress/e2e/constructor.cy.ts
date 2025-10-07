import { SELECTORS } from '../support/constants'

const BUN_ID = '643d69a5c3f7b9001cfa093c';
const MEAT_ID = '643d69a5c3f7b9001cfa0941';
const SAUCE_ID = '643d69a5c3f7b9001cfa0942';

describe('Конструктор бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { statusCode: 401, body: { success: false, message: 'Unauthorized' } }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
    
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait(2000);
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Должен добавлять ингредиенты в конструктор', () => {
    cy.get(SELECTORS.INGREDIENT_CARD(BUN_ID)).scrollIntoView().should('be.visible');
    cy.get(SELECTORS.INGREDIENT_CARD(BUN_ID)).find('button').click({ force: true });

    cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('contain', 'Краторная булка N-200i');
    cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('contain', 'Краторная булка N-200i');

    cy.get(SELECTORS.INGREDIENT_CARD(MEAT_ID)).scrollIntoView().should('be.visible');
    cy.get(SELECTORS.INGREDIENT_CARD(MEAT_ID)).find('button').click({ force: true });
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS).should('contain', 'Биокотлета из марсианской Магнолии');

    cy.get(SELECTORS.INGREDIENT_CARD(SAUCE_ID)).scrollIntoView().should('be.visible');
    cy.get(SELECTORS.INGREDIENT_CARD(SAUCE_ID)).find('button').click({ force: true });
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS).should('contain', 'Соус Spicy-X');

    cy.get(SELECTORS.CONSTRUCTOR_PRICE).should('contain', '3024');
  });

  it('Должно открываться модальное окно ингредиента', () => {
    cy.get(SELECTORS.INGREDIENT_CARD(MEAT_ID)).find('a').click({ force: true });

    cy.get(SELECTORS.MODAL).should('be.visible');
    cy.get(SELECTORS.INGREDIENT_DETAILS).should('be.visible');
    cy.get(SELECTORS.INGREDIENT_DETAILS).should('contain', 'Биокотлета из марсианской Магнолии');

    cy.get(SELECTORS.INGREDIENT_CALORIES).should('contain', '4242');
    cy.get(SELECTORS.INGREDIENT_PROTEINS).should('contain', '420');
    cy.get(SELECTORS.INGREDIENT_FAT).should('contain', '142');
    cy.get(SELECTORS.INGREDIENT_CARBOHYDRATES).should('contain', '242');
  });

  it('Модалка должна закрываться по клику на крестик', () => {
    cy.get(SELECTORS.INGREDIENT_CARD(MEAT_ID)).find('a').click({ force: true });
    cy.get(SELECTORS.MODAL).should('be.visible');
    cy.get(SELECTORS.MODAL_CLOSE).find('svg').click({ force: true });
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  it('Модалка должна закрываться по клику на оверлей', () => {
    cy.get(SELECTORS.INGREDIENT_CARD(MEAT_ID)).find('a').click({ force: true });
    cy.get(SELECTORS.MODAL).should('be.visible');
    cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });
    cy.get(SELECTORS.MODAL).should('not.exist');
  });

  it('Пользовательский трек создания заказа', () => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUserSuccess');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
      win.localStorage.setItem('accessToken', 'test-access-token');
    });
    cy.setCookie('accessToken', 'test-access-token');

    cy.reload();
    cy.wait('@getIngredients');
    cy.wait(2000);

    cy.get(SELECTORS.INGREDIENT_CARD(BUN_ID)).find('button').click({ force: true });
    cy.get(SELECTORS.INGREDIENT_CARD(MEAT_ID)).scrollIntoView().find('button').click({ force: true });
    cy.get(SELECTORS.INGREDIENT_CARD(SAUCE_ID)).scrollIntoView().find('button').click({ force: true });

    cy.get(SELECTORS.ORDER_BUTTON).click({ force: true });
    cy.wait('@createOrder');

    cy.get(SELECTORS.ORDER_DETAILS).should('be.visible');
    cy.get(SELECTORS.ORDER_NUMBER).should('contain', '12345');

    cy.get(SELECTORS.MODAL_CLOSE).find('svg').click({ force: true });
    cy.get(SELECTORS.MODAL).should('not.exist');

    cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('contain', 'Выберите булки');
    cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('contain', 'Выберите булки');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENTS).should('contain', 'Выберите начинку');
    cy.get(SELECTORS.CONSTRUCTOR_PRICE).should('contain', '0');
  });

  it('Перенаправить незалогиненного пользователя при попытке создания заказа', () => {
    cy.get(SELECTORS.INGREDIENT_CARD(BUN_ID)).find('button').click({ force: true });
    cy.get(SELECTORS.INGREDIENT_CARD(MEAT_ID)).find('button').click({ force: true });
    cy.get(SELECTORS.ORDER_BUTTON).click({ force: true });
    cy.url().should('include', '/login');
  });
});