import Layout from "../../../components/Layout";
import Dropdown from "../../../components/Dropdown";
import Button from "../../../components/Button";
import { colors } from "../../../styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EvaluarCandidatos = () => {
  const router = useRouter();
  const [puestos, setPuestos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [puestosSort, setPuestosSort] = useState([]);
  const [empresasSort, setEmpresasSort] = useState([]);
  const [form, setForm] = useState({
    empresa: "",
    puesto: "",
  });
  const [ponderaciones, setPonderaciones] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { query } = router;
    if (!query.candidatos) {
      router.push("/evaluar");
    } else {
      const loadPuestos = async () => {
        const response = await fetch("http://localhost:3000/api/puesto");
        const res = await response.json();
        setPuestos(res);
        const newEmpresas = puestos.reduce((acc, item) => {
          if (!acc.includes(item.empresa)) {
            acc.push(item.empresa);
          }
          return acc;
        }, []);
        setEmpresas(newEmpresas);
        setPuestosSort(res);
        setEmpresasSort(newEmpresas);
      };
      loadPuestos();
    }
  }, []);

  const handleEmpresa = (e) => {
    setPonderaciones([]);
    if (!e) {
      setForm({ ...form, empresa: "" });
      return setPuestosSort(puestos);
    }
    setForm({ ...form, empresa: e });
    const newPuestos = puestos.filter((puesto) => puesto.empresa === e);
    setPuestosSort(newPuestos);
  };

  const handlePuesto = (e) => {
    setPonderaciones([]);
    if (!e) {
      setForm({ ...form, puesto: "" });
      return setEmpresasSort(empresas);
    }
    setForm({ ...form, puesto: e.codigo });
    const newEmpresas = puestos.reduce((acc, item) => {
      if (item.nombre === e.nombre && !acc.includes(item.empresa)) {
        acc.push(item.empresa);
      }
      return acc;
    }, []);
    setEmpresasSort(newEmpresas);
  };

  const handleSearch = async () => {
    if (!form.puesto) return;
    const response = await fetch(
      `http://localhost:3000/api/puesto/ponderaciones/${form.puesto}`
    );
    const res = await response.json();
    setPonderaciones(res.ponderaciones);
  };

  const handleSiguiente = async () => {
    let err = {};
    const arr = ponderaciones.find(
      (ponderacion) => ponderacion.esEvaluable === false
    );
    if (arr) err.ponderaciones = "Existen competencias no evaluables";
    if (!form.puesto) err.puesto = "No selecciono puesto";
    if (!form.empresa) err.empresa = "No selecciono empresa";
    setErrors(err);
    
    const response = await fetch("http://localhost:3000/api/evaluaciones/claves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(JSON.parse(router.query.candidatos)),
    });
    const res = await response.json();
    console.log(res);

    if (Object.keys(err).length === 0) {
      router.push(
        {
          pathname: "/evaluar/candidatos/finalizar",
          query: { candidatos: JSON.stringify(res), puesto: JSON.stringify(form.puesto) },
        },
        "evaluar/candidatos"
      );
    }
  };
  console.log(ponderaciones);
  return (
    <>
      <Layout title="EVALUAR CANDIDATOS">
        <section className="container">
          <span>
            Seleccione la empresa y el puesto para el que desea evaluar a los
            candidatos seleccionados
          </span>
          <section className="cont-search">
            <div className="dropdown-container">
              <div className="dropdown">
                <Dropdown
                  placeholder="Funcion/Puesto"
                  data={puestosSort}
                  textField="nombre"
                  name="funcion"
                  dataKey="codigo"
                  onChange={(e) => handlePuesto(e)}
                  err={errors.puesto}
                />
              </div>
              <div className="dropdown">
                <Dropdown
                  placeholder="Empresa"
                  data={empresasSort}
                  name="empresa"
                  onChange={(e) => handleEmpresa(e)}
                  err={errors.empresa}
                />
              </div>
            </div>

            <div className="btn-search-cont">
              <Button bgcolor={colors.primary} onClick={() => handleSearch()}>
                BUSCAR
              </Button>
            </div>
          </section>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Competencia</th>
                  <th>Puntos</th>
                </tr>
              </thead>
              <tbody>
                {ponderaciones.map((ponderacion, index) => {
                  return (
                    <tr
                      key={index}
                      className={!ponderacion.esEvaluable && "notValuable"}
                    >
                      <td>{ponderacion.competencia.nombre}</td>
                      <td>{ponderacion.valor}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="footer">
            {errors.ponderaciones && (
              <span className="err-info">{err.ponderaciones}</span>
            )}
            <div className="button-container">
              <Button bgcolor={colors.primary} onClick={handleSiguiente}>
                SIGUIENTE
              </Button>
            </div>
          </div>
        </section>
      </Layout>
      <style jsx>{`
        .err-info {
          color: #ff6f6f;
          font-size: 20px;
          font-weight: 600;
        }
        .notValuable {
          background: #ffc6c6;
        }
        .cont-search {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 20px;
        }
        .btn-search-cont {
          width: 150px;
          height: 20px;
        }
        .container {
          width: 100%;
          height: 100%;
        }
        .dropdown-container {
          display: flex;
          align-items: center;
          padding: 10px 0 0 0;
          justify-content: center;
          gap: 50px;
        }
        .dropdown {
          width: 300px;
        }
        .table-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer {
          display: flex;
          align-items: center;
          gap: 50px;
          justify-content: end;
          padding-right: 200px;
        }

        .button-container {
          width: 200px;
        }
        table {
          border: none;
          border-collapse: collapse;
          width: 100%;
          max-width: 400px;
          white-space: nowrap;
          background-color: white;
          display: block;
          height: 40vh;
          overflow: auto;
          margin-top: 30px;
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

export default EvaluarCandidatos;
