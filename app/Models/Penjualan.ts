import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Obat from './Obat'

export default class Penjualan extends BaseModel {

    public static table = 'penjualan'
    public static primaryKey = 'id'

    // public static hidden() {
    //     return ['tahun', 'bulan', 'hari']
    // }

    @column()
    public id: number

    @column()
    public kode: string

    @column()
    public waktu_transaksi: Date

    @column()
    public jumlah_beli: number

    @column()
    public obat_id: number

    @column()
    public tahun: number

    @column()
    public bulan: number

    @column()
    public tanggal: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Obat, {
        foreignKey: 'obat_id'
    })
    public obat: BelongsTo<typeof Obat>
}