import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Obat from 'App/Models/Obat'
import Persediaan from 'App/Models/Persediaan'

export default class PersediaanController {
    public async index({ view, response }: HttpContextContract) {
        const namaSemuaObat = await Obat.query().where('tgl_exp', '>', new Date().toISOString())
        const persediaanObat = await Persediaan.query().preload('obat')

        // await persediaanObat?.preload('obat')

        // response.json(persediaanObat)

        return view.render('persediaan/index', { persediaanObat, namaSemuaObat })
    }

    public async store({ request, response }: HttpContextContract) {
        await request.validate({
            schema: schema.create({
                kd_obat: schema.string({ trim: true }, [
                    rules.required(),
                    rules.exists({ table: 'obat', column: 'kd_obat' }),
                    rules.maxLength(100)
                ]),
                jumlah_persediaan: schema.number([
                    rules.required(),
                    rules.unsigned(),
                ]),
            }),
            reporter: validator.reporters.jsonapi
        })

        const tambahPersediaan = new Persediaan()
        tambahPersediaan.jumlah = request.input('jumlah')
        tambahPersediaan.obat_id = request.input('obat_id')

        await tambahPersediaan.save()
        response.redirect().back()
    }

    public async edit({ }: HttpContextContract) {
    }

    public async update({ }: HttpContextContract) {
    }
}
