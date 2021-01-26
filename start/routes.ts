import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('homepage')
Route.resource('persediaan-obat', 'PersediaanController')
// Route.resource('obat', 'ObatController').except(['show', 'update', 'edit'])
Route.group(() => {
    Route.get('/', 'ObatController.index').as('obat.index')
    Route.post('store', 'ObatController.store').as('obat.store')
    Route.get('delete/:kode', 'ObatController.destroy').as('obat.destroy')
    Route.get('edit', 'ObatController.edit').as('obat.edit')
    Route.post('update/:id', 'ObatController.update').as('obat.update')
    Route.get('cari', 'ObatController.show').as('obat.show')
}).prefix('obat')

Route.resource('penjualan', 'PenjualanController').only(['index', 'store', 'edit'])
Route.get('transaksi/filter/:bulan', 'PenjualanController.filterBulan').as('filter-bulan')