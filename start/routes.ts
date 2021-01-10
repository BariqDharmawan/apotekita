import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('homepage')
Route.resource('obat', 'ObatController')
Route.resource('penjualan', 'PenjualanController').only(['index', 'store', 'edit', 'update'])