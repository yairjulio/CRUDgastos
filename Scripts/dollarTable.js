let i = 0;

const btn = document.getElementById('dollarTableButton');

btn.addEventListener('click', () => {
    const form = document.getElementById('table');

    if (form.style.display === 'none') {
        // 👇️ this SHOWS the form
        form.style.display = 'block';
    } else {
        // 👇️ this HIDES the form
        form.style.display = 'none';
    }
});

const dollarTable = async () => { 
    
    try{
        const response = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
        const data = await response.json();
        let cotbody = document.getElementById("cotizacion");
    
        for (i=0;i<2;i++){    
            let row = document.createElement("tr");
            let tabtip = document.createElement("td");
            tabtip.innerHTML = data[i].casa.nombre;
            let tabcom = document.createElement("td");
            tabcom.innerHTML = data[i].casa.compra;
            let tabven = document.createElement("td");
            tabven.innerHTML = data[i].casa.venta;
    
            row.appendChild(tabtip);
            row.appendChild(tabcom);
            row.appendChild(tabven);

            cotbody.appendChild(row);
        }
        const form = document.getElementById('table');
        form.style.display = 'none';
        return data;
    } catch (error) {
        console.log('Hubo un error',error)
    }
}

document.addEventListener("DOMContentLoaded", dollarTable);

