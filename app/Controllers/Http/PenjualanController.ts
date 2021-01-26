import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Obat from 'App/Models/Obat'
import Penjualan from 'App/Models/Penjualan'
import Persediaan from 'App/Models/Persediaan'
import { DateTime, Info } from 'luxon'

export default class PenjualanController {

    public async index({ view, response }: HttpContextContract) {
        const pageName = 'report penjualan'
        const daftarPenjualan = await Penjualan.query().preload('obat'),
            listMonth = Info.months('2-digit'),
            listMontName = Info.months('long'),
            listObat = await Obat.query().preload('persediaan')

        // response.json(listObat)
        return view.render('penjualan/index', {
            pageName, daftarPenjualan, listMonth, listMontName, listObat
        })
    }

    public async store({ request, response }: HttpContextContract) {
        const obat = await Obat.findByOrFail(
            'kode', request.input('kd_obat')
        )
        await obat.preload('persediaan')

        await request.validate({
            schema: schema.create({
                tgl_transaksi: schema.date(),
                jumlah_beli: schema.number([
                    rules.required()
                ]),
                kd_obat: schema.string({}, [
                    rules.exists({ table: 'obat', column: 'kode' })
                ])
            }),
            reporter: validator.reporters.jsonapi
        })

        const jumlah_beli = Number(request.input('jumlah_beli'))

        const tambahPenjualan = new Penjualan()
        tambahPenjualan.kode = 'kd-penjualan-' + DateTime.local().toFormat('dd-LL-yyyy-HH-mm-ss')
        tambahPenjualan.waktu_transaksi = request.input('tgl_transaksi')

        tambahPenjualan.bulan = new Date(request.input('tgl_transaksi')).getMonth() + 1
        tambahPenjualan.tanggal = new Date(request.input('tgl_transaksi')).getDate()
        tambahPenjualan.tahun = new Date(request.input('tgl_transaksi')).getFullYear()

        tambahPenjualan.jumlah_beli = jumlah_beli
        tambahPenjualan.obat_id = obat.id
        await tambahPenjualan.save()

        const updatePersediaan = await Persediaan.findByOrFail('obat_id', obat.id)
        updatePersediaan.jumlah = Number(updatePersediaan.jumlah) - jumlah_beli
        await updatePersediaan.save()

        response.redirect().back()
    }

    public async filterBulan({ view, params, response }: HttpContextContract) {
        const listBulan = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'July', 'Agustus',
            'September', 'Oktober', 'November', 'Desember'
        ]

        const namaBulan = listBulan[params.bulan.replace(/^0/, '') - 1]
        const filterPenjualan = await Penjualan.query().where(
            'bulan', params.bulan.replace(/^0/, '')
        ).preload('obat')

        const pageName = `report penjualan bulan ${namaBulan}`

        return view.render('penjualan/bulanan', { pageName, filterPenjualan, namaBulan })
    }

}
