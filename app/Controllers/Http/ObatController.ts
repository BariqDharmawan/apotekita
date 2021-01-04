import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Obat from 'App/Models/Obat'
import Route from '@ioc:Adonis/Core/Route'

export default class ObatController {

    public async index({ view }: HttpContextContract) {
        const semuaObat = await Obat.all()
        return view.render('obat.index', { semuaObat })
    }

    public async store({ request, response }: HttpContextContract) {
        await Obat.create({
            kd_obat: request.input('kd_obat'),
            nm_obat: request.input('nm_obat'),
            bentuk_obat: request.input('bentuk_obat'),
            harga: request.input('harga')
        })

        response.redirect().toRoute('obat.index')
    }

    public async show({ }: HttpContextContract) {
    }

    public async edit({ }: HttpContextContract) {
    }

    public async update({ }: HttpContextContract) {
    }

    public async destroy({ }: HttpContextContract) {
    }

}
