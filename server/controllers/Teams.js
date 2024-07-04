import Team from "../models/TeamsModel.js";


export const getTeams = async (req, res) => {
    try {
        let response;
        response = await Team.findAll({
            attributes: ['uuid', 'name', 'ciudadRepresentante', 'categoryId']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getTeamsById = async (req, res) => {
    try {
        const team = await Team.findOne({
            attributes: ['uuid', 'name', 'ciudadRepresentante', 'categoryId'],
            where: {
                uuid: req.params.id
            }
        });
        if (!team) return res.status(400).json({ msg: "team no encontrado" });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const crearTeam = async (req, res) => {
    const { name, ciudadRepresentante, categoriaId } = req.body;
    try {
        await Team.create({
            name: name,
            ciudadRepresentante: ciudadRepresentante,
            categoryId: categoriaId
        });
        res.status(201).json({ msg: "Team creado con exito" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateTeam = async (req, res) => {
    try {
        const team = await Team.findOne({
            attributes: ['uuid', 'name', 'ciudadRepresentante'],
            where: {
                uuid: req.params.id
            }
        });
        if (!team) return res.status(404).json({ msg: "team no encontrado" });
        const { name, ciudadRepresentante } = req.body;
        if (req.role === "admin") {
            console.log("entras al if")
            await Team.update({ name, ciudadRepresentante }, {
                where: {
                    uuid: team.uuid
                }
            });
            console.log(team.id);
            res.status(200).json({msg:"team actualizado con exito"});
        } else {
            res.status(403).json({msg:"hey esto no esta prohibido"});
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteTeam = async(req, res) => {
    try {
        const team = await Team.findOne({
            attributes: ['uuid', 'name', 'ciudadRepresentante'],
            where: {
                uuid: req.params.id
            }
        });
        if (!team) return res.status(404).json({ msg: "team no encontrado" });
        if (req.role === "admin") {
            console.log("entras al if")
            await Team.destroy({
                where: {
                    uuid: team.uuid
                }
            });
            console.log(team.id);
            res.status(200).json({msg:"team eliminado con exito"});
        } else {
            res.status(403).json({msg:"hey esto no esta prohibido"});
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}