/**
 * @openapi
 * /proposal:
 *   post:
 *     summary: Создание нового предложения
 *     operationId: createProposal
 *     tags:
 *       - Proposal
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proposal'
 *             required:
 *               - title
 *               - description
 *               - categoryName
 *               - statusName
 *     responses:
 *       '200':
 *         description: Предложение успешно создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proposal'
 *       '400':
 *         description: Ошибка валидации данных
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The title is required"
 *       '422':
 *         description: Ошибка при создании предложения
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error while creating proposal"
 *   get:
 *     summary: Получение списка всех предложений
 *     operationId: getProposals
 *     tags:
 *       - Proposal
 *     parameters:
 *       - name: countInPage
 *         in: query
 *         description: Количество предложений на странице
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: numberPage
 *         in: query
 *         description: Номер страницы
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: status
 *         in: query
 *         description: Статус предложения
 *         required: false
 *         schema:
 *           type: string
 *           example: "В работе"
 *       - name: category
 *         in: query
 *         description: Категория предложения
 *         required: false
 *         schema:
 *           type: string
 *           example: "Команда"
 *       - name: sorting
 *         in: query
 *         description: Поле сортировки (createdAt или updatedAt)
 *         required: false
 *         schema:
 *           type: string
 *           example: "createdAt"
 *       - name: sortingDirection
 *         in: query
 *         description: Направление сортировки (1 - по убыванию, 0 - по возрастанию)
 *         required: false
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       '200':
 *         description: Список предложений
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 proposal:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1234"
 *                       title:
 *                         type: string
 *                         example: "Взять сотрудника"
 *                       description:
 *                         type: string
 *                         example: "Да может что-то и не получается, главное стараться, перспективы есть"
 *                       categoryName:
 *                         type: string
 *                         example: "Команда"
 *                       statusName:
 *                         type: string
 *                         example: "В работе"
 *                       countVote:
 *                         type: integer
 *                         example: 0
 *       '404':
 *         description: Данные не найдены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data :["
 *   put:
 *     summary: Обновление предложения
 *     operationId: updateProposal
 *     tags:
 *       - Proposal
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID предложения
 *                 example: "1234"
 *               title:
 *                 type: string
 *                 description: Заголовок предложения
 *                 example: "Взять сотрудника"
 *               description:
 *                 type: string
 *                 description: Описание предложения
 *                 example: "Да может что-то и не получается, главное стараться, перспективы есть"
 *               categoryName:
 *                 type: string
 *                 description: Категория предложения
 *                 example: "Команда"
 *               statusName:
 *                 type: string
 *                 description: Статус предложения
 *                 example: "В работе"
 *             required:
 *               - id
 *               - title
 *               - description
 *               - categoryName
 *               - statusName
 *     responses:
 *       '200':
 *         description: Предложение успешно обновлено
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/Proposal'
 *
 *       '404':
 *         description: Предложение не найдено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Does not exist proposal :["
 * /proposal/{id}:
 *   get:
 *     summary: Получение предложения по ID
 *     operationId: getProposalById
 *     tags:
 *       - Proposal
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID предложения
 *         required: true
 *         schema:
 *           type: string
 *           example: "1234"
 *     responses:
 *       '200':
 *         description: Предложение найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proposal'
 *       '404':
 *         description: Предложение не найдено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data :["
 *   delete:
 *     summary: Удаление предложения по ID
 *     operationId: deleteProposal
 *     tags:
 *       - Proposal
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID предложения
 *         required: true
 *         schema:
 *           type: string
 *           example: "1234"
 *     responses:
 *       '200':
 *         description: Предложение успешно удалено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully deleted 1234"
 *       '404':
 *         description: Предложение не найдено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Proposal not found"
 * components:
 *   schemas:
 *     Proposal:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Взять сотрудника"
 *         description:
 *           type: string
 *           example: "Да может что-то и не получается, главное стараться, перспективы есть"
 *         categoryName:
 *           type: string
 *           example: "Команда"
 *         statusName:
 *           type: string
 *           example: "В работе"
 */
