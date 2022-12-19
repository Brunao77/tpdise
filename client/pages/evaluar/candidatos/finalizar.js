import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import { colors } from "../../../styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import ModalFinalizar from "../../../components/ModalFinalizar";

const Finalizar = () => {
  const router = useRouter();
  const [candidatos, setCandidatos] = useState([]);
  const [puesto, setPuesto] = useState("");
  const [success, setSucces] = useState(false);

  useEffect(() => {
    setCandidatos(JSON.parse(router.query.candidatos));
    setPuesto(JSON.parse(router.query.puesto));
  }, []);

  const handleCancelar = () => {
    router.push("/evaluar");
  };

  const handleFinalizar = async () => {
    const claves = candidatos.map((c) => {
      return { candidato: c.nroCandidato, clave: c.clave };
    });
    const response = await fetch("http://localhost:3000/api/evaluaciones/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigoPuesto: puesto, claves }),
    });
    const res = await response.json();
    setSucces(true);
  };
  return (
    <>
      <Layout title="EVALUAR CANDIDATOS">
        <table>
          <thead>
            <tr>
              <th>APELLIDO</th>
              <th>NOMBRE</th>
              <th>TIPO</th>
              <th>DOCUMENTO</th>
              <th>CLAVE DE INGRESO</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.map((candidato) => {
              return (
                <tr>
                  <td>{candidato.nombre}</td>
                  <td>{candidato.apellido}</td>
                  <td>{candidato.tipoDoc}</td>
                  <td>{candidato.documento}</td>
                  <td>{candidato.clave}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <footer>
          <div className="btn-cont">
            <Button bgcolor={colors.secondary} onClick={handleCancelar}>
              CANCELAR
            </Button>
          </div>
          <div className="btn-cont">
            <Button bgcolor={colors.primary} onClick={handleFinalizar}>
              FINALIZAR
            </Button>
          </div>
        </footer>
        {success && <ModalFinalizar></ModalFinalizar>}
      </Layout>
      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          padding: 80px;
          gap: 20px;
          display: flex;
          align-items: center;
          justify-content: end;
        }
        .btn-cont {
          width: 200px;
        }
        table {
          border: none;
          border-collapse: collapse;
          width: 100%;
          max-width: 700px;
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
        table th {
          width: 200px;
        }
        table td {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Finalizar;
