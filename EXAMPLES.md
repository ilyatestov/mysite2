# Примеры использования моделей

## 1. Работа с моделью User

### Создание пользователя
```javascript
const User = require('./src/models/User');

// Создание нового пользователя
const newUser = await User.create({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'hashed_password',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user'
});

console.log(newUser.id);
```

### Получение пользователя
```javascript
// По ID
const user = await User.findByPk(1);

// По email
const user = await User.findOne({
  where: { email: 'john@example.com' }
});

// Все пользователи
const users = await User.findAll();
```

### Обновление пользователя
```javascript
const user = await User.findByPk(1);
await user.update({
  firstName: 'Jane',
  lastName: 'Smith'
});
```

## 2. Работа с моделью Post

### Создание поста
```javascript
const Post = require('./src/models/Post');

const newPost = await Post.create({
  title: 'Новый пост',
  slug: 'novyj-post',
  content: 'Содержание поста',
  excerpt: 'Краткое описание',
  authorId: 1,
  categoryId: 1
});
```

### Получение постов
```javascript
// Все опубликованные посты
const posts = await Post.findAll({
  where: { status: 'published' },
  include: [{ model: User, as: 'author' }]
});

// По посту с автором
const post = await Post.findByPk(1, {
  include: [{ model: User, as: 'author' }]
});
```

## 3. Работа с моделью Category

### Создание категории
```javascript
const Category = require('./src/models/Category');

const newCategory = await Category.create({
  name: 'Технологии',
  slug: 'tehnologii',
  description: 'Категория о технологиях'
});
```

### Получение категорий
```javascript
// Все активные категории
const categories = await Category.findAll({
  where: { isActive: true }
});
```

## 4. Работа с моделью Tag

### Создание тега
```javascript
const Tag = require('./src/models/Tag');

const newTag = await Tag.create({
  name: 'JavaScript',
  slug: 'javascript',
  description: 'Тег для JavaScript'
});
```

## 5. Работа с моделью Comment

### Создание комментария
```javascript
const Comment = require('./src/models/Comment');

const newComment = await Comment.create({
  content: 'Отличный пост!',
  authorId: 1,
  postId: 1
});
```

## 6. Работа с моделью Message

### Создание сообщения
```javascript
const Message = require('./src/models/Message');

const newMessage = await Message.create({
  senderId: 1,
  receiverId: 2,
  content: 'Привет!'
});
```

## 7. Работа с моделью Referral

### Создание реферала
```javascript
const Referral = require('./src/models/Referral');

const newReferral = await Referral.create({
  referrerId: 1,
  referredId: 2,
  referralCode: 'ABC123'
});
```

## 8. Работа с моделью AdminLog

### Создание записи лога
```javascript
const AdminLog = require('./src/models/AdminLog');

const newLog = await AdminLog.create({
  userId: 1,
  action: 'user_created',
  description: 'Создан новый пользователь',
  ipAddress: '127.0.0.1'
});
```

## 9. Связи между моделями

### Получение постов с категорией и автором
```javascript
const posts = await Post.findAll({
  include: [
    { model: Category, as: 'category' },
    { model: User, as: 'author' }
  ]
});
```

### Получение пользователя с его постами
```javascript
const user = await User.findByPk(1, {
  include: [{ model: Post, as: 'posts' }]
});
```

### Получение поста с комментариями
```javascript
const post = await Post.findByPk(1, {
  include: [{ model: Comment, as: 'comments' }]
});
```

## 10. Пагинация и сортировка

### Пагинация постов
```javascript
const posts = await Post.findAndCountAll({
  limit: 10,
  offset: 0,
  order: [['createdAt', 'DESC']]
});
```

### Сортировка постов
```javascript
const posts = await Post.findAll({
  order: [
    ['publishedAt', 'DESC'],
    ['createdAt', 'DESC']
  ]
});
```