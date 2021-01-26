import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Obat from 'App/Models/Obat'

export default class ObatSeederSeeder extends BaseSeeder {
    public async run() {

        await Obat.createMany([
            {
                kode: 'SLMNZ1520',
                nama: 'MICONAZOLE',
                bentuk: 'salep',
                tgl_prod: new Date('2015-09-15'),
                tgl_exp: new Date('2020-12-09'),
                harga: 18000
            },
            {
                kode: 'SRSCF1723',
                nama: 'SUCRALFATE',
                bentuk: 'SYRUP',
                tgl_prod: new Date('2017-03-13'),
                tgl_exp: new Date('2023-04-20'),
                harga: 62500
            },
            {
                kode: 'SRZNP1723',
                nama: 'ZINCPRO',
                bentuk: 'SYRUP',
                tgl_prod: new Date('2017-02-02'),
                tgl_exp: new Date('2023-01-31'),
                harga: 15000
            },
            {
                kode: 'KPRNS1723',
                nama: 'RHINNOS',
                bentuk: 'KAPLET',
                tgl_prod: new Date('2017-02-02'),
                tgl_exp: new Date('2023-01-31'),
                harga: 45000
            },
            {
                kode: 'TBALD1723',
                nama: 'AMLODIPINE',
                bentuk: 'TABLET',
                tgl_prod: new Date('2017-02-02'),
                tgl_exp: new Date('2023-01-31'),
                harga: 51000
            }
        ])

    }
}
