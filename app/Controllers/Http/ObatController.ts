import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ObatController {

    public async index({ }: HttpContextContract) {
        console.log('test')
    }

    public async create({ }: HttpContextContract) {

    }

    public async store({ }: HttpContextContract) {
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
