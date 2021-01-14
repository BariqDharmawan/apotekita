import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DeleteObatTriggerTransaksis extends BaseSchema {
  protected tableName = 'delete_obat_trigger_transaksis'

  public async up () {
    await Database.raw(
        ``
    )
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
