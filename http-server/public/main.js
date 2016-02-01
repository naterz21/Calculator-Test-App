(function() {
    "use strict";

    /**
     * Angular Modules
     *
     * NOTE: These are declared here in order to avoid order specific
     * injection. You declare a module with angular.module('whatever', [])
     * then you just use angular.module('whatever') to get it. Components
     * I combined services/directives into one file.
     */

    //Main Application Module
    angular.module('mainCalcApp', ['calculator']);

    angular
        .module('mainCalcApp')
        .controller('mainCalcAppController', mainCalcAppController);

    mainCalcAppController.$inject = [];

    /**
     * The main controller. Nothing is in it now, but just in case. 
     */
    function mainCalcAppController() {

    }

})();
