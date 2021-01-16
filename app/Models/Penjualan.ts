import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Obat from './Obat'

export default class Penjualan extends BaseModel {
    public static table = 'penjualan'
    public static hidden() {
        return ['tahun', 'bulan', 'hari']
    }

    @column({ isPrimary: true })
    public kode: string

    @column()
    public waktu_transaksi: Date

    @column()
    public jumlah_beli: number

    @column()
    public kd_obat: string

    @column()
    public tahun: number

    @column()
    public bulan: String

    @column()
    public tanggal: number

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