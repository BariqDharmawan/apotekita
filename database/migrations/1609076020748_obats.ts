import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Obats extends BaseSchema {
    protected tableName = 'obat'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('kode').notNullable()
            table.string('nama').notNullable()
            table.enum('bentuk', ['salep', 'syrup', 'kaplet', 'tablet']).notNullable()
            table.date('tgl_prod').nullable()
            table.date('tgl_exp').nullable()
            table.bigInteger('harga').notNullable()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}