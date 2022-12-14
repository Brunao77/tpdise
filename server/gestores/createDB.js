import { Candidato } from "../models/Candidato.js";
import { Factor } from "../models/Factor.js"
import { Pregunta } from "../models/Pregunta.js"
import { Puesto } from "../models/Puesto.js";
import { Puntaje } from "../models/Puntaje.js";
import { Consultor } from "../models/Consultor.js";
import { Competencia } from "../models/Competencia.js";
import { Cuestionario } from "../models/Cuestionario.js";

export async function initDB(req, res){
  Competencia.bulkCreate([
    {
      codigo: "C001",
      nombre: "Competencia 1",
      descripcion: "Competencia de ejemplo para rellenar la tabla.",
    },
    {
      codigo: "C002",
      nombre: "Competencia 2",
      descripcion: "Competencia de ejemplo para rellenar la tabla.",
    }
  ])
  Pregunta.bulkCreate([
    {
      codigo: "P001",
      enunciado: "¿De que color es el caballo blanco de San Martín?",
      nombre: "Caballo de San Martín",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      factor: {
        nombre: "Factor 1",
        descripcion: "Factor de ejemplo para rellenar la tabla.",
        orden: "1",
        competenciaId: 1,
      },
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "Negro",
            descripcion: "Color negro",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Rojo",
            descripcion: "Color rojo",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "Blanco",
            descripcion: "Color blanco",
          }
        }
      ],
      opcionDeRespuesta: {
        nombre: "Opcion simple",
        descripcion: "Multiples opciones, solo se puede seleccionar una.",
      }
    },
    {
      codigo: "P002",
      enunciado: "¿Cuantos dias tiene el año?",
      nombre: "Dias del año",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "35",
            descripcion: "35 dias",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Muchos",
            descripcion: "Muchos dias",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "365",
            descripcion: "365 dias",
          }
        }
      ],
      factor: {
        nombre: "Factor 2",
        descripcion: "Factor de ejemplo para rellenar la tabla.",
        orden: "1",
        competenciaId: 2
      },
      opcionDeRespuestaId: 1,
    },
    {
      codigo: "P003",
      enunciado: "¿Cuantas semanas tiene el año?",
      nombre: "Semanas del año",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "5",
            descripcion: "5 semanas",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Muchas",
            descripcion: "Muchas semanas",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "52 y un poquito",
            descripcion: "mas de 52 y menos que 53",
          }
        }
      ],
      factorId: 2,
      opcionDeRespuestaId: 1,
    },
    {
      codigo: "P004",
      enunciado: "¿Cuantos meses tiene el año?",
      nombre: "Meses del año",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "3",
            descripcion: "3 meses",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Muchos",
            descripcion: "Muchos meses",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "12",
            descripcion: "12 meses",
          }
        }
      ],
      factor: {
        nombre: "Factor 3",
        descripcion: "Factor de ejemplo para rellenar la tabla.",
        orden: "1",
        competenciaId: 2,
      },
      opcionDeRespuestaId: 1,
    },
    {
      codigo: "P005",
      enunciado: "¿Pregunta de ejemplo 5?",
      nombre: "Pregunta de ejemplo",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "Ej.",
            descripcion: "Ejemplo",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Re.",
            descripcion: "Relleno",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "Messi",
            descripcion: "Messi",
          }
        }
      ],
      factorId: 2,
      opcionDeRespuestaId: 1,
    },
    {
      codigo: "P006",
      enunciado: "¿Pregunta de ejemplo 6?",
      nombre: "Pregunta de ejemplo",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "Ej.",
            descripcion: "Ejemplo",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Re.",
            descripcion: "Relleno",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "Messi",
            descripcion: "Messi",
          }
        }
      ],
      factorId: 2,
      opcionDeRespuestaId: 1,
    },
    {
      codigo: "P007",
      enunciado: "¿Pregunta de ejemplo 7?",
      nombre: "Pregunta de ejemplo",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "Ej.",
            descripcion: "Ejemplo",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Re.",
            descripcion: "Relleno",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "Messi",
            descripcion: "Messi",
          }
        }
      ],
      factorId: 1,
      opcionDeRespuestaId: 1,
    },
    {
      codigo: "P008",
      enunciado: "¿Pregunta de ejemplo 8?",
      nombre: "Pregunta de ejemplo",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "Ej.",
            descripcion: "Ejemplo",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Re.",
            descripcion: "Relleno",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "Messi",
            descripcion: "Messi",
          }
        }
      ],
      factorId: 1,
      opcionDeRespuestaId: 1,
    },
    {
      codigo: "P009",
      enunciado: "¿Pregunta de ejemplo 9?",
      nombre: "Pregunta de ejemplo",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "Ej.",
            descripcion: "Ejemplo",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Re.",
            descripcion: "Relleno",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "Messi",
            descripcion: "Messi",
          }
        }
      ],
      factorId: 3,
      opcionDeRespuestaId: 1,
    },
    {
      codigo: "P010",
      enunciado: "¿Pregunta de ejemplo 10?",
      nombre: "Pregunta de ejemplo",
      descripcion: "Pregunta de ejemplo para rellenar la tabla.",
      opciones: [
        {
          valor: 0,
          opcion: {
            nombre: "Ej.",
            descripcion: "Ejemplo",
          }
        },
        {
          valor: 0,
          opcion: {
            nombre: "Re.",
            descripcion: "Relleno",
          }
        },
        {
          valor: 10,
          opcion: {
            nombre: "Messi",
            descripcion: "Messi",
          }
        }
      ],
      factorId: 3,
      opcionDeRespuestaId: 1,
    },
  ], {
    include: [{
      association: Pregunta.Opciones,
      include: [Puntaje.Opcion]
    },
    {
      association: Pregunta.Factor,
    },
    {
      association: Pregunta.OpcionDeRespuesta,
    }
  ]
  });

  Puesto.bulkCreate([
    {
      codigo: "P001",
      nombre: "Puesto 1",
      descripcion: "Puesto de ejemplo para rellenar la tabla.",
      empresa: "E001",
      ponderaciones: [
        {
          idCompetencia: 1,
          valor: 5,
        },
        {
          idCompetencia: 2,
          valor: 5,
        },
      ]
    },
    {
      codigo: "P002",
      nombre: "Puesto 2",
      descripcion: "Puesto de ejemplo para rellenar la tabla.",
      empresa: "E002",
      ponderaciones: [
        {
          idCompetencia: 1,
          valor: 8,
        },
      ]
    },
    {
      codigo: "P003",
      nombre: "Puesto 3",
      descripcion: "Puesto de ejemplo para rellenar la tabla.",
      empresa: "E002",
      ponderaciones: [
        {
          idCompetencia: 2,
          valor: 8,
        },
      ]
    },
  ],{
    include: [{
      association: Puesto.Ponderaciones,
    }]
  })

  Candidato.bulkCreate([
    {
      tipoDoc: "DNI",
      documento: 23665784,
      nombre: "Juan",
      apellido: "Perez",
      nroCandidato: 147,
      cuestionarios: [
        {
          estado: "activo",
          fechaInicio: Date.now(),
          clave: "AS12DF34",
          registroEjecucion: {
            fechaInicio: null,
            fechaFin: null,
          }
        },
        {
          estado: "completo",
          fechaFin: "2022-11-25 23:05:10.155-03",
          clave: "ZX12CV34",
          registroEjecucion: {
            fechaInicio: "2022-10-25 23:05:10.155-03",
            fechaFin: "2022-11-05 23:05:10.155-03",
          }
        },
      ]
    },
    {
      tipoDoc: "DNI",
      documento: 37895466,
      nombre: "Jose",
      apellido: "Mariani",
      nroCandidato: 148,
      cuestionarios: [
        {
          estado: "incompleto",
          fechaInicio: "2022-10-25 23:05:10.155-03",
          fechaFin: "2022-11-05 23:05:10.155-03",
          clave: "AS12DF34",
          registroEjecucion: {
            fechaInicio: null,
            fechaFin: null,
          }
        }
      ]
    },
    {
      tipoDoc: "DNI",
      documento: 43265784,
      nombre: "Martin",
      apellido: "Rodriguez",
      nroCandidato: 149,
      cuestionarios: [
        {
          estado: "enProceso",
          fechaFin: "2022-12-31 23:05:10.155-03",
          clave: "AS12DF34",
          registroEjecucion: {
            fechaInicio: "2022-11-25 23:05:10.155-03",
            fechaFin: null,
          }
        }
      ]
    }
  ], {
    include: [{
      association: Candidato.Cuestionarios,
      include: Cuestionario.RegistroEjecucion,
    }]
  })

  Consultor.create({
    nombre: "Zama",
    password: "zama1234",
  })

  res.json({"ok": "ok"});
}