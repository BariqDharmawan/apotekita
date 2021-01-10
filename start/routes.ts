import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('homepage')

const routes = {
    'obat': 'ObatController',
    'penjualan': 'PenjualanController',
}

for (const url in routes) {
    Route.resource(url, routes[url]).except(['update', 'show'])
}