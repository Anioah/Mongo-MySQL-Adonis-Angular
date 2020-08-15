'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpresasSchema extends Schema {
  up () {
    this.create('empresas', (table) => {
      table.increments()
      table.string('nombre')
      table.string('rfc')
      table.string('direccion')
      table.string('telefono')
      table.timestamps()
    })
  }

  down () {
    this.drop('empresas')
  }
}

module.exports = EmpresasSchema
