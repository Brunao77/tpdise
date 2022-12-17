import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { colors } from "../../styles";
import { useRouter } from "next/router";

const STATES = {
  SEARCH: 0,
  LIST: 1,
};

const Columns = [
  { Header: "NOMBRE", accessor: "nombre" },
  { Header: "APELLIDO", accessor: "apellido" },
  { Header: "NRO CANDIDATO", accessor: "nroCandidato" },
  { Header: "", accessor: "select" },
];
const Evaluar = () => {
  const [sectionSelected, setSectionSelected] = useState(STATES.SEARCH);
  const [data, setData] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    nroCandidato: "",
  });
  const [errors, setErrors] = useState({});
  const [eliminados, setEliminados] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:3000/api/candidato");
      const res = await response.json();
      const newData = res.map((dato) => {
        return { ...dato, selected: false };
      });
      setData(newData);
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value.toUpperCase(),
    });
  };

  const selectData = (nroCandidato) => {
    const newData = data.map((dato) => {
      if (dato.nroCandidato === nroCandidato)
        return { ...dato, selected: !dato.selected };
      return dato;
    });
    setData(newData);
  };

  const addCandidato = () => {
    const newCandidatos = data.filter((dato) => dato.selected === true);
    setCandidatos(newCandidatos.map((cand) => ({ ...cand, selected: false })));
  };

  const selectCandidato = (index) => {
    const newCandidatos = candidatos.map((candidato, i) => {
      if (i === index) return { ...candidato, selected: !candidato.selected };
      return candidato;
    });
    setCandidatos(newCandidatos);
  };

  const removeCandidato = () => {
    const newCandidatos = candidatos.filter((dato) => dato.selected === false);
    setCandidatos(newCandidatos);
  };

  const formValidate = () => {
    let err = {};
    if (form.nombre.length > 50)
      err.nombre = "Nombre tener menos de 50 carácteres";
    if (form.apellido.length > 50)
      err.apellido = "Apellido tener menos de 50 carácteres";
    if (
      form.apellido.length === 0 &&
      form.nombre.length === 0 &&
      form.nroCandidato.length === 0
    ) {
      err.nombre = "Nombre está vacío";
      err.apellido = "Apellido está vacío";
    }
    setErrors(err);
    return err;
  };

  const searchCandidatos = (e) => {
    e.preventDefault();
    const err = formValidate();
    if (JSON.stringify(err) === "{}") {
      // Haces un array de entries del objeto `form` y sacas los vacíos
      const filters = Object.entries(form).filter(
        ([key, value]) => value !== ""
      );

      // Usas ese array de entries para aplicar los filtros:
      const sortData = data.filter((item) =>
        filters.every(([key, value]) =>
          key !== "nroCandidato"
            ? item[key].includes(value)
            : item[key] == value
        )
      );
      setSortData(sortData);
    }
  };

  const handleSiguienteAEvaluar = async () => {
    const listNumberCand = candidatos.map((cand) =>
      parseInt(cand.nroCandidato)
    );
    const response = await fetch(
      "http://localhost:3000/api/candidato/verificar",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listNumberCand),
      }
    );
    const res = await response.json();
    if (res.eliminados.length !== 0) {
      setEliminados(res.eliminados);
    } else {
      router.push(
        {
          pathname: "/evaluar/candidatos",
          query: { candidatos: JSON.stringify(candidatos) },
        },
        "evaluar/candidatos"
      );
    }
  };

  return (
    <>
      <Layout title="EVALUAR CANDIDATOS">
        <section className="container">
          <div>
            <button
              onClick={() => setSectionSelected(STATES.SEARCH)}
              className={
                sectionSelected === STATES.SEARCH && "section-selected"
              }
            >
              BUSCAR CANDIDATOS
            </button>
            <button
              onClick={() => setSectionSelected(STATES.LIST)}
              className={sectionSelected === STATES.LIST && "section-selected"}
            >
              CANDIDATOS A EVALUAR
            </button>
          </div>
          {sectionSelected === STATES.SEARCH ? (
            <>
              <form className="search" onSubmit={searchCandidatos}>
                <div className="inpt-cont">
                  <Input
                    placeholder="Nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    err={errors.nombre}
                  />
                </div>
                <div className="inpt-cont">
                  <Input
                    placeholder="Apellido"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    err={errors.apellido}
                  />
                </div>
                <input
                  type="number"
                  name="nroCandidato"
                  placeholder="Nro Candidato"
                  min="0"
                  max="9999999999"
                  value={form.nroCandidato}
                  onChange={handleChange}
                />
                <div className="btn-search-cont">
                  <Button bgcolor={colors.primary}>BUSCAR</Button>
                </div>
              </form>
              {sortData.length === 0 ? (
                <h1>No existen candidatos</h1>
              ) : (
                <>
                  <table>
                    <thead>
                      <tr>
                        {Columns.map((column, index) => (
                          <th key={index}>{column.Header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortData.map((dato, index) => (
                        <tr
                          key={index}
                          onClick={() => {
                            selectData(dato.nroCandidato);
                            dato.selected = !dato.selected;
                          }}
                        >
                          <td>{dato.nombre}</td>
                          <td>{dato.apellido}</td>
                          <td>{dato.nroCandidato}</td>
                          <td>
                            <div
                              className={`check ${
                                dato.selected && "isSelected"
                              }`}
                            ></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="btn-cont">
                    <Button
                      bgcolor={colors.primary}
                      onClick={() => addCandidato()}
                    >
                      AGREGAR
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : candidatos.length === 0 ? (
            <h1>Se debe seleccionar 1 o más candidatos</h1>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    {Columns.map((column, index) => (
                      <th key={index}>{column.Header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {candidatos.map((candidato, index) => (
                    <tr
                      key={index}
                      className={
                        eliminados.includes(candidato.nroCandidato) &&
                        "isEliminado"
                      }
                      onClick={() => selectCandidato(index)}
                    >
                      <td>{candidato.nombre}</td>
                      <td>{candidato.apellido}</td>
                      <td>{candidato.nroCandidato}</td>
                      <td>
                        <div
                          className={`check ${
                            candidato.selected && "isSelected"
                          }`}
                        ></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="btn-section">
                {eliminados.length !== 0 && (
                  <span className="info-footer">
                    Hay candidatos que tienen cuestionarios activos o en
                    proceso.
                  </span>
                )}
                <div className="btn-cont">
                  <Button
                    bgcolor={colors.secondary}
                    onClick={() => removeCandidato()}
                  >
                    QUITAR
                  </Button>
                </div>
                <div className="btn-cont">
                  <Button
                    bgcolor={colors.primary}
                    onClick={() => handleSiguienteAEvaluar()}
                  >
                    SIGUIENTE
                  </Button>
                </div>
              </div>
            </>
          )}
        </section>
      </Layout>
      <style jsx>{`
        .info-footer {
          color: #ff6f6f;
          font-size: 20px;
          font-weight: 600;
        }
        .isEliminado {
          background: #ffc6c6;
        }
        .btn-search-cont {
          width: 200px;
        }
        .inpt-cont {
          width: 300px;
          height: 100%;
        }
        .container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;
          width: 50vw;
        }
        input {
          border-radius: 10px;
          outline: none;
          padding: 5px;
          font-weight: 600;
          height: 95%;
          border: 1px solid ${colors.black};
        }
        button {
          width: 100px;
          height: 50px;
          border: none;
          cursor: pointer;
        }
        .section-selected {
          background: #878787;
          color: #fff;
        }
        .btn-section {
          display: flex;
          gap: 10px;
          align-self: end;
        }
        .search {
          display: flex;
          gap: 20px;
          width: 100%;
          align-items: center;
          justify-content: center;
          height: 40px;
        }
        .check {
          border: 1px solid #000;
          width: 20px;
          height: 20px;
        }
        .isSelected {
          background: #6b70cf;
        }
        .btn-cont {
          width: 200px;
          align-self: end;
        }
        table {
          border: none;
          border-collapse: collapse;
          width: 100%;
          max-width: 100%;
          white-space: nowrap;
          background-color: white;
          display: block;
          height: 40vh;
          overflow: auto;
          margin-bottom: 90px;
        }
        table td,
        table th {
          text-align: center;
          padding: 8px;
          border: 1px solid #ddd;
        }
        table th {
          background-color: #8e8e93;
          color: white;
          position: sticky;
          top: 0;
        }
        table tr:nth-child(even) {
          background-color: #e9ebec;
        }
        table tr:hover {
          background-color: #dbdbdb;
        }
        table th:not(:last-child) {
          width: 310px;
        }
        table th:last-child {
          width: 50px;
        }
        table td {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Evaluar;
