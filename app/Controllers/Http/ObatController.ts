import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Obat from 'App/Models/Obat'
import Persediaan from 'App/Models/Persediaan'

export default class ObatController {

    public async index({ view }: HttpContextContract) {
        const semuaObat = await Obat.query().preload('persediaan')
        return view.render('obat/index', { semuaObat })
    }

    public async store({ request, response }: HttpContextContract) {
        await request.validate({
            schema: schema.create({
                kd_obat: schema.string({}, [
                    rules.maxLength(25),
                ]),
                nm_obat: schema.string({}, [
                    rules.maxLength(25),
                ]),
                bentuk_obat: schema.enum(['salep', 'syrup', 'kaplet', 'tablet'] as const),
                tgl_prod: schema.date({}, [
                    rules.before('today'),
                    rules.beforeField('tgl_exp')
                ]),
                tgl_exp: schema.date({}, [
                    rules.after('today'),
                    rules.afterField('tgl_prod')
                ]),
                harga: schema.number([
                    rules.unsigned()
                ])
            }),
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

        response.redirect().toRoute('obat.index')
    }

    public async edit({ view, params, response }: HttpContextContract) {
        const obat = await Obat.query()
            .preload('persediaan')
            .where('kd_obat', params.id).firstOrFail()

        // response.json(obat)
        return view.render('obat/edit', { obat: obat })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const hapusObat = await Obat.findByOrFail('kd_obat', params.id)
        await hapusObat.delete()

        response.json(`berhasil hapus obat dengan kode ${params.id}`)
    }

    public async persediaan({ view }: HttpContextContract) {
        return view.render('obat/persediaan')
    }

}
