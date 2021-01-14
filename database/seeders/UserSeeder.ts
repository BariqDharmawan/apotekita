import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ObatFactory } from 'Database/factories/ObatFactory'

export default class UserSeederSeeder extends BaseSeeder {
    public async run() {
        const users = await ObatFactory.createMany(10)
    }
}
