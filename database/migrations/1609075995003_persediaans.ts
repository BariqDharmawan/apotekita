import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Persediaans extends BaseSchema {
    protected tableName = 'persediaan'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.integer('jumlah').notNullable()
            table.integer('obat_id').notNullable()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
