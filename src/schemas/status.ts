/**
 * @openapi
 * /status:
 *   post:
 *     summary: Создание нового статуса
 *     operationId: createStatus
 *     tags:
 *       - Status
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Название статуса
 *                 example: "В работе"
 *             required:
 *               - status
 *     responses:
 *       '200':
 *         description: Статус успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *       '400':
 *         description: Ошибка валидации данных или статус уже существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The status exist"
 *       '422':
 *         description: Ошибка при создании статуса
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while creating status"
 *   get:
 *     summary: Получение всех статусов
 *     operationId: getStatuses
 *     tags:
 *       - Status
 *     responses:
 *       '200':
 *         description: Список статусов
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
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
 *                   example: "Error while fetching statuses"
 * /status/{status}:
 *   delete:
 *     summary: Удаление статуса по названию
 *     operationId: deleteStatus
 *     tags:
 *       - Status
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "В работе"
 *         description: Название статуса
 *     responses:
 *       '200':
 *         description: Статус успешно удален
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully deleted В работе"
 *       '404':
 *         description: Статус не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while deleting status"
 * components:
 *   schemas:
 *     Status:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         status:
 *           type: string
 *           example: "В работе"
 */
