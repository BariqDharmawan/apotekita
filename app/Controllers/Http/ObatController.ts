import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Obat from 'App/Models/Obat'
import Persediaan from 'App/Models/Persediaan'

export default class ObatController {

    public async index({ view, response }: HttpContextContract) {
        const tanggalHariIni = new Date().toISOString()
        const obatTidakKadaluarsa = await Obat.query().preload('persediaan')
                                            .where('tgl_exp', '>', tanggalHariIni)
        const obatKadaluarsa = await Obat.query().preload('persediaan')
                                        .where('tgl_exp', '<', tanggalHariIni)

        response.json({
            'obatTidakKadaluarsa': obatTidakKadaluarsa,
            'obatKadaluarsa': obatKadaluarsa
        })
        // return view.render('obat/index', { semuaObat })
    }

    public async store({ request, response }: HttpContextContract) {
        const hargaMaks = 999999999, hargaMin = 1000
        await request.validate({
            schema: schema.create({
                kd_obat: schema.string({}, [
                    rules.required(),
                    rules.maxLength(25),
                ]),
                nm_obat: schema.string({}, [
                    rules.required(),
                    rules.maxLength(25),
                    rules.alpha({
                        allow: ['space', 'dash']
                    })
                ]),
                bentuk_obat: schema.enum(['salep', 'syrup', 'kaplet', 'tablet'] as const),
                tgl_prod: schema.date({}, [
                    rules.required(),
                    rules.before('today'),
                    rules.beforeField('tgl_exp')
                ]),
                tgl_exp: schema.date({}, [
                    rules.required(),
                    rules.after('today'),
                    rules.afterField('tgl_prod')
                ]),
                harga: schema.number([
                    rules.required(),
                    rules.unsigned(),
                    rules.range(hargaMin, hargaMaks)
                ])
            }),
            messages: {
                'nm_obat.alpha': 'Nama obat should be only contain letter, space, and dash',
                'harga.range': `Harga minimal obat adalah ${hargaMin} dan maksimal ${hargaMaks}`
            },
            reporter: validator.reporters.jsonapi
        })

        await Obat.updateOrCreate(
            { kd_obat: request.input('kd_obat') },
            {
                nm_obat: request.input('nm_obat'),
                bentuk_obat: request.input('bentuk_obat'),
                tgl_prod: request.input('tgl_prod'),
                tgl_exp: request.input('tgl_exp'),
                harga: request.input('harga')
            }
        )

        const tambahPersediaan = new Persediaan()
        tambahPersediaan.kd_obat = request.input('kd_obat')
        tambahPersediaan.jumlah_persediaan = request.input('jumlah_persediaan')

        await tambahPersediaan.save()

        response.redirect().back()
    }

    public async edit({ view, params, response }: HttpContextContract) {
        const obat = await Obat.query()
            .preload('persediaan')
            .where('kd_obat', params.id).firstOrFail()

        return view.render('obat/edit', { obat: obat })
    }

    public async show({ response, view, params }: HttpContextContract) {
        const cariObat = await Obat.query().preload('persediaan')
            .where('kd_obat', 'LIKE', params.kd_obat)

        response.json(cariObat)
        // return view.render('obat/index', { cariObat })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const hapusObat = await Obat.findByOrFail('kd_obat', params.id)
        await hapusObat.delete()

        response.json(`berhasil hapus obat dengan kode ${params.id}`)

        // response.redirect().back()
    }

    public async persediaan({ view, response }: HttpContextContract) {
        const persediaanObat = await Persediaan.query().preload('obat')
        response.json(persediaanObat)
        // return view.render('obat/persediaan')
    }

}
