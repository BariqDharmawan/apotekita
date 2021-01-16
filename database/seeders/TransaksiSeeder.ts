import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Penjualan from 'App/Models/Penjualan'

export default class TransaksiSeederSeeder extends BaseSeeder {
    public async run() {
        for (let i = 0; i < 11; i++) {
            await Penjualan.create({
                kode: `kode-transaksi-${i}`,
                waktu_transaksi: new Date('2021-01-15'),
                tahun: 2021,
                bulan: '01',
                tanggal: 15,
                jumlah_beli: 1,
                kd_obat: `kode-obat${i}`,
            })
        }
    }
}
