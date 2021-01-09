import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Persediaans extends BaseSchema {
    protected tableName = 'persediaan'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.bigInteger('jumlah_persediaan').notNullable()
            table.string('kd_obat').notNullable()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
