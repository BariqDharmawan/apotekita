import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Persediaan extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public kd_obat_persediaan: String

    @column()
    public jumlah_persediaan: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
