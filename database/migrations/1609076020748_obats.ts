import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Obats extends BaseSchema {
    protected tableName = 'obat'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('kd_obat', 25).notNullable()
            table.string('nm_obat', 25).notNullable()
            table.enum('bentuk_obat', ['SALEP', 'SYRUP', 'KAPLET', 'TABLET']).notNullable()
            table.date('tgl_prod').notNullable()
            table.date('tgl_exp').notNullable()
            table.bigInteger('harga').notNullable()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
