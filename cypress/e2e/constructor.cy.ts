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
    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').scrollIntoView().should('be.visible');
    
    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').find('button').click({ force: true });
    
    cy.get('[data-cy="constructor-bun-top"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', 'Краторная булка N-200i');
    
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').scrollIntoView().should('be.visible');
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').find('button').click({ force: true });
    
    cy.get('[data-cy="constructor-ingredients"]').should('contain', 'Биокотлета из марсианской Магнолии');
    
    cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]').scrollIntoView().should('be.visible');
    cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]').find('button').click({ force: true });
    
    cy.get('[data-cy="constructor-ingredients"]').should('contain', 'Соус Spicy-X');
    
    cy.get('[data-cy="constructor-price"]').should('contain', '3024');
  });

  it('Должно открываться модальное окно ингредиента', () => {
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').find('a').click({ force: true });
    
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="ingredient-details"]').should('be.visible');
    cy.get('[data-cy="ingredient-details"]').should('contain', 'Биокотлета из марсианской Магнолии');
    
    cy.get('[data-cy="ingredient-calories"]').should('contain', '4242');
    cy.get('[data-cy="ingredient-proteins"]').should('contain', '420');
    cy.get('[data-cy="ingredient-fat"]').should('contain', '142');
    cy.get('[data-cy="ingredient-carbohydrates"]').should('contain', '242');
  });

  it('Модалка должна закрываться по клику на крестик', () => {
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').find('a').click({ force: true });
    cy.get('[data-cy="modal"]').should('be.visible');
    
    cy.get('[data-cy="modal-close"]').find('svg').click({ force: true });
    
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Модалка должна закрываться по клику на оверлей', () => {
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').find('a').click({ force: true });
    cy.get('[data-cy="modal"]').should('be.visible');
    
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    
    cy.get('[data-cy="modal"]').should('not.exist');
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
    
    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').find('button').click({ force: true });
    
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').scrollIntoView();
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').find('button').click({ force: true });
    
    cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]').scrollIntoView();
    cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]').find('button').click({ force: true });
    
    cy.get('[data-cy="order-button"]').click({ force: true });
    
    cy.wait('@createOrder');
    
    cy.get('[data-cy="order-details"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '12345');
    
    cy.get('[data-cy="modal-close"]').find('svg').click({ force: true });
    
    cy.get('[data-cy="modal"]').should('not.exist');
    
    cy.get('[data-cy="constructor-bun-top"]').should('contain', 'Выберите булки');
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', 'Выберите булки');
    cy.get('[data-cy="constructor-ingredients"]').should('contain', 'Выберите начинку');
    cy.get('[data-cy="constructor-price"]').should('contain', '0');
  });

  it('Перенаправить незалогиненного пользователя при попытке создания заказа', () => {
    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').find('button').click({ force: true });
    
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').find('button').click({ force: true });
    
    cy.get('[data-cy="order-button"]').click({ force: true });
    
    cy.url().should('include', '/login');
  });
});