import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Persediaan from 'App/Models/Persediaan'

export default class PersediaanSeederSeeder extends BaseSeeder {
    public async run() {
        for (let i = 0; i < 11; i++) {
            await Persediaan.create({
                kd_obat: `kode-obat${i}`,
                jumlah_persediaan: Math.round(Math.random() * 100),
            })
        }
    }
}