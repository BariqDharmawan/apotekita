import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Persediaans extends BaseSchema {
    protected tableName = 'persediaan'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('kd_obat_persediaan', 20).notNullable()
            table.bigInteger('jumlah_persediaan').notNullable()
            table.integer('obat_id').unsigned()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
