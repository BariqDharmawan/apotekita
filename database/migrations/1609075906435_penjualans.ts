import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Penjualans extends BaseSchema {
    protected tableName = 'penjualan'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('kd_obat_penjualan').notNullable()
            table.date('tgl_trans_penjualan').notNullable()
            table.bigInteger('jumlah_penjualan').notNullable()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
