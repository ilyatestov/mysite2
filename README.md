# MySite2 - API Backend

Это API backend для веб-сайта MySite2, реализованный на Node.js с использованием Express.js.

## Основные функции

- RESTful API для управления пользователями, постами, категориями и тегами
- Система аутентификации и авторизации
- Система рефералов
- Логирование действий администраторов
- Поддержка различных типов контента

## Структура проекта

```
mysite2/
├── src/
│   ├── models/          # Модели данных
│   ├── routes/          # Маршруты API
│   ├── controllers/     # Контроллеры
│   ├── middleware/      # Промежуточное ПО
│   ├── config/          # Конфигурации
│   └── server.js        # Основной файл сервера
├── migrations/          # Миграции базы данных
├── tests/               # Тесты
├── .env                 # Переменные окружения
├── package.json         # Зависимости проекта
└── README.md            # Документация
```

## Требования

- Node.js (v14 или выше)
- npm (v6 или выше)
- PostgreSQL (для работы с базой данных)

## Установка

1. Склонируйте репозиторий
2. Установите зависимости:
   ```bash
   npm install
   ```

3. Создайте файл `.env` с переменными окружения (см. `.env.example`)

4. Запустите миграции базы данных:
   ```bash
   npx sequelize db:migrate
   ```

5. Запустите сервер:
   ```bash
   npm start
   ```

## API Документация

### Основные маршруты

- `GET /` - Приветствие
- `GET /health` - Проверка состояния сервера
- `GET /users` - Получить список пользователей
- `GET /posts` - Получить список постов
- `GET /categories` - Получить список категорий
- `GET /tags` - Получить список тегов

## Модели данных

### User (Пользователь)
- id: INTEGER (PK)
- username: STRING
- email: STRING (UNIQUE)
- password: STRING
- firstName: STRING
- lastName: STRING
- role: ENUM (user, admin, moderator)
- isActive: BOOLEAN
- createdAt: DATE
- updatedAt: DATE

### Post (Пост)
- id: INTEGER (PK)
- title: STRING
- slug: STRING (UNIQUE)
- content: TEXT
- excerpt: TEXT
- authorId: INTEGER (FK to Users)
- categoryId: INTEGER (FK to Categories)
- status: ENUM (draft, published, archived)
- publishedAt: DATE
- createdAt: DATE
- updatedAt: DATE

### Category (Категория)
- id: INTEGER (PK)
- name: STRING
- slug: STRING (UNIQUE)
- description: TEXT
- isActive: BOOLEAN
- createdAt: DATE
- updatedAt: DATE

### Tag (Тег)
- id: INTEGER (PK)
- name: STRING
- slug: STRING (UNIQUE)
- description: TEXT
- createdAt: DATE
- updatedAt: DATE

### Comment (Комментарий)
- id: INTEGER (PK)
- content: TEXT
- authorId: INTEGER (FK to Users)
- postId: INTEGER (FK to Posts)
- createdAt: DATE
- updatedAt: DATE

### Message (Сообщение)
- id: INTEGER (PK)
- senderId: INTEGER (FK to Users)
- receiverId: INTEGER (FK to Users)
- content: TEXT
- isRead: BOOLEAN
- createdAt: DATE
- updatedAt: DATE

### Referral (Реферал)
- id: INTEGER (PK)
- referrerId: INTEGER (FK to Users)
- referredId: INTEGER (FK to Users)
- referralCode: STRING
- status: ENUM (pending, active, expired)
- createdAt: DATE
- updatedAt: DATE

### AdminLog (Лог администратора)
- id: INTEGER (PK)
- userId: INTEGER (FK to Users)
- action: STRING
- description: TEXT
- ipAddress: STRING
- userAgent: TEXT
- targetId: INTEGER
- targetType: STRING
- createdAt: DATE
- updatedAt: DATE

## Запуск тестов

Для запуска тестов используйте команду:
```bash
npm test
```

Тесты проверяют:
- Работу основных маршрутов API
- Правильность ответов сервера
- Обработку ошибок

## Статус проекта

Проект находится в разработке. Текущая версия: 1.0.0

## Лицензия

Этот проект распространяется под лицензией MIT. См. файл LICENSE для подробностей.