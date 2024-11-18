const databaseURL = 'https://landing-49ce2-default-rtdb.firebaseio.com/colec.json';


let getData = async () => {
    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL, {
            method: 'GET'
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();
        if (data != null) {
            // Count the number of registered subscribers by date from the data object

            let answers = new Map();

            if (Object.keys(data).length > 0) {
                for (let key in data) {
                    // let { country, gridRadios } = data[key];
                    let { monstro } = data[key];

                    // Use gridRadios as the key for the answers map
                    let count = answers.get(monstro) || 0;
                    answers.set(monstro, count + 1);
                }
            }

            if (answers.size > 0) {
                // Assuming you have a tbody or some element to insert rows into
                let tableBody = document.getElementById('answersTableBody'); // Ensure you have a tbody with this ID

                tableBody.innerHTML = '';  // Clear previous content

                let index = 1;
                for (let [option, count] of answers) {
                    let rowTemplate = `
                        <tr>
                            <th>${index}</th>
                            <td>${option}</td>
                            <td>${count}</td>
                        </tr>`;

                    tableBody.innerHTML += rowTemplate; // Append new rows to the table body
                    index++;
                }
            }
        }


    } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    }

}

let ready = () => {
    console.log('DOM está listo')
}
let loaded = () => {
    let myform = document.getElementById('form');

    // Escucha el evento 'submit' en el formulario específico
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault(); // Evita la recarga de la página al enviar el formulario

        let monsterElement = document.querySelector('input[name="monster"]'); // Asegúrate de que el campo de entrada tenga el nombre adecuado
        let monsterText = monsterElement.value;

        // Validación: si el campo está vacío, muestra una animación
        if (monsterText.length === 0) {
            monsterElement.focus(); // Enfoca el campo de entrada
            monsterElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            );
            return; // Detiene el envío de datos si el campo está vacío
        }

        // Si pasa la validación, llama a sendData()
        sendData();
    });

    // Obtiene los datos, si es necesario
    getData();
}

// Asegúrate de que la función sendData reciba el evento correctamente y prevenga la recarga
let sendData = () => {
    const form = document.getElementById('form');
    const formData = new FormData(form);  // Obtiene los datos del formulario
    const data = Object.fromEntries(formData.entries()); // Convierte a objeto
    console.log(data);

    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces');
            form.reset();  // Resetea el formulario
            getData();     // Actualiza los datos de la base
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!');
        });
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded);
