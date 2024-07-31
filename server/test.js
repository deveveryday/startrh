class Calculator {
 
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
   
    calculate() {
    }
}
 
class Sum extends Calculator {
    calculate() {
        return this.num1 + this.num2;
    }
}
 
class Subtraction extends Calculator {
    calculate() {
        return this.num1 - this.num2;
    }
}
 
class Multiplication extends Calculator {
    calculate() {
        return this.num1 * this.num2;
    }
}
 
class Division extends Calculator {
    calculate() {
        if (this.num2 == 0) {
            return "Error: Division by zero";
        } else {
            return this.num1 / this.num2;
        }
    }
}
 
class Sine extends Calculator {
    calculate() {
        return Math.sin(this.num1 + this.num2);
    }
}
 
// Class for calculating cosine
class Cosine extends Calculator {
    calculate() {
        return Math.cos(this.num1 + this.num2);
    }
}

class Tangent extends Calculator {
    calculate() {
        return Math.tan(this.num1 + this.num2);
    }
}
 
function calculate(operation) {
    return operation.calculate();
}