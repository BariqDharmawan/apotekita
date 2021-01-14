import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ObatFactory } from 'Database/factories/ObatFactory'

export default class ObatSeederSeeder extends BaseSeeder {
    public async run() {
        await ObatFactory.createMany(10)
    }
}
