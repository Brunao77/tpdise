import { useState } from "react";
import Layout from "../../../components/Layout";
import { colors } from "../../../styles";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ButtonLink from "../../../components/ButtonLink";

const newPuesto = () => {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    empresa: "",
    caracteristica: [],
  });

  const addCharasterict = () => {
    setForm({
      ...form,
      ["caracteristica"]: [
        ...form["caracteristica"],
        { competencia: "", puntos: "", isAdded: false },
      ],
    });
  };

  const handleEliminar = (index) => {
    const temp = [...form["caracteristica"]];
    temp.splice(index, 1);
    setForm({
      ...form,
      ["caracteristica"]: temp,
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  console.log(form);
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
            />
            <Input
              placeholder="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            <Input
              placeholder="Empresa"
              name="empresa"
              value={form.empresa}
              onChange={handleChange}
            />
          </section>
          <section className="characts-container">
            <div className="characts-head">
              <span>Características del Puesto</span>
              <button onClick={addCharasterict}>
                <img src="/plus.svg" />
              </button>
            </div>
            <div className="characts">
              {form["caracteristica"].map((competencia, index) => {
                return (
                  <section key={index} className="new-characts">
                    <Input placeholder="Competencia" />
                    <Input placeholder="Puntos" />
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
          <Button bgcolor={colors.primary}>ACEPTAR</Button>
        </div>
      </Layout>
      <style jsx>{`
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
        .characts-container {
          align-self: center;
          width: 90%;
        }
        .characts-head {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-bottom: 5px;
          max-height: 35px;
          border-bottom: 1px solid ${colors.black};
        }
        .characts {
          margin-top: 10px;
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
        .new-characts {
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
