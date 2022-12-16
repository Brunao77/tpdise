import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import { colors } from "../../../styles";

const Finalizar = () => {
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
            <tr>
              <td>Algun Nombre</td>
              <td>Algun Apellido</td>
              <td>DNI</td>
              <td>4444444</td>
              <td>Algun Clave</td>
            </tr>
            <tr>
              <td>Algun Nombre</td>
              <td>Algun Apellido</td>
              <td>DNI</td>
              <td>4444444</td>
              <td>Algun Clave</td>
            </tr>
            <tr>
              <td>Algun Nombre</td>
              <td>Algun Apellido</td>
              <td>DNI</td>
              <td>4444444</td>
              <td>Algun Clave</td>
            </tr>
          </tbody>
        </table>
        <footer>
          <div className="btn-cont">
            <Button bgcolor={colors.secondary}>CANCELAR</Button>
          </div>
          <div className="btn-cont">
            <Button bgcolor={colors.primary}>FINALIZAR</Button>
          </div>
        </footer>
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