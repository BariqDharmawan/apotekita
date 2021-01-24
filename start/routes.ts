import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('homepage')
Route.resource('persediaan-obat', 'PersediaanController')
Route.resource('obat', 'ObatController').except(['show', 'update', 'edit'])
Route.get('obat/cari', 'ObatController.show').as('obat.show')
Route.resource('penjualan', 'PenjualanController').only(['index', 'store', 'edit', 'update'])
Route.get('transaksi/filter/:bulan', 'PenjualanController.filterBulan').as('filter-bulan')