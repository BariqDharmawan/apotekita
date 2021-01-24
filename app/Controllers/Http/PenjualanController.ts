import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Obat from 'App/Models/Obat'
import Penjualan from 'App/Models/Penjualan'
import Persediaan from 'App/Models/Persediaan'
import { DateTime, Info } from 'luxon'

export default class PenjualanController {

    public async index({ view, response }: HttpContextContract) {
        const daftarPenjualan = await Penjualan.all(),
            listMonth = Info.months('2-digit'),
            listMontName = Info.months('long'),
            listObat = await Obat.query().preload('persediaan')

        // response.json(listObat)
        return view.render('transaksi/index', {
            daftarPenjualan, listMonth, listMontName, listObat
        })
    }

    public async store({ request, response }: HttpContextContract) {
        const obat = await Obat.findByOrFail(
            'kd_obat', request.input('kd_obat')
        )
        await obat.preload('persediaan')
        response.json(obat)

        await request.validate({
            schema: schema.create({
                tgl_transaksi: schema.date(),
                jumlah_beli: schema.number([
                    rules.required()
                ]),
                kd_obat: schema.string({}, [
                    rules.exists({ table: 'obat', column: 'kd_obat' })
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
        updatePersediaan.jumlah = updatePersediaan.jumlah - jumlah_beli
        await updatePersediaan.save()

        // response.json([tambahPenjualan, updatePersediaan])
        response.redirect().back()
    }

    public async update({ request, response, params }: HttpContextContract) {

        await request.validate({
            schema: schema.create({
                kode: schema.string({}, [
                    rules.maxLength(25),
                ]),
                tgl_transaksi: schema.date(),
                jumlah_beli: schema.number([
                    rules.range(0, jumlahPersediaan.jumlah)
                ]),
                kd_obat: schema.string({}, [
                    rules.exists({ table: 'obat', column: 'kd_obat' })
                ])
            }),
            reporter: validator.reporters.jsonapi
        })

        const tambahPenjualan = await Penjualan.findOrFail(params.id)
        tambahPenjualan.waktu_transaksi = request.input('tgl_transaksi')
        tambahPenjualan.jumlah_beli = Number(request.input('jumlah_beli'))
        tambahPenjualan.obatId = request.input('kd_obat')
        await tambahPenjualan.save()

        response.json(tambahPenjualan)

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

        return view.render('transaksi/bulanan', { filterPenjualan, namaBulan })
    }

}
