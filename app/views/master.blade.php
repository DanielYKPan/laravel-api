<!doctype html>
<html data-ng-app="myApp">
<head>
	<meta charset="UTF-8">
	<meta name="csrf-token" content='<?php echo csrf_token(); ?>'>
	<base href='/'>
	<title>Laravel-API</title>
    <link rel="stylesheet" href="assets/vendor/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/vendor/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/main.css"/>
</head>
<body data-ng-cloak data-ng-controller="CoreController">
    <section class="header-section" data-ng-include="'/modules/core/views/header.client.view.html'"></section>
    <section class="content">
        <section class="container">
            @yield('content')
        </section>
    </section>
    <script type="text/javascript" src="assets/vendor/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="assets/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/vendor/angular/angular.min.js"></script>
    <script type="text/javascript" src="assets/vendor/angular-animate/angular-animate.min.js"></script>
    <script type="text/javascript" src="assets/vendor/angular-sanitize/angular-sanitize.min.js"></script>
    <script type="text/javascript" src="assets/vendor/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script type="text/javascript" src="assets/vendor/angular-ui-utils/ui-utils.min.js"></script>
    <script type="text/javascript" src="assets/vendor/angular-local-storage/dist/angular-local-storage.min.js"></script>
    <script type="text/javascript" src="assets/vendor/angular-bootstrap/ui-bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script type="text/javascript" src="config.js"></script>
    <script type="text/javascript" src="application.js"></script>
    <script type="text/javascript" src="modules/wines/wines.module.js"></script>
    <script type="text/javascript" src="modules/wines/config/wines.route.js"></script>
    <script type="text/javascript" src="modules/wines/controllers/wineList.controller.js"></script>
    <script type="text/javascript" src="modules/wines/controllers/wineInform.controller.js"></script>
    <script type="text/javascript" src="modules/wines/directives/checkbox.directive.js"></script>
    <script type="text/javascript" src="modules/wines/directives/filterPanel.directive.js"></script>
    <script type="text/javascript" src="modules/wines/directives/pagination.directive.js"></script>
    <script type="text/javascript" src="modules/wines/directives/wineResultList.directive.js"></script>
    <script type="text/javascript" src="modules/wines/directives/wineResultGrid.directive.js"></script>
    <script type="text/javascript" src="modules/wines/filters/wines.filter.js"></script>
    <script type="text/javascript" src="modules/wines/services/wine.service.js"></script>
    <script type="text/javascript" src="modules/wines/services/sortType.service.js"></script>
    <script type="text/javascript" src="modules/core/core.module.js"></script>
    <script type="text/javascript" src="modules/core/config/core.route.js"></script>
    <script type="text/javascript" src="modules/core/controllers/fuck.controller.js"></script>{{--Need to be delete !!!!!!!!!!!!!!!!!!!!!!!--}}
    <script type="text/javascript" src="modules/core/controllers/core.controller.js"></script>
    <script type="text/javascript" src="modules/core/controllers/home.controller.js"></script>
    <script type="text/javascript" src="modules/core/controllers/navbar.controller.js"></script>
    <script type="text/javascript" src="modules/core/controllers/header.cart.controller.js"></script>
    <script type="text/javascript" src="modules/core/controllers/header.account.controller.js"></script>
    <script type="text/javascript" src="modules/cart/cart.module.js"></script>
    <script type="text/javascript" src="modules/cart/services/cart.service.js"></script>
    <script type="text/javascript" src="modules/cart/config/cart.route.js"></script>
    <script type="text/javascript" src="modules/cart/controllers/cart.controller.js"></script>
    <script type="text/javascript" src="modules/cart/controllers/checkout.controller.js"></script>
    <script type="text/javascript" src="modules/account/account.module.js"></script>
    <script type="text/javascript" src="modules/account/config/account.route.js"></script>
    <script type="text/javascript" src="modules/account/config/security.interceptor.js"></script>
    <script type="text/javascript" src="modules/account/controllers/login.form.controller.js"></script>
    <script type="text/javascript" src="modules/account/controllers/registration.form.controller.js"></script>
    <script type="text/javascript" src="modules/account/controllers/my.account.controller.js"></script>
    <script type="text/javascript" src="modules/account/services/user.service.js"></script>
    <script type="text/javascript" src="modules/account/services/security.service.js"></script>
    <script type="text/javascript" src="modules/account/services/securityInterceptor.service.js"></script>
    <script type="text/javascript" src="modules/account/services/securityRetryQueue.service.js"></script>
    <script type="text/javascript" src="modules/account/services/securityAuthorization.service.js"></script>
    <script type="text/javascript" src="modules/account/directives/login-toolbar.directive.js"></script>
    <script type="text/javascript" src="modules/account/directives/unique-email.directive.js"></script>
    <script>
        angular.module('myApp').constant('CSRF_TOKEN',{
            csrf_token : '<?php echo csrf_token(); ?>'
        });
    </script>
</body>
</html>