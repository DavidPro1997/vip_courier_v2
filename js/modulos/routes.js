// Creación del módulo
var app = angular.module('mvevip', ['ngRoute']);

// Configuración de las rutas
app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false // Opcional, pero útil si no tienes una etiqueta <base> configurada correctamente
    });

    $routeProvider
        .when('/', {
            templateUrl : 'home.html',
            controller : 'HomeController'
        })
        .when('/home', {
            templateUrl : 'home.html',
            controller : 'HomeController'
        })
        .when('/login', {
            templateUrl : 'login.html',
            controller : 'LoginController'
        })
        .when('/registro', {
            templateUrl : 'registro.html',
            controller : 'RegistroController'
        })
        .when('/paquetes', {
            templateUrl : 'paquetes.html',
            controller : 'PaquetesController'
        })
        .when('/FAQ', {
            templateUrl : 'faq.html',
            controller : 'FAQController'
        })
        .when('/about', {
            templateUrl : 'about.html',
            controller : 'AboutController'
        })
        .when('/contact', {
            templateUrl : 'contactanos.html',
            controller : 'ContactController'
        })
        .when('/registroPaquetes', {
            templateUrl : 'registrar_paquete.html',
            controller : 'RegistrarPaquetesController'
        })
        .when('/mantenimiento', {
            templateUrl : 'mantenimiento.html',
            controller : 'MantenimientoController'
        })
        .when('/direcciones', {
            templateUrl : 'direcciones.html',
            controller : 'DireccionesController'
        })
        .when('/clientes', {
            templateUrl : 'clientes.html',
            controller : 'ClientesController'
        })
        .when('/cuenta', {
            templateUrl : 'cuenta.html',
            controller : 'CuentaController'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);

// Definir controladores (pueden estar en archivos separados)
app.controller('HomeController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido al Home';
}]);

app.controller('LoginController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido al Login';
}]);

app.controller('RegistroController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido al registro';
}]);

app.controller('PaquetesController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido a los paquetes';
}]);

app.controller('FAQController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido a los FAQ';
}]);

app.controller('AboutController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido a sobre nosotros';
}]);

app.controller('ContactController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido a contactanos';
}]);

app.controller('RegistrarPaquetesController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido al registro de los paquetes';
}]);

app.controller('MantenimientoController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido al mantenimiento de la pagina';
}]);

app.controller('DireccionesController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido a tus direcciones';
}]);

app.controller('CuentaController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido a tu cuenta';
}]);

app.controller('ClientesController', ['$scope', function($scope) {
    $scope.message = 'Bienvenido a los clientes';
}]);



