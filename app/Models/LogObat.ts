import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Obat from './Obat'

export default class LogObat extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public kd_obat_baru: string

    @column()
    public nm_obat_baru: string

    @column()
    public bentuk_obat_baru: string

    @column()
    public tgl_prod_baru: Date

    @column()
    public tgl_exp_baru: Date

    @column()
    public harga_baru: number

    @column()
    public obat_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Obat, {
        foreignKey: 'obat_id'
    })
    public obat: BelongsTo<typeof Obat>
}
