let canvas = document.querySelector("#grafica"); // seleccionem amb el querySelector la gràfica

let context = canvas.getContext("2d"); // li afegim un context 2d

let lenghtArray = prompt("Introdueix quants productes tindrà el teu gràfic:");

let productes = [];

let dadesArray = [];

for (let i = 0; i < lenghtArray; i++) {
  productes[i] = prompt("Introdueix el nom del producte: " + (i + parseInt(1)));
}

for (let i = 0; i < lenghtArray; i++) {
  dadesArray[i] = prompt("Introdueix quantes unitats tens de " + productes[i]);
}

let colorsArray = [];
for (let i = 0; i < lenghtArray; i++) {
  colorsArray[i] = prompt(
    "Introdueix un color per a la barra " +
      (i + parseInt(1)) +
      "\n[lightgreen,red,green,magenta,blue,yellow,black]"
  );
}

let titolGrafic = prompt("Introdueix un titol per al gràfic de barres:");

//const dades = [23, 15, 90, 21, 55, 60]; //enganxem l'array de nombres que ens proporciona el docent

//var colors = ["lightgreen", "red", "green", "magenta", "blue", "yellow"]; //enganxem l'array de color que ens proporciona el docent

crearGrafic(productes, dadesArray, colorsArray, titolGrafic);

function crearGrafic(arrayProducte, arrayDades, arrayColors, titolGrafic) {
  let dadesInt = arrayParseInt(arrayDades); //convertim l'array a nombres enters fent servir la funció del darrer exàmen

  let numeroMajor = getMaxValorArray(dadesInt); //busquem el nombre més alt de l'array fent servir la funció de l'exercici de 2 punts de l'examen
  console.log(numeroMajor); //verfico que no la he liat i que la funció va correctament

  const marge = 20;
  const yBase = canvas.height - marge;
  const alturaUtil = canvas.height - marge * 2;
  const ampladaUtil = canvas.width - marge * 2;
  const width = ampladaUtil / dadesInt.length;

  for (let i = 0; i < dadesInt.length; i++) {
    context.fillStyle = arrayColors[i % arrayColors.length]; //agafem el color de l'array
    const x = marge + i * width; //calculem la x

    const alturaEscalada = (dadesInt[i] / numeroMajor) * alturaUtil; //calculem l'altura escalada
    const y = yBase - alturaEscalada; // calculem la y

    context.fillRect(x, y, width, alturaEscalada); //dibuixem la barra amb les dades que hem generat
  }

  const titol = titolGrafic; //titol de la barra
  context.fillStyle = "black"; // color del text
  context.font = "16px Montserrat "; // font i mida
  context.textAlign = "center"; // centrat
  context.fillText(titol, canvas.width / 2, 595); // posició X,Y

  /* 
  CONVERTIR EL ARRAY A ENTERS 
*/

  function arrayParseInt(array) {
    var arrayInts = [];
    for (let i = 0; i < array.length; i++) {
      arrayInts[i] = parseInt(array[i]);
    }
    return arrayInts;
  }

  /* 
   OBTENIR EL NÚMERO MÉS GRAN 
*/

  function getMaxValorArray(array) {
    let numeroPetit = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < array.length; i++) {
      if (array[i] >= numeroPetit) {
        numeroPetit = array[i];
      }
    }
    console.log("El número gran és: " + numeroPetit);

    return numeroPetit;
  }

  /* 
   FUNCIÓ PER A PRINTAR LES LINIES ORIENTATIVES AMB ELS NOMBRES
*/

  const numLinies = 5;

  context.strokeStyle = "#ccc";
  context.lineWidth = 1;
  context.font = "12px Arial";
  context.fillStyle = "black";
  context.textAlign = "right";
  const xText = 17; // on posar els números

  for (let i = 0; i <= numLinies; i++) {
    const valorLinia = (numeroMajor / numLinies) * i;
    const y = yBase - (valorLinia / numeroMajor) * alturaUtil; // alçada proporcional

    // dibuixem línia
    context.beginPath();
    context.moveTo(marge, y);
    context.lineTo(canvas.width - marge, y);
    context.stroke();

    // escrivim el valor a la esquerra
    context.fillText(Math.round(valorLinia), xText, y + 4); // +4 per centrar vertical
  }

  /* 
    LLEGENDA
*/

  const llegendaDiv = document.getElementById("llegenda");
  let llegenda = "<ul style='list-style:none; padding:0;'>";

  for (let i = 0; i < arrayDades.length; i++) {
    llegenda +=
      "<li style='margin:4px 0;'>" +
      "<p style='color:" +
      arrayColors[i] +
      "'>" +
      arrayProducte[i] +
      ": " +
      arrayDades[i] +
      "</p>" +
      "</li>";
  }

  llegenda += "</ul>";

  llegendaDiv.innerHTML = llegenda;
  console.log(llegenda);
}
