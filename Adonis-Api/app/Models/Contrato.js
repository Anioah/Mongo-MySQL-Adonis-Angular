'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contrato extends Model {

    static mongoose = require('mongoose');

    static Schema = this.mongoose.Schema;

    static ContratosSchema =  new this.Schema({
    _id: this.Schema.Types.ObjectId,
    empleado_id: this.Schema.Types.Number,
    duracion_contrato: this.Schema.Types.String,
    puesto: this.Schema.Types.String,
    sueldo: this.Schema.Types.Number,
    nombre_empresa: this.Schema.Types.String
  });

  static ContratosMongo = this.mongoose.model('contratos',this.ContratosSchema);

    
}
module.exports = Contrato
