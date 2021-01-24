import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Penjualan from 'App/Models/Penjualan'

export default class PenjualanSeederSeeder extends BaseSeeder {
    public async run() {
        for (let i = 0; i < 11; i++) {
            const tambahPenjualan = new Penjualan()
            tambahPenjualan.waktu_transaksi = new Date('2021-01-15')
            tambahPenjualan.jumlah_beli = 1
            tambahPenjualan.obatId = i
            await tambahPenjualan.save()
        }
    }
}
