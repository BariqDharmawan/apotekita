import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Penjualan from 'App/Models/Penjualan'
import Persediaan from 'App/Models/Persediaan'
import { DateTime } from 'luxon'

export default class PenjualanController {
    public async index({ view }: HttpContextContract) {
        const daftarPenjualan = await Penjualan.all()
        return view.render('transaksi/index')
    }

    public async store({ request, response }: HttpContextContract) {
        const kdObat = request.input('kd_obat')
        const jumlahPersediaan = await Persediaan.findByOrFail('kd_obat', kdObat)

        await request.validate({
            schema: schema.create({
                tgl_transaksi: schema.date(),
                jumlah_beli: schema.number([
                    rules.range(0, jumlahPersediaan.jumlah_persediaan)
                ]),
                kd_obat: schema.string({}, [
                    rules.exists({ table: 'obat', column: 'kd_obat' })
                ])
            }),
            reporter: validator.reporters.jsonapi
        })

        const jumlahBeli = Number(request.input('jumlah_beli'))
        const tambahPenjualan = new Penjualan()
        tambahPenjualan.kode = DateTime.local().toFormat('dd_LL_yyyy_HH_mm_ss') + '_' + kdObat
        tambahPenjualan.tgl_transaksi = request.input('tgl_transaksi')
        tambahPenjualan.jumlah_beli = jumlahBeli
        tambahPenjualan.kd_obat = kdObat
        await tambahPenjualan.save()

        const updatePersediaan = await Persediaan.findByOrFail('kd_obat', kdObat)
        updatePersediaan.jumlah_persediaan = updatePersediaan.jumlah_persediaan - jumlahBeli
        await updatePersediaan.save()

        response.json(tambahPenjualan)
        response.json(updatePersediaan)
    }

    public async edit({ }: HttpContextContract) {
    }

    public async update({ request, response, params }: HttpContextContract) {
        const jumlahPersediaan = await Persediaan.findByOrFail('kd_obat', request.input('kd_obat'))
        await request.validate({
            schema: schema.create({
                kode: schema.string({}, [
                    rules.maxLength(25),
                ]),
                tgl_transaksi: schema.date(),
                jumlah_beli: schema.number([
                    rules.range(0, jumlahPersediaan.jumlah_persediaan)
                ]),
                kd_obat: schema.string({}, [
                    rules.exists({ table: 'obat', column: 'kd_obat' })
                ])
            }),
            reporter: validator.reporters.jsonapi
        })

        const tambahPenjualan = await Penjualan.findOrFail(params.id)
        tambahPenjualan.kode = request.input('kode')
        tambahPenjualan.tgl_transaksi = request.input('tgl_transaksi')
        tambahPenjualan.jumlah_beli = Number(request.input('jumlah_beli'))
        tambahPenjualan.kd_obat = request.input('kd_obat')
        await tambahPenjualan.save()

        response.json(tambahPenjualan)

    }

}
