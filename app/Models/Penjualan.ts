import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Penjualan extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public kd_obat_penjualan: String

    @column()
    public tgl_trans_penjualan: Date

    @column()
    public jumlah_penjualan: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
