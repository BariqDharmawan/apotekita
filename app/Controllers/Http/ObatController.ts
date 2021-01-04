import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Obat from 'App/Models/Obat'

export default class ObatController {

    public async index({ view }: HttpContextContract) {
        const semuaObat = await Obat.query().where('tgl_exp', '>', new Date().toISOString().substring(0, 10))
        return view.render('obat.index', { semuaObat })
    }

    public async store({ request, response }: HttpContextContract) {
        await Obat.updateOrCreate(
            {
                kd_obat: request.input('kd_obat')
            },
            {
                nm_obat: request.input('nm_obat'),
                bentuk_obat: request.input('bentuk_obat'),
                tgl_prod: request.input('tgl_prod'),
                tgl_exp: request.input('tgl_exp'),
                harga: request.input('harga')
            }
        )

        response.redirect().toRoute('obat.index')
    }

    public async show({ }: HttpContextContract) {
    }

    public async edit({ }: HttpContextContract) {
    }

    public async destroy({ }: HttpContextContract) {
    }

}
