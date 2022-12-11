import Layout from "../../../components/Layout";

const Finalizar = () => {
  return (
    <>
      <Layout title="EVALUAR CANDIDATOS">
        <table>
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dato, index) => (
              <tr key={index} onClick={() => selectData(index)}>
                <td>{dato.nombre}</td>
                <td>{dato.apellido}</td>
                <td>{dato.nroCandidato}</td>
                <td>
                  <div
                    className={`check ${dato.selected && "isSelected"}`}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
      <style jsx>{``}</style>
    </>
  );
};

export default Finalizar;
