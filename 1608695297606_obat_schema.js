'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ObatSchema extends Schema {
  up () {
    this.create('obats', (table) => {
      table.increments()
      table.string('kd_obat', 25).notNullable()
      table.string('nm_obat', 25).notNullable()
      table.string('bentuk_obat', 25).notNullable()
      table.date('tgl_prod').notNullable()
      table.date('tgl_exp').notNullable()
      table.bigInteger('harga', 10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('obats')
  }
}

module.exports = ObatSchema
