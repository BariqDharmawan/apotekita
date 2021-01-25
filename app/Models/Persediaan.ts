import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Obat from './Obat'

export default class Persediaan extends BaseModel {

    public static table = 'persediaan'
    public static primaryKey = 'id'

    @column()
    public id: number

    @column()
    public jumlah_baru: number

    @column()
    public jumlah_lama: number

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
