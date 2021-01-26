// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    public async index({ view }) {
        const pageName = 'selamat datang di'
        return view.render('homepage', { pageName })
    }
}
