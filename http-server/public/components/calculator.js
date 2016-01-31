(function() {
    "use strict";

    angular.module('calculator', [])
        .directive('calculator', calculator)
        .service('calculatorService', calculatorService);

    calculator.$inject = [];

    /**
     * This is the directive/view for the advanced search component
     */
    function calculator() {
        var directive = {
            restrict: 'E',
            templateUrl: 'components/calculator.html',
            controller: calculatorController,
            controllerAs: 'vm',
            bindToController: true

        };
        return directive;
    }

    calculatorController.$inject = ['calculatorService', '$window'];

    function calculatorController(calculatorService, $window) {
        var vm = this;
        vm.calcData = {
            value: ""
        };
        vm.buttons = ['0', '.', '=', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        vm.operators = ['+', '-', '/', '*'];
        vm.calculatorService = calculatorService;

        vm.handleNumberKeyClick = function(button) {
            if (vm.calculatorService.currentOperator === null) {
                vm.calcData.value += button;
            } else {
                vm.calcData.value = '';
                vm.calcData.value += button;
            }

        }

        vm.handleOperatorClick = function(operator) {
            if (operator === '=') {
                vm.calculatorService.secondCalcValue = vm.calcData.value;
                vm.calculatorService.computeValue(vm.calcData);
                vm.calculatorService.initialCalcValue = null;
            } else {
                vm.calculatorService.currentOperator = operator;
                vm.calculatorService.handleOperator(vm.calcData);
            }
        }

        vm.handleResetClick = function() {
            vm.calculatorService.reset(vm.calcData);
        }
    }

    calculatorService.$inject = [];

    function calculatorService() {
        this.initialCalcValue = null;
        this.secondCalcValue = null;
        this.currentOperator = null;
        this.computedValue = null;

        this.handleOperator = function(currentCalc) {
            if (currentCalc.value === '') {
                this.initialCalcValue = '';
            } else if (this.initialCalcValue === null) {
                this.initialCalcValue = currentCalc.value;
            } else if (this.secondCalcValue === null && this.initialCalcValue !== null) {
                this.secondCalcValue = currentCalc.value;
                this.computeValue(currentCalc);
            }

        }

        this.computeValue = function(calcData) {
            switch (this.currentOperator) {
                case '+':
                    this.computedValue = Number(this.initialCalcValue) + Number(this.secondCalcValue);
                    break;

                case '-':
                    this.computedValue = Number(this.initialCalcValue) - Number(this.secondCalcValue);
                    break;

                case '*':
                    this.computedValue = Number(this.initialCalcValue) * Number(this.secondCalcValue);
                    break;

                case '/':
                    this.computedValue = Number(this.initialCalcValue) / Number(this.secondCalcValue);
                    break;
            }
            if (this.computedValue !== null) {
                calcData.value = this.computedValue.toString();
                this.initialCalcValue = this.computedValue;
                this.secondCalcValue = null;
            }
        }

        this.reset = function(calcData) {
            this.initialCalcValue = null;
            this.secondCalcValue = null;
            this.currentOperator = null;
            this.computedValue = null;
            calcData.value = '';
        }
    }
})(angular);
