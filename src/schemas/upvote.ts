/**
 * @openapi
 * /upvote:
 *   post:
 *     summary: Создание нового голоса (upvote)
 *     operationId: createUpvote
 *     tags:
 *       - Upvotes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proposalId:
 *                 type: string
 *                 format: uuid
 *                 description: ID предложения, за которое голосуют
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *             required:
 *               - proposalId
 *     responses:
 *       '200':
 *         description: Голос успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 upvote:
 *                   $ref: '#/components/schemas/Upvote'
 *       '400':
 *         description: Ошибка валидации данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The proposalId is required"
 *       '422':
 *         description: Ошибка при создании голоса
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while creating upvote"
 *   get:
 *     summary: Получение всех голосов
 *     operationId: getUpvotes
 *     tags:
 *       - Upvotes
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Список голосов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 upvote:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Upvote'
 *       '400':
 *         description: Данные не найдены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data :["
 *       '404':
 *         description: Ошибка при получении данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while fetching upvotes"
 * /upvote/{id}:
 *   get:
 *     summary: Получение информации о голосе
 *     operationId: getUpvoteById
 *     tags:
 *       - Upvotes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         description: ID голоса
 *     responses:
 *       '200':
 *         description: Информация о голосе
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Upvote'
 *       '404':
 *         description: Голос не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data :["
 *   delete:
 *     summary: Удаление голоса
 *     operationId: deleteUpvote
 *     tags:
 *       - Upvotes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         description: ID голоса
 *     responses:
 *       '200':
 *         description: Голос успешно удален
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully deleted 550e8400-e29b-41d4-a716-446655440000"
 *       '404':
 *         description: Голос не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while deleting upvote"
 * components:
 *   schemas:
 *     Upvote:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Уникальный идентификатор голоса
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         userId:
 *           type: string
 *           format: uuid
 *           description: Уникальный идентификатор пользователя
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         proposalId:
 *           type: string
 *           format: uuid
 *           description: Уникальный идентификатор предложения
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 */
