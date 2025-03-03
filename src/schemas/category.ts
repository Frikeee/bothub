/**
 * @openapi
 * /category:
 *   post:
 *     summary: Создание категории
 *     description: Создает новую категорию. Требует аутентификации и прав администратора.
 *     operationId: createCategory
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: Название категории
 *                 example: "Команда"
 *             required:
 *               - category
 *     responses:
 *       '200':
 *         description: Категория успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '400':
 *         description: Ошибка валидации или категория уже существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The category exist"
 *       '422':
 *         description: Ошибка при создании категории
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Some error occurred"
 *   get:
 *     summary: Получить все категории
 *     description: Возвращает список всех категорий.
 *     operationId: getAllCategories
 *     tags:
 *       - Category
 *     responses:
 *       '200':
 *         description: Список категорий
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '400':
 *         description: Нет данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data :["
 *       '404':
 *         description: Ошибка при получении категорий
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Some error occurred"
 * /category/{category}:
 *   delete:
 *     summary: Удаление категории
 *     description: Удаляет категорию по имени. Требует аутентификации и прав администратора.
 *     operationId: deleteCategory
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           description: Название категории для удаления
 *         example: "Команда"
 *     responses:
 *       '200':
 *         description: Категория успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully deleted Команда"
 *       '404':
 *         description: Категория не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         category:
 *           type: string
 *           example: "Команда"
 */
