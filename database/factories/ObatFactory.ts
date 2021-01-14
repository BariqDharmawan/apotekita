import Factory from '@ioc:Adonis/Lucid/Factory'
import Obat from 'App/Models/Obat'

const bentuk = ['salep', 'syrup', 'kaplet', 'tablet']

export const ObatFactory = Factory
    .define(Obat, ({ faker }) => {
        return {
            kd_obat: 'als' + Date.now(),
            nm_obat: 'obat ' + Math.round(Math.random() * 100),
            bentuk_obat: bentuk[Math.floor(Math.random() * bentuk.length)],
            tgl_prod: '2021-01-19',
            tgl_exp: '2021-01-19',
            harga: Math.random() * 1000
        }
    })
    .build()