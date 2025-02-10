import Detail from "../../models/Detail.js";
import DetailCost from "../../models/DetailCost.js";
import Cost from "../../models/Cost.js";
import Course from "../../models/Course.js";
// import Course from "../../models/Course.js";
import notifications from "../../notifications.json" assert { type: "json" };
import { Op } from "sequelize";

// ! basic methods for cost
// export const addCost = async (req, res) => {
//   try {
//     const { amount, description } = req.body;

//     const newCost = await Cost.create({
//       amount,
//       description,
//     });

//     return res.status(201).json({
//       message: notifications.costo.ct4,
//       cost: newCost,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

export const getCosts = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.body;
    const offset = (page - 1) * limit;

    const costs = await Cost.findAndCountAll({
      where: {
        [Op.or]: [
          { amount: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
        ],
      },
      include: [
        {
          model: Detail,
          through: { attributes: [] },
          include: [
            {
              model: Course,
              // through: { attributes: [] },
            },
          ],
        },
      ],
      limit: limit,
      offset: offset,
    });

    return res.status(200).json({
      total: costs.count, // Total de resultados
      totalPages: Math.ceil(costs.count / limit), // Total de páginas
      costs: costs.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

export const getCostById = async (req, res) => {
  try {
    const { id } = req.params;
    const cost = await Cost.findByPk(id);

    if (!cost) {
      return res.status(404).json({ message: notifications.costo.ct5 });
    }
    return res.status(200).json(cost);
  } catch (error) {
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

// export const deleteCost = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const cost = await Cost.findByPk(id);
//     if (!cost) {
//       return res.status(404).json({ message: notifications.costo.ct5 });
//     }

//     await cost.destroy();

//     return res.status(200).json({ message: notifications.costo.dt3 });
//   } catch (error) {
//     return res.status(500).json({ message: notifications.principal.p1, error });
//   }
// };

export const updateCost = async (req, res) => {
  try {
    const { id } = req.params;
    const cost = await Cost.findByPk(id);

    if (!cost) {
      return res.status(404).json({ message: notifications.costo.ct5 });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    const updatedFields = {};

    for (const field in req.body) {
      if (Cost.rawAttributes[field]) {
        updatedFields[field] = req.body[field];
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: notifications.principal.p2 });
    }

    await cost.update(updatedFields);

    return res.status(200).json({ message: notifications.cost.ct2, cost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: notifications.principal.p1, error });
  }
};

// ! advanced methods for detail_cost

export const addCost = async (req, res) => {
  try {
    const { amount, description, course_id } = req.body;

    const course = await Course.findOne({
      where: { course_id },
      include: [{ model: Detail }],
    });
    
    console.log(`> ${course}]`);
    let detail_id = course.Detail.detail_id;
    
    const newCost = await Cost.create({
      amount,
      description,
    });

    await DetailCost.create({
      detail_id,
      cost_id: newCost.cost_id,
    });

    return res
      .status(201)
      .json({ message: notifications.costo.ct4, cost: newCost });
  } catch (error) {
    // return res.status(500).json({ message: notifications.principal.p1, error });
    console.log(error)
    return res.status(500).json({ message: error });
  }
};

export const deleteCost = async (req,res) => {
  const {cost_id} = req.params;
  const detailCost = await DetailCost.findByPk(cost_id);
  if (!detailCost) {
    return res.status(404).json({ message: notifications.costo.ct5 });
  }

  await detailCost.destroy();
  const cost = await Cost.findByPk(detailCost.cost_id);
  await cost.destroy();

  return res.status(200).json({ message: notifications.costo.dt3 });
};