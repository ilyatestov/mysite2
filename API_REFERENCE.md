# API Reference for MySite2

## Authentication

### Register
```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "role": "string",
    "isActive": "boolean"
  }
}
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "role": "string",
    "isActive": "boolean"
  }
}
```

### Get Profile
```
GET /auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

## Users

### Get All Users
```
GET /users
```

**Headers:**
```
Authorization: Bearer <token>
```

### Get User by ID
```
GET /users/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Update User
```
PUT /users/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Delete User
```
DELETE /users/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

## Posts

### Get All Posts
```
GET /posts
```

### Get Post by ID
```
GET /posts/:id
```

### Create Post
```
POST /posts
```

**Headers:**
```
Authorization: Bearer <token>
```

### Update Post
```
PUT /posts/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Delete Post
```
DELETE /posts/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

## Categories

### Get All Categories
```
GET /categories
```

### Get Category by ID
```
GET /categories/:id
```

### Create Category
```
POST /categories
```

**Headers:**
```
Authorization: Bearer <token>
```

### Update Category
```
PUT /categories/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Delete Category
```
DELETE /categories/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

## Tags

### Get All Tags
```
GET /tags
```

### Get Tag by ID
```
GET /tags/:id
```

### Create Tag
```
POST /tags
```

**Headers:**
```
Authorization: Bearer <token>
```

### Update Tag
```
PUT /tags/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Delete Tag
```
DELETE /tags/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

## Comments

### Get All Comments
```
GET /comments
```

### Get Comment by ID
```
GET /comments/:id
```

### Create Comment
```
POST /comments
```

**Headers:**
```
Authorization: Bearer <token>
```

### Update Comment
```
PUT /comments/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Delete Comment
```
DELETE /comments/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

## Messages

### Get All Messages
```
GET /messages
```

**Headers:**
```
Authorization: Bearer <token>
```

### Get Message by ID
```
GET /messages/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Create Message
```
POST /messages
```

**Headers:**
```
Authorization: Bearer <token>
```

### Update Message
```
PUT /messages/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Delete Message
```
DELETE /messages/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

## Referrals

### Get All Referrals
```
GET /referrals
```

**Headers:**
```
Authorization: Bearer <token>
```

### Get Referral by ID
```
GET /referrals/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Create Referral
```
POST /referrals
```

**Headers:**
```
Authorization: Bearer <token>
```

### Update Referral
```
PUT /referrals/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Delete Referral
```
DELETE /referrals/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

## Admin Logs

### Get All Admin Logs
```
GET /admin-logs
```

**Headers:**
```
Authorization: Bearer <token>
```

### Get Admin Log by ID
```
GET /admin-logs/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

### Create Admin Log
```
POST /admin-logs
```

**Headers:**
```
Authorization: Bearer <token>
```

## Admin

### Get System Stats
```
GET /admin/stats
```

**Headers:**
```
Authorization: Bearer <token>
```

### Get User Stats
```
GET /admin/users/stats
```

**Headers:**
```
Authorization: Bearer <token>
```

## Health Check

### Health Status
```
GET /health
```

## Root Endpoint

### Welcome
```
GET /
```