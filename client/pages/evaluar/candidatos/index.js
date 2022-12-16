import Layout from "../../../components/Layout";
import Dropdown from "../../../components/Dropdown";
import Button from "../../../components/Button";
import { colors } from "../../../styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EvaluarCandidatos = () => {
  const router = useRouter();
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    const { query } = router;
    if (!query.candidatos) {
      router.push("/evaluar");
    } else {
      const newCandidatos = JSON.parse(query.candidatos);
      setCandidatos(newCandidatos);
    }
  }, []);

  return (
    <>
      <Layout title="EVALUAR CANDIDATOS">
        <section className="container">
          <span>
            Seleccione la empresa y el puesto para el que desea evaluar a los
            candidatos seleccionados
          </span>
          <div className="dropdown-container">
            <div className="dropdown">
              <Dropdown placeholder="Empresa" name="empresa" dataKey="codigo" />
            </div>
            <div className="dropdown">
              <Dropdown
                placeholder="Funcion/Puesto"
                name="funcion"
                dataKey="codigo"
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Competencia</th>
                  <th>Puntos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Algun competencia</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Algun competencia</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Algun competencia</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Algun competencia</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="footer">
            <div className="button-container">
              <Button bgcolor={colors.primary}>SIGUIENTE</Button>
            </div>
          </div>
        </section>
      </Layout>
      <style jsx>{`
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
