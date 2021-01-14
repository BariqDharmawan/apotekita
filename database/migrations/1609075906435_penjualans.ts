import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Penjualans extends BaseSchema {
    protected tableName = 'penjualan'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('kode').notNullable()
            table.string('kd_obat').notNullable()
            table.date('tgl_transaksi').notNullable()
            // ini kebutuhan filter tgl, di ui engga dimunculin
            table.string('tahun').nullable()
            table.string('bulan').nullable()
            table.string('hari').nullable()
            // end of that
            table.bigInteger('jumlah_beli').notNullable()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
