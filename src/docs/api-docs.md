# MySite2 API Documentation

Это документация для RESTful API сайта MySite2.

## Основные маршруты

### Общие
- `GET /` - Приветствие
- `GET /health` - Проверка состояния сервера

### Аутентификация
- `POST /auth/register` - Регистрация нового пользователя
- `POST /auth/login` - Вход пользователя
- `GET /auth/profile` - Получить профиль пользователя
- `PUT /auth/profile` - Обновить профиль пользователя

### Пользователи
- `GET /users` - Получить список пользователей
- `GET /users/:id` - Получить пользователя по ID
- `POST /users` - Создать нового пользователя
- `PUT /users/:id` - Обновить пользователя
- `DELETE /users/:id` - Удалить пользователя

### Посты
- `GET /posts` - Получить список постов
- `GET /posts/:id` - Получить пост по ID
- `POST /posts` - Создать новый пост
- `PUT /posts/:id` - Обновить пост
- `DELETE /posts/:id` - Удалить пост

### Категории
- `GET /categories` - Получить список категорий
- `GET /categories/:id` - Получить категорию по ID
- `POST /categories` - Создать новую категорию
- `PUT /categories/:id` - Обновить категорию
- `DELETE /categories/:id` - Удалить категорию

### Теги
- `GET /tags` - Получить список тегов
- `GET /tags/:id` - Получить тег по ID
- `POST /tags` - Создать новый тег
- `PUT /tags/:id` - Обновить тег
- `DELETE /tags/:id` - Удалить тег

### Комментарии
- `GET /comments` - Получить список комментариев
- `GET /comments/:id` - Получить комментарий по ID
- `POST /comments` - Создать новый комментарий
- `PUT /comments/:id` - Обновить комментарий
- `DELETE /comments/:id` - Удалить комментарий

### Сообщения
- `GET /messages` - Получить список сообщений
- `GET /messages/:id` - Получить сообщение по ID
- `POST /messages` - Создать новое сообщение
- `PUT /messages/:id` - Обновить сообщение
- `DELETE /messages/:id` - Удалить сообщение

### Рефералы
- `GET /referrals` - Получить список рефералов
- `GET /referrals/:id` - Получить реферала по ID
- `POST /referrals` - Создать новый реферал
- `PUT /referrals/:id` - Обновить реферал
- `DELETE /referrals/:id` - Удалить реферал

### Админ логи
- `GET /admin-logs` - Получить список админ логов
- `GET /admin-logs/:id` - Получить админ лог по ID
- `POST /admin-logs` - Создать новый админ лог
- `PUT /admin-logs/:id` - Обновить админ лог
- `DELETE /admin-logs/:id` - Удалить админ лог

## Требования к авторизации

Все маршруты, кроме `/auth/register`, `/auth/login`, `/health` и `/`, требуют авторизацию через JWT токен:

```
Authorization: Bearer <JWT_TOKEN>
```

## Структура ответов

### Успешные ответы
```json
{
  "status": "success",
  "data": { ... }
}
```

### Ошибки
```json
{
  "error": "Error message",
  "details": "Additional details"
}
```

## Структура данных

### User (Пользователь)
```json
{
  "id": integer,
  "username": string,
  "email": string,
  "password": string, // Не возвращается при запросах
  "firstName": string,
  "lastName": string,
  "role": enum("user", "admin", "moderator"),
  "isActive": boolean,
  "avatar": string,
  "bio": text,
  "referralCode": string,
  "referredBy": integer,
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### Post (Пост)
```json
{
  "id": integer,
  "title": string,
  "slug": string,
  "content": text,
  "excerpt": text,
  "featuredImage": string,
  "status": enum("draft", "published", "archived"),
  "publishedAt": datetime,
  "authorId": integer,
  "categoryId": integer,
  "isFeatured": boolean,
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### Category (Категория)
```json
{
  "id": integer,
  "name": string,
  "slug": string,
  "description": text,
  "parentId": integer,
  "sortOrder": integer,
  "isActive": boolean,
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### Tag (Тег)
```json
{
  "id": integer,
  "name": string,
  "slug": string,
  "description": text,
  "isActive": boolean,
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### Comment (Комментарий)
```json
{
  "id": integer,
  "content": text,
  "authorId": integer,
  "postId": integer,
  "parentId": integer,
  "isApproved": boolean,
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### Message (Сообщение)
```json
{
  "id": integer,
  "senderId": integer,
  "receiverId": integer,
  "content": text,
  "isRead": boolean,
  "isDeletedBySender": boolean,
  "isDeletedByReceiver": boolean,
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### Referral (Реферал)
```json
{
  "id": integer,
  "referrerId": integer,
  "referredId": integer,
  "referralCode": string,
  "status": enum("pending", "active", "expired"),
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### AdminLog (Лог администратора)
```json
{
  "id": integer,
  "userId": integer,
  "action": string,
  "description": text,
  "ipAddress": string,
  "userAgent": text,
  "targetId": integer,
  "targetType": string,
  "createdAt": datetime,
  "updatedAt": datetime
}
```

## Примеры запросов

### Регистрация пользователя
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure_password"
  }'
```

### Вход пользователя
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure_password"
  }'
```

### Получение профиля пользователя
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```