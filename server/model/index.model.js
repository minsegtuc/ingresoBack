import Log from "./log.model.js";
import Aspirante from "./aspirante.model.js";
import Examen from "./examen.model.js";
import Usuario from "./usuario.model.js";

Usuario.hasMany(Log, {
    foreignKey: 'usuario_id',
    sourceKey: 'id'
})
Log.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    sourceKey: 'id'
})

Examen.hasMany(Aspirante, {
    foreignKey: 'examen_id', 
    sourceKey: 'id_examen'   
});

Aspirante.belongsTo(Examen, {
    foreignKey: 'examen_id', 
    targetKey: 'id_examen'   
});

export {Aspirante, Examen, Usuario, Log};

