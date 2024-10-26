import { Router } from "express";
import {
  addRole,
  getRoleById,
  getRoles,
  inactiveRole,
  updateRole,
} from "../../controllers/api_controllers/role.controller.js";

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Obtiene roles con búsqueda y paginación
 *     description: Permite buscar roles en la base de datos con paginación y un término de búsqueda opcional.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 example: "Admin"
 *                 description: "Término para buscar en los nombres o descripciones de los roles."
 *               limit:
 *                 type: integer
 *                 example: 10
 *                 description: "Número de resultados por página (por defecto: 10)."
 *               page:
 *                 type: integer
 *                 example: 1
 *                 description: "Número de la página a devolver (por defecto: 1)."
 *     responses:
 *       200:
 *         description: Lista de roles devuelta con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 2
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       role_id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Admin"
 *                       description:
 *                         type: string
 *                         example: "Rol de administrador"
 *                       status:
 *                         type: string
 *                         example: "Activo"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-20T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-20T12:00:00Z"
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/roles', getRoles);

/**
 * @swagger
 * /api/role:
 *   post:
 *     summary: Crea un nuevo rol
 *     description: Permite añadir un nuevo rol a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Admin"
 *               description:
 *                 type: string
 *                 example: "Rol de administrador"
 *     responses:
 *       201:
 *         description: Rol creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rol creado con éxito."
 *                 role:
 *                   type: object
 *                   properties:
 *                     role_id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Admin"
 *                     description:
 *                       type: string
 *                       example: "Rol de administrador"
 *                     status:
 *                       type: string
 *                       example: "Inactivo"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-20T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-20T12:00:00Z"
 *       400:
 *         description: Error, el rol ya existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/role', addRole);

/**
 * @swagger
 * /api/role/{id}:
 *   get:
 *     summary: Obtiene un rol por ID
 *     description: Devuelve un rol específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role_id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Admin"
 *                 description:
 *                   type: string
 *                   example: "Rol de administrador"
 *                 status:
 *                   type: string
 *                   example: "Activo"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-20T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-20T12:00:00Z"
 *       404:
 *         description: Rol no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/role/:id', getRoleById);

/**
 * @swagger
 * /api/role/{id}:
 *   put:
 *     summary: Actualiza un rol
 *     description: Permite actualizar los detalles de un rol existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Admin"
 *               description:
 *                 type: string
 *                 example: "Rol de administrador"
 *     responses:
 *       200:
 *         description: Rol actualizado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rol actualizado con éxito."
 *                 role:
 *                   type: object
 *                   properties:
 *                     role_id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Admin"
 *                     description:
 *                       type: string
 *                       example: "Rol de administrador"
 *                     status:
 *                       type: string
 *                       example: "Activo"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-20T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-20T12:00:00Z"
 *       400:
 *         description: Error, no hay datos para actualizar.
 *       404:
 *         description: Rol no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/role/:id', updateRole);

/**
 * @swagger
 * /api/role/{id}:
 *   delete:
 *     summary: Cambia el estado de un rol
 *     description: Permite cambiar el estado de un rol a Activo/Inactivo.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol a cambiar de estado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado del rol cambiado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado del rol cambiado con éxito."
 *       404:
 *         description: Rol no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/role/:id', inactiveRole);

export default router;
