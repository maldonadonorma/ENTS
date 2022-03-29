/* 23/8/2021 */
/* Configuracion */
/* Completar eligiendo */


var maxIntentos = 100;
var siguienteIntentoBlanco = true;
var calificacionGlobal = false;
// var esTexto = true;

var carruselContinuo = false;
var elementosPorSegmento = 10;
var elementosPorSegmentoMovil = 1;
var reactivosMostrar = 4;
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;

var mezclarPreguntas = false;
var mezclarRespuestas = true;

var mostrarRetroArroba = true;
var mostrarRetroIndividual = !mostrarRetroArroba;
var mostrarRetroFinal = true;

var porEspacios = !calificacionGlobal;
var porEnunciados = !porEspacios;
var numeralAlfabetico = false;
var ponerNumeral = false;
var ponerNumeroPreguntas = false;

var seleccionRapida = true;

var retroCal = [
	{ LimInf: 0, LimSup: 1, Mensaje: ["Te invito a repasar nuevamente los temas vistos en la unidad. ", "Insufficient"] }
	, { LimInf: 2, LimSup: 3, Mensaje: ["Presta atención a las oraciones y conceptos clave, esto te facilitará la realización de este ejercicio y te permitirá desenvolverte en el manejo del lenguaje de los temas siguientes.", "Work harder"] }
	, { LimInf: 4, LimSup: 6.7, Mensaje: ["Tuviste algunos errores en este ejercicio. Consulta nuevamente el material de lectura e inténtalo de nuevo para obtener un mejor puntaje.", "Sufficient"] }
	, { LimInf: 7, LimSup: 9.5, Mensaje: ["Tuviste un par de errores, pero no te desanimes. Lee con atención los enunciados e intenta de nuevo para obtener un mejor puntaje. ", "Sufficient"] }
	, { LimInf: 10, LimSup: 10, Mensaje: ["¡Excelente trabajo! Recuerda que la demografía se apoya en la estadística para estudiar las poblaciones humanas. El análisis, registro y consulta de las tendencias de la dinámica poblacional aportan un importante recurso para proponer alternativas de solución a la distribución de recursos y riqueza que fomenten una adecuada convivencia con el medio.", "Excellent"] }
];

/* ------------------------------- */

var flechaArriba = false;

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;

var guardarCalificacion = 0;

var idioma = "ESP";
var debug = false;
var verLongitud = false;

var intentos = 0;
var correctas = 0;
var contestadas = 0;
var totalPreguntas = 0;

