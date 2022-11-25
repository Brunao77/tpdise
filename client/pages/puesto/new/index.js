import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { colors } from "../../../styles";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ButtonLink from "../../../components/ButtonLink";
import Dropdown from "../../../components/Dropdown";

const newPuesto = ({ competencias }) => {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    empresa: "",
    competencias: [],
  });
  const [errors, setErrors] = useState({});

  const addCompetencia = () => {
    setForm({
      ...form,
      ["competencias"]: [
        ...form["competencias"],
        { codigo: "", ponderacion: "", err: { codigo: "", ponderacion: "" } },
      ],
    });
  };

  const handleEliminar = (index) => {
    const tmp = form["competencias"];
    tmp.splice(index, 1);
    setForm((form) => ({
      ...form,
      ["competencias"]: [...tmp],
    }));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value.toUpperCase(),
    });
  };

  const handleChangeComp = (e, index) => {
    const { value, name } = e;

    const tmp = form["competencias"];
    name === "competencia"
      ? (tmp[index].codigo = value)
      : (tmp[index].ponderacion = value);
    setForm((form) => ({
      ...form,
      ["competencias"]: tmp,
    }));
  };

  const formValidate = async () => {
    let err = {};

    if (!form.codigo) err.codigo = "Código es requerido";

    if (form.codigo.length > 20)
      err.codigo = "Código tener menos de 20 carácteres";

    if (!err.codigo) {
      const response = await fetch(
        `http://localhost:3000/api/puesto/${form.codigo}`
      );
      const existeCodigo = await response.json();

      if (existeCodigo) err.codigo = "Existe puesto con codigo";
    }

    if (!form.nombre) err.nombre = "Nombre es requerido";

    if (form.nombre.length > 50)
      err.nombre = "Nombre tener menos de 50 carácteres";

    if (!form.empresa) err.empresa = "Empresa es requerido";

    if (form.empresa.length > 50)
      err.empresa = "Empresa tener menos de 50 carácteres";

    const tmp = form["competencias"];

    tmp.map(async (c) => {
      c.err.codigo = "";
      c.err.ponderacion = "";

      if (!c.codigo) {
        c.err.codigo = "Competencia es requerido";
        err.competencias = true;
      }

      if (c.codigo.length > 50) {
        c.err.codigo = "Competencia tener menos de 50 carácteres";
        err.competencias = true;
      }

      if (
        !competencias.find(
          (competencia) => competencia.codigo === c.codigo
        )
      ) {
        c.err.codigo = "No existe competencia con codigo";
        err.competencias = true;
      }

      if (c.ponderacion < 0 || c.ponderacion > 10 || !c.ponderacion) {
        c.err.ponderacion = "Puntos debe estar entre 0 y 10";
        err.competencias = true;
      }
    });

    setForm((form) => ({
      ...form,
      ["competencias"]: tmp,
    }));

    setErrors(err);
    return err;
  };

  const handleAceptButton = async () => {
    const err = await formValidate();
    console.log(JSON.stringify(err));
    if (JSON.stringify(err) === "{}") {
      const { codigo, nombre, descripcion, empresa, competencias } = form;
      const data = {
        codigo,
        nombre,
        descripcion,
        empresa,
        competencias: competencias.map((competencia) => {
          return {
            codigo: competencia.codigo,
            ponderacion: competencia.ponderacion,
          };
        }),
      };
      console.log(data);
      const response = await fetch("http://localhost:3000/api/puesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
    }
  };

  return (
    <>
      <Layout title="NUEVO PUESTO">
        <div className="sup">
          <span>Ingrese datos y características del puesto</span>
          <section className="inputs">
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
          </section>
          <section className="comps-container" style={{ height: "100%" }}>
            <div className="comps-head">
              <span>Características del Puesto</span>
              <button onClick={addCompetencia}>
                <img src="/plus.svg" />
              </button>
            </div>
            <div className="comps" style={{ height: "100%" }}>
              {form["competencias"].map((competencia, index) => {
                return (
                  <section key={index} className="new-comps">
                    <Dropdown
                      placeholder="Competencia"
                      name="competencia"
                      data={competencias}
                      dataKey="codigo"
                      textField="nombre"
                      onChange={(e) => {
                        competencia.codigo = e.codigo;
                        const obj = { name: "competencia", value: e.codigo };
                        handleChangeComp(obj, index);
                      }}
                      value={competencia.competencia}
                      err={competencia.err.codigo}
                    />
                    <div className="container-input-pond">
                      <input
                        type="number"
                        name="puntos"
                        placeholder="Puntos"
                        min="0"
                        max="10"
                        value={competencia.ponderacion}
                        onChange={(e) => {
                          handleChangeComp(e.target, index);
                        }}
                        className="pond-input"
                      />
                      {competencia.err.ponderacion && (
                        <span className="pond-error">
                          {competencia.err.ponderacion}
                        </span>
                      )}
                    </div>
                    <Button
                      bgcolor={colors.secondary}
                      onClick={() => handleEliminar(index)}
                    >
                      ELIMINAR
                    </Button>
                  </section>
                );
              })}
            </div>
          </section>
        </div>
        <div className="inf">
          <ButtonLink bgcolor={colors.secondary} href="/puesto">
            CANCELAR
          </ButtonLink>
          <Button bgcolor={colors.primary} onClick={handleAceptButton}>
            ACEPTAR
          </Button>
        </div>
      </Layout>
      <style jsx>{`
        input {
          border-radius: 10px;
          outline: none;
          padding: 5px;
          font-weight: 600;
          width: 30vh;
          border: 1px solid ${colors.black};
        }
        .comps-search {
          display: flex;
          flex-direction: column;
          position: relative;
          height: 10vh;
        }
        .search-term {
          overflow: auto;
          position: absolute;
          z-index: 1000;
          top: 100%;
        }
        .sup {
          width: 100%;
          height: 100%;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .inf {
          display: flex;
          flex-direction: row;
          justify-content: end;
          padding-right: 60px;
          gap: 20px;
          width: 100%;
        }
        .inputs {
          display: flex;
          align-self: center;
          justify-content: space-between;
          width: 90%;
          height: 40px;
        }
        .comps-container {
          align-self: center;
          width: 90%;
        }
        .comps-head {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-bottom: 5px;
          max-height: 35px;
          border-bottom: 1px solid ${colors.black};
        }
        .comps {
          margin-top: 10px;
          height: 100%;
          max-height: 40vh;
          display: flex;
          flex-direction: column;
          gap: 15px;
          overflow: auto;
        }
        button {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid ${colors.black};
          background: none;
          cursor: pointer;
        }
        .new-comps {
          display: flex;
          gap: 20px;
          width: 100%;
          justify-content: space-between;
          height: 40px;
        }
        .container-input-pond {
          display: flex;
          flex-direction: column;
          gap: 5px;
          height: 100%;
        }
        .pond-error {
          color: ${colors.secondary};
          height: 5%;
          font-size: 12px;
        }
        .pond-input {
          height: 95%;
        }
      `}</style>
    </>
  );
};

export default newPuesto;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/competencia");
  const competencias = await res.json();
  return {
    props: {
      competencias,
    },
  };
}
