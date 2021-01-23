import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Obat from 'App/Models/Obat'

const bentuk = ['salep', 'syrup', 'kaplet', 'tablet']

export default class ObatSeederSeeder extends BaseSeeder {
    public async run() {
        for (let i = 0; i < 11; i++) {
            await Obat.create({
                kd_obat: `kode-obat${i}`,
                nm_obat: `nama obat${i}`,
                bentuk_obat: bentuk[Math.floor(Math.random() * bentuk.length)],
                tgl_prod: new Date('2020-01-19'),
                tgl_exp: new Date('2021-01-19'),
                harga: Math.random() * 1000 * 1000
            })
        }
    }
}
