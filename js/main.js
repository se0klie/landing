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
                    let { character, country } = data[key];
        
                    // Use gridRadios as the key for the answers map
                    let count = answers.get(character) || 0;
                    answers.set(character, count + 1);
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
    document.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();


        let emailElement = document.querySelector('.form-control-lg');
        let emailText = emailElement.value;

        if (emailText.length === 0) {
            emailElement.focus();

            emailElement.animate(
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
            return;
        }
        sendData();
    });
    getData();
}


let sendData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
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
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
            form.reset()
            getData();
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        });


}
window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)