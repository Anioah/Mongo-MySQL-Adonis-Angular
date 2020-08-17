'use strict'

//const ContratoController = require('../app/Controllers/Http/ContratoController');
const Contrato = use('App/Models/Contrato')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


// Usuarios
Route.post('registrar','UserController.register');
Route.post('login','UserController.login');

//User Verification
Route.get('userAuth','UserController.tokenValidation');

Route.group(() => {

  // Usuarios
  Route.patch('updateUser','UserController.update')

  // Empresas
  Route.get('empresas','EmpresaController.index')
  Route.post('nuevaEmpresa','EmpresaController.store')
  Route.post('showEmpresa', 'EmpresaController.show')
  Route.put('updateEmpresa','EmpresaController.update')
  Route.delete('deleteEmpresa','EmpresaController.delete')

  // Empleados
  Route.get('empleados','EmpleadoController.index')
  Route.post('nuevoEmpleado','EmpleadoController.store')
  Route.post('showEmpleado', 'EmpleadoController.show')
  Route.put('updateEmpleado', 'EmpleadoController.update')
  Route.delete('deleteEmpleado', 'EmpleadoController.delete')

  // Contratos
  //Route.get('Contratos', 'ContratoController.index')
  Route.post('newContrato', 'ContratoController.store')
  Route.post('contratosPorEmpleado', 'ContratoController.show')
  Route.put('updateContrato', 'ContratoController.update')
  Route.delete('deleteContrato', 'ContratoController.delete')

}).middleware(['auth'])