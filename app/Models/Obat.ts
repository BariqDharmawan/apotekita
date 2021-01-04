import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Persediaan from './Persediaan'

export default class Obat extends BaseModel {

    public static table = 'obat'

    public static primaryKey = 'kd_obat'

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

    @hasOne(() => Persediaan)
    public persediaan: HasOne<typeof Persediaan>

}
