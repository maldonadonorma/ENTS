// JavaScript Document
var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='ip far fa-2x fa-check-circle blink'></i>";
var tache = "<i class='it far fa-2x fa-times-circle blink'></i>";
var totalSegmentos = 1;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
var idioma = "ESP";
var esMobil = false;
// var mostrarRetroArroba = false; //solo aplica cuando se tiene una respuesta por reactivo


jq321(document).ready(function () {
	jq321("#mododebug").hide();
	if (window.parent.data_crm) {
		debug = false;
		verLongitud = false;
		flechaArriba = true;
		ponerNumeral = true;
		mostrarRetroArroba = true;
		mezclarRespuestas = true;
		siguienteIntentoBlanco = true;
	}

	if (window.name == "movil") {
		esMobil = true;
		// alert ("indexbis.html window.name: "+window.name);
	} else {
		esMobil = esPortable();
	}
	if (esMobil) {
		elementosPorSegmento = 1;
		//var texto = jq321("#textoInstrucciones").html();
		// var texto = jq321("#textoInstrucciones").text();
		// jq321("#textoInstrucciones").removeClass("mostrar").addClass("ocultar");
		// console.log("texto: "+texto);
		// jq321("#toolTipInstrucciones").attr("title",texto);
		// jq321("#toolTipInstrucciones").removeClass("ocultar").addClass("mostrar");
		jq321("#textoInstrucciones").addClass("estilosinstruccion");
		jq321(".info").removeClass("ocultar").addClass("mostrar");
		jq321("#textoInstrucciones").slideUp(10);
		jq321("#textoInstrucciones").addClass("mostrarinfo");
	}
	jq321(".info").click(function () {
		if (jq321(this).hasClass("hiden")) {
			jq321("#textoInstrucciones").slideUp(300);
			jq321(this).removeClass("hiden");
		} else {
			jq321("#textoInstrucciones").slideDown(300);
			jq321(this).addClass("hiden");
		}
	});
	jq321('.ir-arriba').click(function () {
		jq321('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
	if (flechaArriba) {
		jq321('.ir-arriba').show();
	} else {
		jq321('.ir-arriba').hide();
	}

	jq321(window).scroll(function () {
		if (jq321(this).scrollTop() > 0) {
			jq321('.ir-arriba').slideDown(300);
		} else {
			jq321('.ir-arriba').slideUp(300);
		}
	});

});

function escribeArreglo(arreglo) {
	for (i = 0; i < arreglo.length; i++) {
		for (var prop in arreglo[i]) {
			if (arreglo[i].hasOwnProperty(prop)) {
				document.writeln('<p style="text-align: left">' + prop + ' || ' + arreglo[i][prop] + '</p>');
			}
		}
	}
	document.writeln('<hr>');
}

function ic(c) {
	var x = c.length;
	var ci = "";
	while (x >= 0) {
		ci += c.charAt(x);
		x--;
	}
	return ci;
}

function creaIndice() {
	var i = 0;
	for (i = 0; i < reactivos.length; i++) {
		indices.push(i)
	}
	reordenaArreglo(indices);
}

function divideReactivosQF_A(numReactivos) { //  RA-01, RA-03,   QF-A
	for (i = 0; i < numReactivos; i++) {
		preguntas.push({
			txt1: "",
			txt2: "",
			ind: 0
		});
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		respuestas.push({
			txt: "",
			ind: 0
		});
		respuestas[i].txt = reactivos[i].A;
		respuestas[i].ind = indices[i];
	}
}

function reordenaArreglo(arreglo) {
	arreglo.sort(function (a, b) {
		return 0.5 - Math.random()
	});
}

function creaElegir(mostrar) {
	var ind = 1;

	if (elementosPorSegmento >= reactivosMostrar || elementosPorSegmento <= 0) {
		elementosPorSegmento = reactivosMostrar;
	}
	var conteo = 0;
	for (i = 0; i < mostrar; i++) {
		var componentes = reactivos[i].Q.split("@");
		var respuestas = reactivos[i].A;

		if (conteo >= elementosPorSegmento) {
			conteo = 0;
			totalSegmentos++;
		}
		if (numeralAlfabetico) {
			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.-&nbsp;&nbsp;' : ''); // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		} else {
			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : ''); // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		}

		jq321("#contenedor").append('<div id="divId' + i + '" class=segmento' + totalSegmentos + '>');
		jq321("div#divId" + i).append('<p id="pId' + i + '">');
		jq321("p#pId" + i).append('<p class="contenido">' + numeralPregunta);

		for (j = 0; j < respuestas.length; j++) {
			var opciones = respuestas[j];
			if (mezclarRespuestas) {
				reordenaArreglo(opciones)
			}
			opciones.unshift({
				opcion: "-------",
				correcta: false,
				retro: ""
			});

			var texto = '<select id="selId' + ind + '"></select>'; // JLBG May 23, 2019,   agrego retro por caja
			if (mostrarRetroArroba) {
				for (var k = 0; k < opciones.length; k++) {
					var retro = '';
					if (opciones[k].opcion != '-------') {
						if (opciones[k].correcta) {
							retro = '<span data-toggle="tooltip" data-placement="auto left" data-valor="' + opciones[k].opcion + '" data-type="success" title="' + tam(opciones[k].retro, 1)   + '">' + palomita + '</span>';
						}
						else {
							retro = '<span data-toggle="tooltip" data-placement="auto left" data-valor="' + opciones[k].opcion + '"  data-type="danger" title="'  + tam(opciones[k].retro, 1) + '">' + tache + '</span>';
						}
						texto += retro;
					}
				}
			}
			else {
				texto += '<span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[i].FA[j].correcta, 1)   + '">' + palomita + '</span> \
				<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="'  + tam(reactivos[i].FA[j].incorrecta, 1) + '">' + tache + '</span>';
			}

			jq321("#divId" + i + " .contenido").append(componentes[j]).append(texto); // de origen no tenia el </select>, RAAR agrego abril 11,18

			for (k = 0; k < opciones.length; k++) {
				jq321("select:last").append("<option>" + opciones[k].opcion);
				if (opciones[k].correcta) {
					jq321("select:last").attr("data-respuesta", opciones[k].opcion);
					if (debug) {
						jq321("#mododebug").show();
						jq321("select:last").after("<sup><i>" + opciones[k].opcion + "</i></sup>")
					}
				}
			}
			ind++;
		}
		jq321("#divId" + i + " .contenido").append(componentes[j] + tam(reactivos[i].Q, 0));
			jq321("#pId" + i).prepend(
				'<p class="retros"><span data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</span>\
			<span data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</span></p>');
		conteo++;
	}
	switch (idioma) {
		case "ENG":
			jq321("#btnRevisar").text("");
			jq321("#btnReiniciar").text(ic("tpmetta txeN"));
			break;
		default:
			jq321("#btnRevisar").text("Revisar");
			jq321("#btnReiniciar").text("Siguiente intento");
	}
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	jq321('i.ip, i.it').addClass("ocultar");
	if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
		if (carruselContinuo) {
			jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
		} else {
			jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
		}
		jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq321("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}
	jq321("[id^=divId]").addClass("ocultar");
	jq321(".segmento1").removeClass("ocultar");
}

function tam(cad, n) { // 1T, 0ele.esc.ord
	var txt = "";
	if (verLongitud) {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) {
			txt = cad + txt
		}
	} else {
		txt = (n == 1) ? cad : ""
	}
	return txt;
}

//function mostrarMensaje(tipo, titulo, cadena) {
function mostrarMensaje(clase, recurso) {
	if (!recurso) {
		recurso = -1
	}
	var msgs = [,
		["Arrastrar todas las respuestas a los espacios correspondientes.", ic("secaps etairporppa ot srewsna lla gard ,esaelP")], // completar arrastrando
		["Llena todos los campos de texto.", ic("sdleif txet lla tuo llif ,esaelP")], // completar escribiendo
		["Contesta todas las preguntas", ic("snoitseuq lla rewsna ,esaelP")], // verdadero-falso
		["Ordena todos los enunciados", ic("secnetnes lla tros ,esaelP")], // ordenar enunciados
		["Elige una respuesta para cada recuadro.", ic("tsil hcae rof rewsna na esoohc ,esaelP")], // completar eligiendo
		["Arrastra todas las respuestas a los espacios correspondientes.", ic("secaps etairporppa ot srewsna lla gard ,esaelP")], // arrastrar esquema
		["", ""]
	];
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos
			tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					msg = ic(maxIntentos + " :stpmetta fo rebmun mumixam dehcaer evah uoY");
					btnOK = ic("KO");
					break;
				default:
					tit = ("Atención");
					msg = ("Has alcanzado el máximo número de intentos: " + maxIntentos + ".")
					btnOK = ("Aceptar");
			}
			break;
		case 2: // Contestar TODO
			tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					msg = msgs[recurso][1]; //recurso,1
					btnOK = ic("KO");
					break;
				default:
					tit = ("Atención");
					msg = msgs[recurso][0]; //recurso,0
					btnOK = ("Aceptar");
			}
			break;
		default:
			tipo = ("Error");
			tit = ("Error de sistema");
			msg = ("Condición desconocida");
			btnOK = ("Aceptar");
	}
	swal({
		title: tit,
		text: msg,
		confirmButtonText: btnOK,
		closeOnConfirm: true,
		html: true
	});
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq321.each(retroCal, function (indice) {
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == ic("GNE")) ? tam(retroCal[indice].Mensaje[1], 1) : tam(retroCal[indice].Mensaje[0], 1);
			}
		});
	}
	return mensaje;
}

function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			var btnOK = ("OK");
			break;
		default:
			var btnOK = ("Aceptar");
	}
	swal({
		title: titulo,
		text: cadena,
		confirmButtonText: btnOK,
		closeOnConfirm: true,
		html: true
	});
}

function esPortable() {
	if (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i) ||
		navigator.userAgent.match(/Opera Mini/i) ||
		navigator.userAgent.match(/IEMobile/i)
	) {
		return true;
	} else {
		return false;
	}
}

