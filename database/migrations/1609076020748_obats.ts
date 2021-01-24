import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Obats extends BaseSchema {
    protected tableName = 'obat'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('kd_obat').notNullable()
            table.string('nm_obat').notNullable()
            table.enum('bentuk_obat', ['salep', 'syrup', 'kaplet', 'tablet']).notNullable()
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