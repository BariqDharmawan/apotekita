import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Obat from 'App/Models/Obat'
import Persediaan from 'App/Models/Persediaan'

export default class ObatController {

    public async index({ response, view }: HttpContextContract) {

        const obatTidakKadaluarsa = await Obat.query()
            .where('tgl_exp', '>', new Date().toISOString())
        const obatKadaluarsa = await Obat.query().where('tgl_exp', '<', new Date().toISOString())

        return view.render('obat/index', { obatKadaluarsa, obatTidakKadaluarsa })
    }

    public async store({ request, response }: HttpContextContract) {
        const hargaMaks = 999999999, hargaMin = 1000
        // response.json(request.all())
        await request.validate({
            schema: schema.create({
                kd_obat: schema.string({}, [
                    rules.required(),
                    rules.maxLength(25),
                ]),
                nm_obat: schema.string({ trim: true }, [
                    rules.required(),
                    rules.maxLength(25),
                ]),
                bentuk_obat: schema.enum(['salep', 'syrup', 'kaplet', 'tablet'] as const),
                tgl_prod: schema.date({}, [
                    rules.required(),
                ]),
                tgl_exp: schema.date({}, [
                    rules.required(),
                ]),
                harga: schema.number([
                    rules.required(),
                    rules.unsigned(),
                    rules.range(hargaMin, hargaMaks)
                ]),
                jumlah_persediaan: schema.number([
                    rules.required(),
                    rules.unsigned(),
                    rules.range(1, 9999)
                ])
            }),
            messages: {
                'nm_obat.alpha': 'Nama obat should be only contain letter, space, and dash',
                'harga.range': `Harga minimal obat adalah ${hargaMin} dan maksimal ${hargaMaks}`
            },
            reporter: validator.reporters.jsonapi
        })

        const tambahObat = new Obat()
        tambahObat.kd_obat = request.input('kd_obat')
        tambahObat.nm_obat = request.input('nm_obat')
        tambahObat.bentuk_obat = request.input('bentuk_obat')
        tambahObat.tgl_prod = request.input('tgl_prod')
        tambahObat.tgl_exp = request.input('tgl_exp')
        tambahObat.harga = request.input('harga')


        const tambahPersediaan = new Persediaan()
        tambahPersediaan.jumlah = request.input('jumlah_persediaan')
        await tambahObat.related('persediaan').save(tambahPersediaan)

        response.redirect().back()
    }

    public async edit({ view, params }: HttpContextContract) {
        const obat = await Obat.query()
            .preload('persediaan')
            .where('kd_obat', params.id).firstOrFail()

        return view.render('obat/edit', { obat: obat })
    }

    public async show({ view, request }: HttpContextContract) {
        const query = request.input('obat')
        const cariObat = await Obat.query().preload('persediaan')
            .where('kd_obat', 'LIKE', '%' + query + '%')
            .orWhere('nm_obat', 'LIKE', '%' + query + '%')

        return view.render('obat/cari', { cariObat, query })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const hapusObat = await Obat.findByOrFail('kd_obat', params.id)
        await hapusObat.delete()

        response.redirect().back()
    }

}
