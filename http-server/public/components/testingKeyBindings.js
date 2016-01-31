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




        angular.element($window).bind('keydown keypress', function(event) {
            switch (event.which) {
                case enterKey:
                    event.preventDefault();
                    vm.handleOperatorClick('=');
                    break;

                case multiplyKey:
                    event.preventDefault();
                    vm.handleOperatorClick('+');
                    break;


                case addKey:
                    event.preventDefault();
                    vm.handleOperatorClick('-');
                    break;

                case subtractKey:
                    event.preventDefault();
                    vm.handleOperatorClick('-');
                    break;

                case decimalKey:
                    event.preventDefault();
                    vm.handleOperatorClick('-');
                    break;

                case divideKey:
                    event.preventDefault();
                    vm.handleOperatorClick('-');
                    break;


                case num0:
                    vm.handleNumberKeyClick('0')
                    break;

                case num1:
                    vm.handleNumberKeyClick('1')
                    break;

                case num2:
                    vm.handleNumberKeyClick('2')
                    break;

                case num3:
                    vm.handleNumberKeyClick('3')
                    break;

                case num4:
                    vm.handleNumberKeyClick('4')
                    break;

                case num5:
                    vm.handleNumberKeyClick('5')
                    break;

                case num6:
                    vm.handleNumberKeyClick('6')
                    break;

                case num7:
                    vm.handleNumberKeyClick('7')
                    break;

                case num8:
                    vm.handleNumberKeyClick('7')
                    break;

                case num9:
                    vm.handleNumberKeyClick('7')
                    break;

            }
        });