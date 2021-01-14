import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Obat from 'App/Models/Obat'

export default class ObatSeederSeeder extends BaseSeeder {
    public async run() {
        await Obat.createMany([

        ])
    }
}
