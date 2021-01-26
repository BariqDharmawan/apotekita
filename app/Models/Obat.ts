import { DateTime } from 'luxon'
import {
    BaseModel, column, HasMany, hasMany, hasOne, HasOne
} from '@ioc:Adonis/Lucid/Orm'
import Persediaan from './Persediaan'
import Penjualan from './Penjualan'
import LogObat from './LogObat'

export default class Obat extends BaseModel {

    public static table = 'obat'

    @column({ isPrimary: true })
    public id: number

    @column()
    public kd_obat: string

    @column()
    public nm_obat: string

    @column()
    public bentuk_obat: string

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

    @hasOne(() => Persediaan, {
        foreignKey: 'obat_id'
    })
    public persediaan: HasOne<typeof Persediaan>

    @hasOne(() => LogObat, {
        foreignKey: 'obat_id'
    })
    public logObat: HasOne<typeof LogObat>

    @hasMany(() => Penjualan)
    public penjualan: HasMany<typeof Penjualan>

}
