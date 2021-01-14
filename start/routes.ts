import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('homepage')
Route.get('persediaan', 'ObatController.persediaan').as('persediaan')
Route.resource('obat', 'ObatController').except(['show'])
Route.get('obat/:kd_obat', 'ObatController.show').as('obat.show')
Route.resource('transaksi', 'PenjualanController').only(['index', 'store', 'edit', 'update'])
Route.get('transaksi/filter/:bulan', 'PenjualanController.filterBulan').as('filter-bulan')