import Category from "../models/CategoryModel.js";
export const getCategorys = async (req, res) => {
    try {
        let response;
        response = await Category.findAll({
            attributes: ['uuid','id', 'nombre', 'limite']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getCategorysId = async (req, res) => {
    try {
        const category = await Category.findOne({
            attributes: ['uuid', 'nombre', 'limite'],
            where: {
                uuid: req.params.id
            }
        });
        if (!category) return res.status(400).json({ msg: "category no encontrado" });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const crearCategory = async (req, res) => {
    const { nombre, limite } = req.body;
    try {
        await Category.create({
            nombre: nombre,
            limite: limite,
        });
        res.status(201).json({ msg: "Categoria creada con exito" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            attributes: ['uuid', 'nombre', 'limite'],
            where: {
                uuid: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "categoria no encontrado" });
        const { nombre, limite } = req.body;
        if (req.role === "admin") {
            console.log("entras al if")
            await Category.update({ nombre, limite }, {
                where: {
                    uuid: category.uuid
                }
            });
            console.log(category.id);
            res.status(200).json({msg:"categoria actualizada con exito"});
        } else {
            res.status(403).json({msg:"hey esto no esta prohibido"});
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteCategory = async(req, res) => {
    try {
        const category = await Category.findOne({
            attributes: ['uuid', 'nombre', 'limite'],
            where: {
                uuid: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "categoria no encontrada" });
        if (req.role === "admin") {
            console.log("entras al if")
            await Category.destroy({
                where: {
                    uuid: category.uuid
                }
            });
            console.log(category.id);
            res.status(200).json({msg:"categoria eliminada con exito"});
        } else {
            res.status(403).json({msg:"hey esto no esta prohibido"});
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}