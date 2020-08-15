'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpleadosSchema extends Schema {
  up () {
    this.create('empleados', (table) => {
      table.increments()
      table.string('nombre')
      table.string('apellido_p')
      table.string('apellido_m')
      table.string('sexo')
      table.string('telefono')
      table.string('direccion')
      table.string('correo')
      //table.integer('empresa').notNullable().unsigned().references('id').inTable('empresas')
      table.timestamps()
    })
  }

  down () {
    this.drop('empleados')
  }
}

module.exports = EmpleadosSchema
