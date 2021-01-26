import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LogObats extends BaseSchema {
    protected tableName = 'log_obat'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('obat_id').notNullable()
            table.string('kd_obat_lama').nullable()
            table.string('kd_obat_baru').nullable()
            table.string('nm_obat_lama').nullable()
            table.string('nm_obat_baru').nullable()
            table.enum('bentuk_obat_lama', ['salep', 'syrup', 'kaplet', 'tablet']).nullable()
            table.enum('bentuk_obat_baru', ['salep', 'syrup', 'kaplet', 'tablet']).nullable()
            table.integer('harga_lama').nullable()
            table.bigInteger('harga_baru').nullable()
            table.integer('persediaan_lama').nullable()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
