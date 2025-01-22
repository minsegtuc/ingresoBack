import Log from "./log.model.js";
import Aspirante from "./aspirante.model.js";
import Examen from "./examen.model.js";
import Usuario from "./usuario.model.js";
import Pregunta from "./pregunta.model.js";
import ExamenAspirante from "./examenAspirante.js";

Usuario.hasMany(Log, {
    foreignKey: 'usuario_id',
    sourceKey: 'id'
})
Log.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    sourceKey: 'id'
})

Examen.hasMany(ExamenAspirante, {
    foreignKey: 'examen_id', 
    sourceKey: 'id_examen'   
});

ExamenAspirante.belongsTo(Examen, {
    foreignKey: 'examen_id', 
    targetKey: 'id_examen'   
});

Examen.hasMany(Pregunta, {
    foreignKey: 'examen_id', 
    sourceKey: 'id_examen'   
});

Pregunta.belongsTo(Examen, {
    foreignKey: 'examen_id', 
    targetKey: 'id_examen'   
});

Aspirante.hasMany(ExamenAspirante, {
    foreignKey: 'aspirante_dni', 
    sourceKey: 'dni'   
});

ExamenAspirante.belongsTo(Aspirante, {
    foreignKey: 'aspirante_dni', 
    targetKey: 'dni'
});

export {Aspirante, Examen, Usuario, Log, Pregunta, ExamenAspirante};

