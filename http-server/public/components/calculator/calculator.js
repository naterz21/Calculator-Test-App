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
            templateUrl: 'components/calculator/calculator.html',
            link: calcuatorLink,
            controller: calculatorController,
            controllerAs: 'vm',
            bindToController: true

        };
        return directive;
        /**
         * This function binds the numberpad to the keys on the calculator.
         * @param   scope      
         * @param   element    
         * @param   attribute  
         * @param   controller 
         */
        function calcuatorLink(scope, element, attribute, controller) {
            //Numpad key bindings
            var num0 = 96;
            var num1 = 97;
            var num2 = 98;
            var num3 = 99;
            var num4 = 100;
            var num5 = 101;
            var num6 = 102;
            var num7 = 103;
            var num8 = 104;
            var num9 = 105;

            var enterKey = 13;
            var multiplyKey = 106;
            var addKey = 107;
            var subtractKey = 109;
            var decimalKey = 110;
            var divideKey = 111;

            element.bind('keydown keypress', function(event) {
                switch (event.which) {
                    case enterKey:
                        event.preventDefault();
                        scope.$apply(controller.handleOperatorClick('='));
                        break;

                    case multiplyKey:
                        event.preventDefault();
                        scope.$apply(controller.handleOperatorClick('*'));
                        break;


                    case addKey:
                        event.preventDefault();
                        scope.$apply(controller.handleOperatorClick('+'));
                        break;

                    case subtractKey:
                        event.preventDefault();
                        scope.$apply(controller.handleOperatorClick('-'));
                        break;


                    case divideKey:
                        event.preventDefault();
                        scope.$apply(controller.handleOperatorClick('/'));
                        break;

                    case decimalKey:
                        event.preventDefault();
                        scope.$apply(controller.handleNumberKeyClick('.'));
                        break;
                        
                    case num0:
                        scope.$apply(controller.handleNumberKeyClick('0'));
                        break;

                    case num1:
                        scope.$apply(controller.handleNumberKeyClick('1'));
                        break;

                    case num2:
                        scope.$apply(controller.handleNumberKeyClick('2'));
                        break;

                    case num3:
                        scope.$apply(controller.handleNumberKeyClick('3'));
                        break;

                    case num4:
                        scope.$apply(controller.handleNumberKeyClick('4'));
                        break;

                    case num5:
                        scope.$apply(controller.handleNumberKeyClick('5'));
                        break;

                    case num6:
                        scope.$apply(controller.handleNumberKeyClick('6'));
                        break;

                    case num7:
                        scope.$apply(controller.handleNumberKeyClick('7'));
                        break;

                    case num8:
                        scope.$apply(controller.handleNumberKeyClick('8'));
                        break;

                    case num9:
                        scope.$apply(controller.handleNumberKeyClick('9'));
                        break;

                }
            });
        }
    }

    calculatorController.$inject = ['calculatorService'];
    /**
     * Directive Controller
     * @param  {Service} calculatorService   This holds the main logic of the calcuator and shared variables 
     */
    function calculatorController(calculatorService) {
        //vm = view model
        var vm = this;
        vm.calcData = {
            value: ""
        };

        //Used to have these by dynamic on the template. However the way it was laid out decided against it
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
            } else if(operator === 'sqrt') {
                vm.calculatorService.currentOperator = operator;
                vm.calculatorService.computeValue(vm.calcData);
            } else {
                vm.calculatorService.currentOperator = operator;
                vm.calculatorService.handleCoreOperators(vm.calcData);
            }
        }

        vm.handleResetClick = function() {
            vm.calculatorService.reset(vm.calcData);
        }
    }

    calculatorService.$inject = [];
    /**
     * This holds the main logic for the calculator and the variables that are shared.
     */
    function calculatorService() {
        this.initialCalcValue = null;
        this.secondCalcValue = null;
        this.currentOperator = null;
        this.computedValue = null;

        this.handleCoreOperators = function(currentCalc) {
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

                case 'sqrt':
                    this.computedValue = Math.sqrt(Number(calcData.value));
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
