import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('homepage')
Route.get('persediaan', 'ObatController.persediaan').as('persediaan')
Route.resource('obat', 'ObatController').except(['show'])
Route.resource('transaksi', 'PenjualanController').only(['index', 'store', 'edit', 'update'])