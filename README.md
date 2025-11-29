# Stellar Burgers

Космическая бургерная - веб-приложение для заказа бургеров с возможностью создания кастомных заказов, отслеживания статусов и управления профилем.

Сайт доступен по ссылке: [https://gabyshut.github.io/stellar-burgers](https://gabyshut.github.io/stellar-burgers)

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

## Технологии
- **Frontend**: React, TypeScript, Redux Toolkit
- **Роутинг**: React Router DOM
- **API**: REST, WebSocket
- **Стили**: CSS Modules

## Topics
`react` `typescript` `redux` `websocket` `react-router` `authorization` `burger-builder`

## Функциональность
- Конструктор бургеров
- Система авторизации и регистрации
- Лента заказов в реальном времени
- История заказов пользователя
- Модальные окна для деталей ингредиентов и заказов
- Защищённые маршруты

## Установка и запуск

### Системные требования
- Node.js 16+
- npm или yarn

### Развёртывание
```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для production
npm run build
```

Приложение будет доступно по адресу `http://localhost:3000`

## API
Для работы приложения требуется бэкенд-сервер Stellar Burgers API. Все эндпоинты описаны в `utils/burger-api.ts`.
