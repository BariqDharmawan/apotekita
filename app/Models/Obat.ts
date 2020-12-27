import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Obat extends BaseModel {
    static get table() {
        return 'obat'
    }

    @column({ isPrimary: true })
    public id: number

    @column()
    public kd_obat: String

    @column()
    public nm_obat: String

    @column()
    public bentuk_obat: String

    @column()
    public tgl_prod: Date

    @column()
    public tgl_exp: Date

    @column()
    public harga: number


    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
