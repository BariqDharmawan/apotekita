import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Persediaan from 'App/Models/Persediaan'

export default class PersediaanSeederSeeder extends BaseSeeder {
    public async run() {
        for (let i = 1; i <= 5; i++) {
            await Persediaan.create({
                jumlah: 100,
                obat_id: i,
            })
        }
    }
}
