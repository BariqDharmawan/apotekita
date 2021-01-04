// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    public async index({ view }) {
        return view.render('welcome')
    }
}
