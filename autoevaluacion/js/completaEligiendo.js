/*
Created, Modified and Updated by @juan_becerril on 2017-11-15.
	- Multiple sentences
	- number of attempts
	- display feedback
	- windows messages standard
*/
var enunciadosCorrectos = 0;
var tempCalif = 0;
tempCalif = guardarCalificacion
var calificaciones = [];
var maxCalif = 0;
var intCalif = 0;

function hayVacios() {
	var salir = false;
	jq321("select").removeClass("vacio"); // JLBG mzo 18, 2019; quitar clase a preguntas sin marcar
	jq321("select").each(function (ind, elemento) {
		if (elemento.value == "-------") {
			jq321(elemento).addClass("vacio"); // JLBG mzo 18, 2019; marcar las preguntas sin contestar
			salir = true;
			// return false;
		}
	});
	return salir;
}

// jq321(".cPaginador").click(function()
function paginar(boton) {
	self = jq321("." + boton);
	// self= this; //practica para asegurar que estoy en el que dio click....
	jq321(".segmento" + recorreSegmentos).addClass("ocultar");
	if (jq321(self).hasClass('cProximo')) {
		if (carruselContinuo) {
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : 1);
		}
		else {
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : recorreSegmentos);
			if (recorreSegmentos < totalSegmentos) {
				jq321(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
			}
			else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cPrevio").removeClass("invisible").addClass("visible");
			}
		}
	}
	else {
		if (carruselContinuo) {
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : totalSegmentos);
		}
		else {
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : 1);
			if (recorreSegmentos > 1) {
				jq321(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			}
			else {
				jq321(self).removeClass("visible").addClass("invisible");
				jq321(".cProximo").removeClass("invisible").addClass("visible");
			}
		}
	}
	jq321(".segmento" + recorreSegmentos).removeClass("ocultar");
	jq321("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
};

function continuar() {
	jq321('#btnRevisar').show();
	jq321('#btnReiniciar').hide();
	if (intentos < maxIntentos) {
		jq321("i.ip, i.it, i.it1").removeClass("mostrar").addClass("ocultar");
		if (mostrarRetroIndividual && !(mostrarRetroFinal)) {
			jq321("select").each(function () {
				jq321(this).prop("disabled", false).val("-------").removeClass("mal").removeClass("bien");
			});
		}
		else {
			jq321("select.mal").each(function () {
				jq321(this).prop("disabled", false).val("-------").removeClass("mal");
			});
		}
	}
	else {
		mostrarMensaje(1);
	}
}

function revisar() {
	if (hayVacios()) {
		mostrarMensaje(2, 5);
	}
	else {
		jq321('#btnRevisar').hide();
		jq321('#btnReiniciar').show();
		if (calificacionGlobal) {
			var totalPreguntas = jq321('div[id^="divId"]').length;
		}
		else {
			var totalPreguntas = jq321('select').length;
		}
		if (intentos < maxIntentos) {
			jq321("i.ip, i.it").removeClass("mostrar").addClass("ocultar");
			enunciadosCorrectos = 0;
			correctas = 0;
			var respCorrecta = "";
			var respElegida = "";
			jq321("#contenedor > div > p").each(function (ind1, enunciado) {
				var correctasReactivo = 0;
				jq321(enunciado).find("select").each(function (ind2) {
					respCorrecta = jq321(this).attr("data-respuesta");
					respElegida = jq321(this).val();
					jq321(this).prop("disabled", true);
					if (respElegida == respCorrecta) {
						correctasReactivo++;
						jq321(this).addClass("bien");
						if (!calificacionGlobal) {
							if (mostrarRetroArroba) {
								jq321(this).nextUntil('select').filter('span[data-valor="' + respElegida + '"]').find("i.ip").removeClass("ocultar").addClass("mostrar");
							}
							else {
								jq321(this).nextAll("span").eq(0).find("i.ip").removeClass("ocultar").addClass("mostrar");
							}
						}
					}
					else {
						jq321(this).addClass("mal");
						if (!calificacionGlobal) {
							if (mostrarRetroArroba) {
								jq321(this).nextUntil('select').filter('span[data-valor="' + respElegida + '"]').find("i.it").removeClass("ocultar").addClass("mostrar");
							}
							else {
								jq321(this).nextAll("span").eq(1).find("i.it").removeClass("ocultar").addClass("mostrar");
							}
						}
					}
				});

				if (calificacionGlobal) {
					if (correctasReactivo == jq321(enunciado).find("select").length) {
						enunciadosCorrectos++;
						jq321(this).parent().find("p.retros i.ip").removeClass("ocultar").addClass("mostrar");
					}
					else {
						jq321(this).parent().find("p.retros i.it").removeClass("ocultar").addClass("mostrar");
					}
					jq321(this).find(".retros, .contenido").css("display", "table-cell");
				}
				correctas += correctasReactivo;
			});
			intentos++;

			if (siguienteIntentoBlanco) {
				jq321("#btnReiniciar").click(function () {
					jq321("select").each(function () {
						if (intentos < maxIntentos) {
							jq321(this).prop("disabled", false).val("-------").removeClass("mal").removeClass("bien");
						}
					});
				});
			}
		}
		switch (idioma) {
			case "ENG":
				var txtResp1 = (correctas == 1) ? ic("rewsna thgir") : ic("srewsna thgir");
				var txtResp2 = (enunciadosCorrectos == 1) ? ic("ecnetnes thgir") : ic("secnetnes thgir");
				var msg1 = (porEspacios || porEnunciados) ? ic(">/rb<>naps/<nettog evah uoY> 'odatluser'=di naps<") : "";
				var msg2 = (porEspacios) ? (ic(">gnorts<") + correctas + ic(" >gnorts/<") + txtResp1 + ic(">gnorts< fo ") + totalPreguntas + ic(">/rb<>/rb<selbissop >gnorts/<")) : "";
				var msg3 = (porEnunciados) ? (ic(">gnorts<") + enunciadosCorrectos + ic(" >gnorts/<") + txtResp2 + ic(">gnorts< fo ") + total + ic(">/rb<>/rb<>gnorts/<")) : "";
				var tit = ic("tluseR");
				break;
			default:
				var txtResp1 = (correctas == 1) ? " respuestas correctas. " : " respuestas correctas.";
				var txtResp2 = (enunciadosCorrectos == 1) ? " respuestas correctas." : " respuestas correctas.";
				var msg1 = (porEspacios || porEnunciados) ? "<span id='resultado'> <strong> Resultado <br> </strong> </span>" : "";
				var msg2 = (porEspacios) ? ("Obtuviste " + correctas + "/" + totalPreguntas + txtResp1 + "<br><br>") : "";
				var msg3 = (porEnunciados) ? ("Obtuviste " + enunciadosCorrectos + "/" + total + txtResp1 + "<br><br>") : "";
				var tit = "Resultado";
		}
		if (porEspacios || porEnunciados) {
			var res = (porEspacios) ? (correctas / totalPreguntas) : (enunciadosCorrectos / total);
			console.log("evaluacion con " + Math.floor(res));
			mostrarEval("", "", msg1 + msg2 + msg3 + asignarEvaluacion(Math.floor(10 * res)));
		}

		calificaciones.push(correctas);
		intCalif = calificaciones[tempCalif];
		iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
		for (var i = 0, len = calificaciones.length; i < len; i++) {
			if (maxCalif < calificaciones[i]) {
				maxCalif = calificaciones[i];
			}
		}
		if (guardarCalificacion == 0) { //ultimo intento
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, total);
		}

		if (guardarCalificacion == -1) { //intento mas alto
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, maxCalif, total);
		}

		if (guardarCalificacion > 0) {
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, intCalif, total);
		}
		console.log("Int Calif: " + intCalif)
		console.log("Max Calif: " + maxCalif)
	}
}