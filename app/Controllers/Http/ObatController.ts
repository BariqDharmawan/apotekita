import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import LogObat from 'App/Models/LogObat'
import Obat from 'App/Models/Obat'
import Persediaan from 'App/Models/Persediaan'

export default class ObatController {

    public async index({ response, view }: HttpContextContract) {

        const obatTidakKadaluarsa = await Obat.query()
            .where('tgl_exp', '>', new Date().toISOString()).preload('persediaan')
        const obatKadaluarsa = await Obat.query()
            .where('tgl_exp', '<', new Date().toISOString()).preload('persediaan')
        const logObat = await LogObat.query().preload('obat', (query) => {
            query.preload('persediaan')
        })

        return view.render('obat/index', { obatKadaluarsa, obatTidakKadaluarsa, logObat })
    }

    public async store({ request, response }: HttpContextContract) {
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
                ]),
                jumlah_persediaan: schema.number([
                    rules.required(),
                    rules.unsigned(),
                    rules.range(1, 9999)
                ])
            }),
            messages: {
                'nm_obat.alpha': 'Nama obat should be only contain letter, space, and dash',
                'harga.range': `Harga minimal obat adalah ${1000} dan maksimal ${9999999}`
            },
            reporter: validator.reporters.jsonapi
        })

        const jumlahPersediaan = request.input('jumlah_persediaan')

        const tambahObat = new Obat()
        tambahObat.kd_obat = request.input('kd_obat')
        tambahObat.nm_obat = request.input('nm_obat')
        tambahObat.bentuk_obat = request.input('bentuk_obat')
        tambahObat.tgl_prod = request.input('tgl_prod')
        tambahObat.tgl_exp = request.input('tgl_exp')
        tambahObat.harga = request.input('harga')

        const tambahPersediaan = new Persediaan()
        tambahPersediaan.jumlah_lama = jumlahPersediaan
        await tambahObat.related('persediaan').save(tambahPersediaan)

        response.redirect().toRoute('obat.index')
    }

    public async edit({ view, params }: HttpContextContract) {
        const obat = await Obat.query()
            .preload('persediaan')
            .where('kd_obat', params.id).firstOrFail()

        return view.render('obat/edit', { obat: obat })
    }

    public async show({ view, request, params }: HttpContextContract) {
        const query = request.input('obat')
        const cariObat = await Obat.query().preload('persediaan')
            .where('kd_obat', 'LIKE', '%' + query + '%')
            .orWhere('nm_obat', 'LIKE', '%' + query + '%')

        return view.render('obat/cari', { cariObat, query })
    }

    public async update({ request, params, response }: HttpContextContract) {
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
                ]),
            }),
            messages: {
                'nm_obat.alpha': 'Nama obat should be only contain letter, space, and dash',
                'harga.range': `Harga minimal obat adalah ${1000} dan maksimal ${9999999}`
            },
            reporter: validator.reporters.jsonapi
        })

        const obat = await Obat.findOrFail(params.id)
        const kdObatLama = obat.kd_obat,
            nmObatLama = obat.nm_obat,
            bentukLama = obat.bentuk_obat,
            hargaLama = obat.harga

        const kdObatBaru = request.input('kd_obat'),
            nmObatBaru = request.input('nm_obat'),
            bentukBaru = request.input('bentuk_obat'),
            hargaBaru = Number(request.input('harga'))

        const logObat = new LogObat()
        if (kdObatLama !== kdObatBaru) {
            obat.kd_obat = kdObatBaru

            logObat.kd_obat_lama = kdObatLama
            logObat.kd_obat_baru = kdObatBaru
        }
        if (nmObatLama !== nmObatBaru) {
            obat.nm_obat = nmObatBaru

            logObat.nm_obat_lama = nmObatLama
            logObat.nm_obat_baru = nmObatBaru
        }
        if (bentukLama !== bentukBaru) {
            obat.bentuk_obat = bentukBaru

            logObat.bentuk_obat_lama = bentukLama
            logObat.bentuk_obat_baru = bentukBaru
        }
        if (hargaLama !== hargaBaru) {
            obat.harga = hargaBaru

            logObat.harga_lama = hargaLama
            logObat.harga_baru = hargaBaru
        }

        logObat.obat_id = obat.id
        await logObat.save()
        await obat.save()

        response.redirect().back()


    }

    public async destroy({ response, params }: HttpContextContract) {
        const obat = await Obat.findByOrFail('kd_obat', params.kode)

        await LogObat.query().where('obat_id', obat.id).delete()
        await Persediaan.query().where('obat_id', obat.id).delete()
        await obat.delete()

        response.redirect().back()
    }

}
