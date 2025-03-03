/**
 * @openapi
 * /user/registration:
 *   post:
 *     summary: Регистрация нового пользователя
 *     operationId: registerUser
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *                 example: "bothub@love.vozmiteNaRaboty"
 *               avatar:
 *                 type: string
 *                 description: URL аватара пользователя
 *                 example: "avatar.jpg"
 *               name:
 *                 type: string
 *                 description: Имя пользователя
 *                 example: "Horoshi sotrydnik"
 *               role:
 *                 type: string
 *                 description: Роль пользователя
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль пользователя (мин. 5 символов)
 *                 example: "NeVzlamyvaite"
 *             required:
 *               - email
 *               - avatar
 *               - name
 *               - role
 *               - password
 *     responses:
 *       '201':
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/SecureUser'
 *                 jwt:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Ошибка валидации данных или пользователь уже существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *       '422':
 *         description: Ошибка при создании пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while creating user"
 * /user/login:
 *   post:
 *     summary: Авторизация пользователя
 *     operationId: loginUser
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *                 example: "bothub@love.vozmiteNaRaboty"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль пользователя
 *                 example: "NeVzlamyvaite"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/SecureUser'
 *                 jwt:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Ошибка валидации данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email is not valid"
 *       '404':
 *         description: Пользователь не найден или неверный пароль
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User does not exist"
 *       '422':
 *         description: Ошибка при авторизации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while logging in"
 * /user:
 *   get:
 *     summary: Получение данных о текущем пользователе
 *     operationId: getUser
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/SecureUser'
 *       '404':
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not exists"
 *       '401':
 *         description: Ошибка аутентификации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 * components:
 *   schemas:
 *     SecureUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         email:
 *           type: string
 *           format: email
 *           example: "bothub@love.vozmiteNaRaboty"
 *         avatar:
 *           type: string
 *           example: "avatar.jpg"
 *         name:
 *           type: string
 *           example: "Horoshi sotrydnik"
 *         role:
 *           type: string
 *           example: "admin"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-03-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-03-02T15:30:00Z"
 */
