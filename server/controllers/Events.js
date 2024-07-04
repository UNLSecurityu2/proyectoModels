import Event from "../models/EventosModel.js";
export const getEvents = async (req, res) => {
    try {
        let response;
        response = await Event.findAll({
            attributes: ['id', 'fecha', 'ubicacion', 'capacidad', 'estado', 'justificacion', 'aceptado','userId']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getEventsById = async (req, res) => {
    try {
        const event = await Event.findOne({
            attributes: ['id', 'fecha', 'ubicacion', 'capacidad', 'estado', 'justificacion', 'aceptado'],
            where: {
                id: req.params.id
            }
        });
        if (!event) return res.status(400).json({ msg: "evento no encontrado 1" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createEvents = async (req, res) => {
    const { fecha, ubicacion, capacidad, userId } = req.body;
    try {
        await Event.create({
            fecha: fecha,
            ubicacion: ubicacion,
            capacidad: capacidad,
            userId: userId
        });
        res.status(201).json({ msg: "Evento creado con exito" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateEvents = async (req, res) => {
    try {
        const event = await Event.findOne({
            attributes: ['id', 'fecha', 'ubicacion', 'capacidad', 'estado', 'justificacion', 'aceptado' ,'userId'],
            where: {
                id: req.params.id
            }
        });
        if (!event) return res.status(404).json({ msg: "evento no encontrado 2" });
        const { fecha, ubicacion, capacidad, estado, justificacion, aceptado, userId } = req.body;
        await Event.update({
            fecha: fecha,
            ubicacion: ubicacion,
            capacidad: capacidad,
            estado: estado,
            justificacion: justificacion,
            aceptado: aceptado,
            userId: userId
        }, {
            where: {
                id: req.params.id
            }
        });        
        res.status(200).json({msg:"evento actualizado con exito"});
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


export const deleteEvents = async(req, res) => {
    try {
        const event = await Event.findOne({
            attributes: ['id', 'fecha', 'ubicacion', 'capacidad'],
            where: {
                id: req.params.id
            }
        });
        if (!event) return res.status(404).json({ msg: "evento no encontrado 3" });
        if (req.role === "admin") {
            console.log("entras al if")
            await Event.destroy({
                where: {
                    id: event.id
                }
            });
            console.log(event.id);
            res.status(200).json({msg:"evento eliminado con exito"});
        } else {
            res.status(403).json({msg:"hey esto no esta prohibido"});
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}