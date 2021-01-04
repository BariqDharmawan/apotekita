import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import moment from 'moment'

export default class Obats extends BaseSchema {
    protected tableName = 'obat'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('kd_obat', 25).notNullable().primary()
            table.string('nm_obat', 25).notNullable()
            table.enum('bentuk_obat', ['SALEP', 'SYRUP', 'KAPLET', 'TABLET']).notNullable()
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
