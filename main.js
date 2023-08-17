// Definición de las teclas y sus caracteres asociados en diferentes capas
//Definition of the keys and their associated characters in different layers
const keys = [
    //capa 1
    //Layer 1
    [
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¡", "¿"],
    ],
    [
        //capa 2
        //Layer 2
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["`", "^"],
        ["+", "*"],
    ],
    [
        //capa 3
        //Layer 3
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["¨", "{"],
        ["Ç", "}"],
    ],
    [
        //capa 4
        //Layer 4
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"],
    ],
    //capa 5
    //Layer 5
    [["SPACE", "SPACE"]],
];

// Variables de estado
let mayus = false; // Estado de las mayúsculas (State of the capital letters)
let shift = false; // Estado del Shift (State of the Shift)
let current = null; // Campo de texto actualmente enfocado (Currently focused text field)

// Llamada inicial para renderizar el teclado
renderKeyboard();

// Función para renderizar el teclado en el HTML
function renderKeyboard() {
    const keyboardContainer = document.querySelector('#keyboard-container');
    let empty = `<div class="key-empty"></div>`;

    // Generar el diseño de teclado basado en las capas y estados actuales
    const layers = keys.map((layer) => {
        return layer.map(key => {
            // Crear el HTML para cada tecla basado en su tipo y estado
            if (key[0] === "SHIFT") {
                return `<button class="key key-shift ${shift ? "activated" : ''}">${key[0]}</button>`;
            }
            if (key[0] === "MAYUS") {
                return `<button class="key key-mayus ${mayus ? "activated" : ''}">${key[0]}</button>`;
            }
            if (key[0] === "SPACE") {
                return `<button class="key key-space"></button>`;
            }
            // Generar el contenido de las teclas normales
            return `
                <button class="key key-normal">
                ${shift
                    ? key[1]
                    : mayus &&
                        key[0].toLowerCase().charCodeAt(0) >= 97 &&
                        key[0].toLowerCase().charCodeAt(0) <= 122
                        ? key[1]
                        : key[0]
                }
                </button>
            `;
        });
    });

    // Añadir tecla vacía al final de la capa 1 y al comienzo de la capa 2
    layers[0].push(empty);
    layers[1].unshift(empty);

    // Convertir las capas en HTML y agregarlas al contenedor del teclado
    const htmlLayers = layers.map(layer => {
        return layer.join("");
    });

    keyboardContainer.innerHTML = "";

    htmlLayers.forEach((layer) => {
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`;
    });

    // Agregar event listeners a las teclas para manejar clics
    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener("click", (e) => {
            if (current) {
                // Manejar las diferentes acciones según la tecla presionada
                if (key.textContent === "SHIFT") {
                    shift = !shift;
                    renderKeyboard();
                } else if (key.textContent === 'MAYUS') {
                    mayus = !mayus;
                    renderKeyboard();
                } else if (key.textContent === '') {
                    current.value += " ";
                } else {
                    current.value += key.textContent.trim();
                    if (shift) {
                        shift = false;
                    }
                }
                renderKeyboard();
                current.focus();
            }
        });
    });
}

// Agregar event listeners a los campos de texto para rastrear el campo actualmente enfocado
document.querySelectorAll("input").forEach(input => {
    input.addEventListener('focusin', e => {
        current = e.target;
    });
});