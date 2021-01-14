import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Penjualan from 'App/Models/Penjualan'
import Persediaan from 'App/Models/Persediaan'
import { DateTime } from 'luxon'

const dateHariIni = new Date('2021-01-15')
export default class TransaksiSeederSeeder extends BaseSeeder {
    public async run() {
        for (let i = 0; i < 11; i++) {
            const tambahPenjualan = new Penjualan()
            tambahPenjualan.kode = DateTime.local().toFormat('dd_LL_yyyy_HH_mm_ss') + '_' +
                `kode-obat${i}`
            tambahPenjualan.tgl_transaksi = dateHariIni
            tambahPenjualan.tahun = '2021'
            tambahPenjualan.bulan = '01'
            tambahPenjualan.hari = '15'
            tambahPenjualan.jumlah_beli = 1
            tambahPenjualan.kd_obat = `kode-obat${i}`
            await tambahPenjualan.save()
        }
    }
}
