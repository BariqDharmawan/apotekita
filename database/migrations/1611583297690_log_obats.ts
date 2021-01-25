import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LogObats extends BaseSchema {
    protected tableName = 'log_obat'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('obat_id').notNullable()
            table.string('kd_obat_baru').nullable()
            table.string('nm_obat_baru').nullable()
            table.enum('bentuk_obat_baru', ['salep', 'syrup', 'kaplet', 'tablet']).nullable()
            table.date('tgl_prod_baru').nullable()
            table.date('tgl_exp_baru').nullable()
            table.bigInteger('harga_baru').nullable()
            table.timestamps(true)
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}