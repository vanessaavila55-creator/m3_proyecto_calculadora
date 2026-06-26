const pantalla = document.getElementById("pantalla");
pantalla.addEventListener("click", mostrarHistorial);

const MAX_DIGITOS = 10;
let numeroActual = "";
let elementos = [];
let historial = [];
function insertar(caracter) {
    let ultimoCaracter = pantalla.innerText.slice(-1);
    if (pantalla.innerText === "0") {
        if (caracter === "+" || caracter === "*" || caracter === "/") {
            return;
        }
        if (caracter === ".") {
            if (parser("0") && parser(".")) {
                pantalla.innerText = "0.";
            }
        } else {
            if (parser(caracter)) {
                pantalla.innerText = caracter;
            }
        }
    } else if (esOperador(ultimoCaracter)) {
        if (esOperador(caracter) || caracter === ".") {
            return;
        } else {
            if (parser(caracter)) {
                pantalla.innerText += caracter;
            }
        }
    } else {
        if (parser(caracter)) {
            pantalla.innerText += caracter;
        }
    }
}
function parser(caracter) {
    if (caracter === "." && numeroActual.includes(".")) {
        return false;
    }
    if (esNumero(caracter) || caracter === ".") {
        if (numeroActual === "0" && caracter != ".") {
            numeroActual = caracter;
        } else {
            numeroActual += caracter;
        }
        return true;
    } else if (esOperador(caracter)) {
        elementos.push(numeroActual);
        elementos.push(caracter);
        numeroActual = "";
        return true;
    }
    return false;
}
function calcular() {
    let expresion = pantalla.innerText;
    let ultimoCaracter = pantalla.innerText.slice(-1);
    if (esOperador(ultimoCaracter)) {
        //elementos.pop();
        return;
    }
    if (numeroActual != "") {
        elementos.push(numeroActual);
        numeroActual = "";
    }
    let resultado = parseFloat(elementos[0]);
    for (let i = 1; i < elementos.length; i += 2) {
        let operador = elementos[i];
        let numero = parseFloat(elementos[i + 1]);
        switch (operador) {
            case "+":
                resultado += numero;
                break;
            case "-":
                resultado -= numero;
                break;
            case "*":
                resultado *= numero;
                break;
            case "/":
                if (numero === 0) {
                    pantalla.innerText = "Error: n÷0";
                    elementos = [];
                    numeroActual = "";
                    return;
                }
                resultado /= numero;
                break;
        }
    }

    // GUARDAR HISTORIAL
    historial.push({
        fecha: new Date().toLocaleString(),
        operacion: expresion,
        resultado: resultado
    });

    if (historial.length > 5) {
        historial.shift();
    }

    if (resultado.toString().length > MAX_DIGITOS) {
        pantalla.innerText = resultado.toExponential(4);
    } else {
        pantalla.innerText = resultado;
    }
    elementos = [];
    numeroActual = resultado.toString();
}
function esNumero(caracter) {
    // isNaN devuelve true si el valor NO es un número, por lo que negamos esa condición
    return !isNaN(caracter);
}
function esOperador(caracter) {
    return caracter === "+" || caracter === "-" || caracter === "*" || caracter === "/";
}
function borrar() {
    pantalla.innerText = "0";
    numeroActual = "";
    elementos = [];
}
function mostrarHistorial() {

    if (historial.length === 0) {
        alert("No hay operaciones registradas");
        return;
    }

    let mensaje = "";

    for (let i = 0; i < historial.length; i++) {
        const operacion = historial[i];

        mensaje +=
            "Fecha: " + operacion.fecha + "\n" +
            "Operación: " + operacion.operacion + "\n" +
            "Resultado: " + operacion.resultado + "\n\n";
    }

    alert(mensaje);
}