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
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setSearchTerm();
  }, []);

  const addCompetencia = () => {
    setForm({
      ...form,
      ["competencias"]: [
        ...form["competencias"],
        { codigo: "", puntos: "", err: { competencia: "", puntos: "" } },
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
      : (tmp[index].puntos = value);
    setForm((form) => ({
      ...form,
      ["competencias"]: tmp,
    }));
  };

  const formValidate = () => {
    let err = {};

    if (!form.codigo) err.codigo = "Código es requerido";

    if (form.codigo.length > 20)
      err.codigo = "Código tener menos de 20 carácteres";

    if (!form.nombre) err.nombre = "Nombre es requerido";

    if (form.nombre.length > 50)
      err.nombre = "Nombre tener menos de 50 carácteres";

    if (!form.empresa) err.empresa = "Empresa es requerido";

    if (form.empresa.length > 50)
      err.empresa = "Empresa tener menos de 50 carácteres";

    const tmp = form["competencias"];

    tmp.map((c) => {
      c.err.competencia = "";
      c.err.puntos = "";
      if (!c.competencia)
        c.err.competencia = "Competencia es requerido";

      if (c.competencia.length > 50)
        c.err.competencia =
          "Competencia tener menos de 50 carácteres";

      if (
        c.puntos < 0 ||
        c.puntos > 10 ||
        !c.puntos
      )
        c.err.puntos = "Puntos debe estar entre 0 y 10";
    });

    setForm((form) => ({
      ...form,
      ["competencias"]: tmp,
    }));

    setErrors(err);
    return err;
  };

  const handleAceptButton = async () => {
    const err = formValidate();

    if (JSON.stringify(err) === '{}') {
      const { codigo, nombre, descripcion, empresa, competencias } = form;
      const data = {
        codigo,
        nombre,
        descripcion,
        empresa,
        competencias,
      };
      console.log(data)
      const response = await fetch("http://localhost:3000/api/puesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
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
          <section className="comps-container" style={{height: "100%"}}>
            <div className="comps-head">
              <span>Características del Puesto</span>
              <button onClick={addCompetencia}>
                <img src="/plus.svg" />
              </button>
            </div>
            <div className="comps" style={{height: "100%"}}>
              {form["competencias"].map((caracteristica, index) => {
                return (
                  <section key={index} className="new-comps">
                    {/* <Input
                      placeholder="Competencia"
                      name="competencia"
                      value={caracteristica.competencia}
                      onChange={(e) => {
                        handleChangeComp(e, index);

                        e.target.value.length >= 3
                          ? setSearchTerm(e.target.value)
                          : setSearchTerm(undefined);
                      }}
                      err={caracteristica.err.competencia}
                    /> */}
                    <Dropdown 
                      placeholder="Competencia"
                      name="competencia"
                      data={competencias}
                      dataKey='codigo'
                      textField='nombre'
                      onChange={(e) => {
                        caracteristica.competencia=e.codigo
                        const obj = {name: "competencia", value: e.codigo}
                        handleChangeComp(obj, index);
                      }}
                      err={caracteristica.err.competencia}
                    />
                    <input
                      type="number"
                      name="puntos"
                      placeholder="Puntos"
                      min="0"
                      max="10"
                      value={caracteristica.puntos}
                      onChange={(e) => {
                        handleChangeComp(e.target, index);
                      }}
                    />
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
