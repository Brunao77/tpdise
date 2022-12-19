import ButtonLink from "../../components/ButtonLink";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { colors } from "../../styles";
import { useEffect, useState } from "react";

const Columns = [
  { Header: "CODIGO", accessor: "codigo" },
  { Header: "NOMBRE", accessor: "nombre" },
  { Header: "EMPRESA", accessor: "empresa" },
  { Header: "", accessor: "select" },
];

const Puesto = () => {
  const [data, setData] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [dataSelect, setDataSelect] = useState();
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    empresa: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("http://localhost:3000/api/puesto");
      const res = await response.json();
      setData(res);
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

  const selectData = (id) => {
    if (dataSelect && dataSelect.id === id) return setDataSelect();
    setDataSelect(data.find((dato) => dato.id === id));
  };

  const formValidate = () => {
    let err = {};
    if (form.nombre.length > 50)
      err.nombre = "Nombre tener menos de 50 carácteres";
    if (form.empresa.length > 50)
      err.empresa = "Empresa tener menos de 50 carácteres";
    if (
      form.empresa.length === 0 &&
      form.nombre.length === 0 &&
      form.codigo.length === 0
    ) {
      err.nombre = "Nombre está vacío";
      err.apellido = "Apellido está vacío";
    }
    setErrors(err);
    return err;
  };

  const searchCandidato = () => {
    const err = formValidate();
    if (JSON.stringify(err) === "{}") {
      // Haces un array de entries del objeto `form` y sacas los vacíos
      const filters = Object.entries(form).filter(
        ([key, value]) => value !== ""
      );

      // Usas ese array de entries para aplicar los filtros:
      const sortData = data.filter((item) =>
        filters.every(([key, value]) => item[key].includes(value))
      );
      setSortData(sortData);
    }
  };

  const deleteHandle = async () => {
    await fetch("http://localhost:3000/api/puesto", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codigo: dataSelect.id,
      }),
    });
    const newData = data.filter((dato) => dato.id !== dataSelect.id);
    setData(newData);
    const newSortData = sortData.filter((dato) => dato.id !== dataSelect.id);
    setSortData(newSortData);
  };

  return (
    <>
      <Layout title="GESTIONAR PUESTOS">
        <section className="search">
          <Input
            placeholder="Código"
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            err={errors.codigo}
          />
          <Input
            placeholder="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            err={errors.nombre}
          />
          <Input
            placeholder="Empresa"
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
            err={errors.empresa}
          />
          <div className="btn">
            <Button bgcolor={colors.primary} onClick={searchCandidato}>
              BUSCAR
            </Button>
          </div>
        </section>
        {sortData.length === 0 ? (
          <h1>No existen puestos</h1>
        ) : (
          <>
            <div className="table-cont">
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
                        selectData(dato.id);
                      }}
                    >
                      <td>{dato.codigo}</td>
                      <td>{dato.nombre}</td>
                      <td>{dato.empresa}</td>
                      <td>
                        <div
                          className={`check ${
                            dataSelect &&
                            dato.id === dataSelect.id &&
                            "isSelected"
                          }`}
                        ></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <section className="options">
          <ButtonLink bgcolor={colors.primary} href="/puesto/new">
            NUEVO
          </ButtonLink>
          {dataSelect && (
            <>
              <div className="btn">
                <Button bgcolor={colors.secondary} onClick={deleteHandle}>
                  ELIMINAR
                </Button>
              </div>
              <div className="btn">
                <Button bgcolor={colors.primary}>MODIFICAR</Button>
              </div>
            </>
          )}
        </section>
      </Layout>
      <style jsx>{`
        .table-cont {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .check {
          border: 1px solid #000;
          width: 20px;
          height: 20px;
        }
        .isSelected {
          background: #6b70cf;
        }
        .btn {
          width: 200px;
        }
        .search {
          display: flex;
          gap: 20px;
          width: 100%;
          justify-content: center;
          height: 40px;
        }
        .options {
          display: flex;
          gap: 20px;
          width: 100%;
          padding-right: 20px;
          justify-content: end;
        }
        table {
          border: none;
          border-collapse: collapse;
          width: 100%;
          max-width: 1000px;
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

export default Puesto;
