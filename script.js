//REGISTRO

$(document).ready(function () {
  // Otro código aquí

  // Manejar clic en el botón de registro
  $("#btn-register").click(function () {
    // Ocultar el contenido de inicio de sesión
    $("div[data-target='Login']").hide();
    // Mostrar el formulario de registro
    $("#register-form").show();
  });
});

//INICIAR SESION

$(document).ready(function () {
  // Ocultar todos los contenidos de las pestañas excepto el primero
  $(".content > div").not(":first").hide();

  // Manejar el clic en los elementos del menú
  $("ul.navbar-nav li").click(function () {
    var target = $(this).data("target");
    $(".content > div").hide();
    $("div[data-target='" + target + "']").show();
  });

  // Manejar el envío del formulario de inicio de sesión
  $("form").submit(function (event) {
    // Evitar que el formulario se envíe de manera predeterminada
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    var username = $("#username").val();
    var password = $("#password").val();

    // Aquí puedes agregar la lógica para validar el nombre de usuario y la contraseña
    // Por ejemplo, podrías enviar una solicitud AJAX al servidor para verificar las credenciales
  });
});

//CALENDARIO

$(document).ready(function () {
  $("#calendar").fullCalendar({
    // Configuración del calendario aquí
    // Por ejemplo:
    defaultView: "month",
    events: [
      // Aquí puedes proporcionar eventos para mostrar en el calendario
    ],
  });
});

//MANEJO DE NAVEGACION

const targets = document.querySelectorAll("[data-target]");
const content = document.querySelectorAll("[data-content]");

$(document).ready(function () {
  // Ocultar todos los contenidos de las pestañas excepto el primero
  $(".content > div").not(":first").hide();

  // Manejar el clic en los elementos del menú
  $("ul.navbar-nav li").click(function () {
    var target = $(this).data("target");
    $(".content > div").hide();
    $("div[data-target='" + target + "']").show();
  });
});

targets.forEach((targert) => {
  target.addEventListener("click", () => {
    content.forEach((c) => {
      c.classList.remove("active");
    });

    const t = document.querySelector(target.dataset.target);
    t.classList.add("active");
  });
});

// Función para mostrar u ocultar la columna adicional según la pestaña seleccionada
function toggleSpecialColumn(target) {
  var specialColumn = document.querySelector(".special-column");
  var allowedTargets = [
    "RegistrarEvento",
    "Proveedores",
    "Presupuesto",
    "Informe",
  ];

  if (allowedTargets.includes(target)) {
    specialColumn.style.display = "block";
  } else {
    specialColumn.style.display = "none";
  }
}

// Evento para detectar el clic en una pestaña de navegación
document.querySelectorAll("ul.nav.navbar-nav li").forEach(function (item) {
  item.addEventListener("click", function () {
    var target = this.getAttribute("data-target");
    toggleSpecialColumn(target);
  });
});

//Seccion de Calendario

//check the console for date click event
//Fixed day highlight
//Added previous month and next month view

function CalendarControl() {
  const calendar = new Date();
  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calMonthName: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    daysInMonth: function (month, year) {
      return new Date(year, month, 0).getDate();
    },
    firstDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
    },
    lastDay: function () {
      return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
    },
    firstDayNumber: function () {
      return calendarControl.firstDay().getDay() + 1;
    },
    lastDayNumber: function () {
      return calendarControl.lastDay().getDay() + 1;
    },
    getPreviousMonthLastDate: function () {
      let lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: function () {
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToNextMonth: function () {
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: function () {
      let currentMonth = calendarControl.localDate.getMonth();
      let currentYear = calendarControl.localDate.getFullYear();
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },
    displayYear: function () {
      let yearLabel = document.querySelector(".calendar .calendar-year-label");
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: function () {
      let monthLabel = document.querySelector(
        ".calendar .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    selectDate: function (e) {
      console.log(
        `${e.target.textContent} ${
          calendarControl.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );
    },
    plotSelectors: function () {
      document.querySelector(
        ".calendar"
      ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
        <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
        <div class="calendar-year-month">
        <div class="calendar-month-label"></div>
        <div>-</div>
        <div class="calendar-year-label"></div>
        </div>
        <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
        </div>
        <div class="calendar-today-date">Today: 
          ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
          ${calendarControl.localDate.getDate()}, 
          ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
          ${calendarControl.localDate.getFullYear()}
        </div>
        <div class="calendar-body"></div></div>`;
    },
    plotDayNames: function () {
      for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
      }
    },
    plotDates: function () {
      document.querySelector(".calendar .calendar-body").innerHTML = "";
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl.prevMonthLastDate =
        calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );
      // dates of current month
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },
    attachEvents: function () {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      let nextBtn = document.querySelector(".calendar .calendar-next a");
      let todayDate = document.querySelector(".calendar .calendar-today-date");
      let dateNumber = document.querySelectorAll(".calendar .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      todayDate.addEventListener(
        "click",
        calendarControl.navigateToCurrentMonth
      );
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener(
          "click",
          calendarControl.selectDate,
          false
        );
      }
    },
    highlightToday: function () {
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
          [calendar.getDate() - 1].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: function (dates) {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll(".prev-dates")) {
          document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates: function () {
      let childElemCount =
        document.querySelector(".calendar-body").childElementCount;
      //7 lines
      if (childElemCount > 42) {
        let diff = 49 - childElemCount;
        calendarControl.loopThroughNextDays(diff);
      }

      //6 lines
      if (childElemCount > 35 && childElemCount <= 42) {
        let diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(42 - childElemCount);
      }
    },
    loopThroughNextDays: function (count) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector(
            ".calendar-body"
          ).innerHTML += `<div class="next-dates">${i}</div>`;
        }
      }
    },
    attachEventsOnNextPrev: function () {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
    init: function () {
      calendarControl.plotSelectors();
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
  };
  calendarControl.init();
}

const calendarControl = new CalendarControl();

// Fin de la Seccion de Calendario

//Nueva seccion de Calendario

// generate events
var eventDates = {};
let day1 = formatDate(new Date(new Date().setMonth(new Date().getMonth() + 1)));
eventDates[day1] = ["Event 1, Location", "Event 2, Location 2"];
let day2 = formatDate(new Date(new Date().setDate(new Date().getDate() + 40)));
eventDates[day2] = ["Event 2, Location 3"];

// set maxDates
var maxDate = {
  1: new Date(new Date().setMonth(new Date().getMonth() + 11)),
  2: new Date(new Date().setMonth(new Date().getMonth() + 10)),
  3: new Date(new Date().setMonth(new Date().getMonth() + 9)),
};

var flatpickr = $("#calendar .placeholder").flatpickr({
  inline: true,
  minDate: "today",
  maxDate: maxDate[3],
  showMonths: 1,
  enable: Object.keys(eventDates),
  disableMobile: "true",
  onChange: function (date, str, inst) {
    var contents = "";
    if (date.length) {
      for (i = 0; i < eventDates[str].length; i++) {
        contents +=
          '<div class="event"><div class="date">' +
          flatpickr.formatDate(date[0], "l J F") +
          '</div><div class="location">' +
          eventDates[str][i] +
          "</div></div>";
      }
    }
    $("#calendar .calendar-events").html(contents);
  },
  locale: {
    weekdays: {
      shorthand: ["S", "M", "T", "W", "T", "F", "S"],
      longhand: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  },
});

eventCaledarResize($(window));
$(window).on("resize", function () {
  eventCaledarResize($(this));
});

function eventCaledarResize($el) {
  var width = $el.width();
  if (flatpickr.selectedDates.length) {
    flatpickr.clear();
  }
  if (width >= 992 && flatpickr.config.showMonths !== 3) {
    flatpickr.set("showMonths", 3);
    flatpickr.set("maxDate", maxDate[3]);
  }
  if (width < 992 && width >= 768 && flatpickr.config.showMonths !== 2) {
    flatpickr.set("showMonths", 2);
    flatpickr.set("maxDate", maxDate[2]);
  }
  if (width < 768 && flatpickr.config.showMonths !== 1) {
    flatpickr.set("showMonths", 1);
    flatpickr.set("maxDate", maxDate[1]);
    $(".flatpickr-calendar").css("width", "");
  }
}

function formatDate(date) {
  let d = date.getDate();
  let m = date.getMonth() + 1; //Month from 0 to 11
  let y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}

//Cerrar seccion de Calendario

//Seccion de Registrar Evento
$(document).ready(function () {
  // Otras funciones aquí

  // Manejar clic en el botón de agregar invitado
  $("#btnAgregarInvitado").click(function () {
    $("#tablaInvitados tbody").append(
      `<tr>
              <td><input type="text" class="form-control" placeholder="Nombre" required></td>
              <td><input type="tel" class="form-control" placeholder="Teléfono" required></td>
              <td><input type="email" class="form-control" placeholder="Correo" required></td>
              <td><button type="button" class="btn btn-danger btnEliminarFila">Eliminar</button></td>
          </tr>`
    );
  });

  // Manejar clic en el botón de eliminar invitado
  $("#tablaInvitados").on("click", ".btnEliminarFila", function () {
    $(this).closest("tr").remove();
  });

  // Manejar envío del formulario de registro de evento
  $("#registroEventoForm").submit(function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    var nombreEvento = $("#nombreEvento").val();
    var fechaEvento = $("#fechaEvento").val();
    var horaEvento = $("#horaEvento").val();
    var ubicacionEvento = $("#ubicacionEvento").val();
    var tipoEvento = $("#tipoEvento").val();
    var invitacionEvento = $("#invitacionEvento").val();
    // Aquí puedes continuar con la lógica para procesar los datos del formulario
  });
});

//Fin de la Seccion de Registrar Evento

//Seccion de Proveedores
// Función para buscar proveedores
function buscarProveedores() {
  // Obtener valores de los campos de texto
  var servicio = document.getElementById("servicio").value;
  var ubicacion = document.getElementById("ubicacion").value;

  // Realizar lógica de búsqueda y mostrar los resultados en la página
}

// Función para seleccionar/deseleccionar proveedores
function toggleSeleccionado(checkbox) {
  if (checkbox.checked) {
    // Proveedor seleccionado
  } else {
    // Proveedor deseleccionado
  }
}

// Función para confirmar selección de proveedores
function confirmarSeleccion() {
  var checkboxes = document.querySelectorAll(
    '.proveedor input[type="checkbox"]'
  );
  var seleccionados = [];

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      var proveedor = checkbox.closest(".proveedor");
      var nombreProveedor = proveedor.querySelector("a").textContent;
      seleccionados.push(nombreProveedor);
    }
  });

  // Realizar alguna acción con los proveedores seleccionados
}
//Fin de la Seccion de Proveedores

//Seccion de la creacion de Nuevo Proveedor
$(document).ready(function () {
  // Maneja el clic en el botón para mostrar el formulario de registro
  $("#btnMostrarRegistroProveedor").click(function () {
    $(".registro-proveedor-form").show();
  });

  // Maneja el envío del formulario de registro de proveedor
  $("#registroProveedor").submit(function (event) {
    event.preventDefault();

    // Obtiene los datos del formulario
    var nombre = $("#nombreProveedor").val();
    var contacto = $("#contactoProveedor").val();
    var correo = $("#correoProveedor").val();
    var imagen = $("#imagenProveedor")[0].files[0];

    // Realiza alguna validación de datos aquí si es necesario

    // Simula el envío de datos al servidor
    console.log("Nombre: " + nombre);
    console.log("Contacto: " + contacto);
    console.log("Correo: " + correo);
    console.log("Imagen: " + imagen.name); // Muestra el nombre del archivo

    // Cierra el formulario de registro
    $(".registro-proveedor-form").hide();

    // Limpia el formulario para futuros usos
    $(this)[0].reset();
  });
});
//Fin de la Seccion de Creacion de nuevo Proveedor

//Seccion Lista de Deseos
// Manejo del formulario para agregar elementos a la lista de deseos
$("#formAgregarDeseo").submit(function (event) {
  event.preventDefault();
  var nuevoElemento = $("#elementoDeseado").val();
  $("#listaDeseos").append("<li>" + nuevoElemento + "</li>");
  // Aquí puedes agregar el código para guardar la lista en el almacenamiento local o en una base de datos
});

// Manejo de la selección de un planificador
$("#listaPlanificadores").on("click", ".btn-seleccionar", function () {
  // Aquí puedes agregar el código para seleccionar el planificador
});

// Manejo de la presentación del formulario de opinión
$("#listaPlanificadores").on("click", ".btn-opinion", function () {
  // Aquí puedes agregar el código para mostrar el formulario de opinión
});

// Manejo del formulario de opinión
$("#formularioOpinion").submit(function (event) {
  event.preventDefault();
  var calificacion = $("input[name=calificacion]:checked").val();
  var opinion = $("#opinion").val();
  // Aquí puedes agregar el código para enviar la calificación y la opinión del cliente
});

//Fin de la seccion de Lista de Deseos

//Seccion Evento Simple

// Función para mostrar el paso especificado
function mostrarPaso(numeroPaso) {
  // Ocultar todos los pasos
  $(".paso").hide();
  // Mostrar el paso especificado
  $("#paso" + numeroPaso).show();
}

// Función para avanzar al siguiente paso
function siguientePaso() {
  // Obtener el número del paso actual
  var pasoActual = $(".paso:visible").index() + 1;
  // Mostrar el siguiente paso
  mostrarPaso(pasoActual + 1);
}

// Función para retroceder al paso anterior
function anteriorPaso() {
  // Obtener el número del paso actual
  var pasoActual = $(".paso:visible").index() + 1;
  // Mostrar el paso anterior
  mostrarPaso(pasoActual - 1);
}

// Mostrar el primer paso al cargar la página
$(document).ready(function () {
  mostrarPaso(1);
});

//Fin de la Seccion de Evento Simple
