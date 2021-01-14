import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Obat from './Obat'

export default class Penjualan extends BaseModel {
    public static table = 'penjualan'
    public static hidden() {
        return ['tahun', 'bulan', 'hari']
    }

    @column()
    public kode: String

    @column()
    public tgl_transaksi: Date

    @column()
    public jumlah_beli: number

    @column()
    public kd_obat: String

    // @column()
    // public tahun: String

    // @column()
    // public bulan: String

    // @column()
    // public hari: String

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Obat, {
        localKey: 'kode',
        foreignKey: 'kd_obat'
    })
    public obat: BelongsTo<typeof Obat>
}