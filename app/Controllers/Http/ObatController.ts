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
        tambahPersediaan.jumlah_baru = jumlahPersediaan
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

        const obatLama = await Obat.findOrFail(params.id)
        const kdObatLama = obatLama.kd_obat,
            nmObatLama = obatLama.nm_obat,
            bentukLama = obatLama.bentuk_obat,
            hargaLama = obatLama.harga

        const kdObatBaru = request.input('kd_obat'),
            nmObatBaru = request.input('nm_obat'),
            bentukBaru = request.input('bentuk_obat'),
            hargaBaru = request.input('harga')

        obatLama.kd_obat = kdObatBaru
        obatLama.nm_obat = nmObatBaru
        obatLama.bentuk_obat = bentukBaru
        obatLama.harga = hargaBaru
        await obatLama.save()

        const logObat = new LogObat()
        if (kdObatLama !== kdObatBaru) {
            logObat.kd_obat_baru = kdObatBaru
        }
        if (nmObatLama !== nmObatBaru) {
            logObat.nm_obat_baru = nmObatBaru
        }
        if (bentukLama !== bentukBaru) {
            logObat.bentuk_obat_baru = bentukBaru
        }
        if (hargaLama !== hargaBaru) {
            logObat.harga_baru = hargaBaru
        }
        logObat.obat_id = obatLama.id
        await logObat.save()


    }

    public async destroy({ response, params }: HttpContextContract) {
        const hapusObat = await Obat.findByOrFail('kd_obat', params.kode)
        await hapusObat.delete()

        response.redirect().back()
    }

}
