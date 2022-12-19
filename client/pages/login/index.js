import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { colors } from "../../styles";

const Login = () => {
  const router = useRouter();
  const [menuSession, setMenuSession] = useState("");
  const [form, setForm] = useState({
    tipoDoc: "",
    documento: "",
    clave: "",
    nombre: "",
    password: "",
  });
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const ingresar = async () => {
    setLoad(true);
    const data = {
      tipoDoc: form.tipoDoc,
      documento: form.documento,
      clave: form.clave,
      nombre: form.nombre,
      password: form.password,
    };
    const response = await fetch(
      `http://localhost:3000/api/login/${menuSession}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    if (res.message) return setError(res.message);
    console.log(res);
    if (res && !res.message) {
      if (menuSession === "candidato")
        router.push({
          pathname: "/cuestionario",
          query: { candidato: JSON.stringify(res.usuario) },
        });
      else
        router.push(
          {
            pathname: "/",
            query: { consultor: JSON.stringify(res.usuario) },
          },
          "/"
        );
    }
  };

  return (
    <>
      <main>
        <section>
          {menuSession !== "" ? (
            <header>
              <img
                src="/back.svg"
                onClick={() => {
                  setForm({
                    tipoDoc: "",
                    documento: "",
                    clave: "",
                    nombre: "",
                    password: "",
                  });
                  setError("");
                  return setMenuSession("");
                }}
              />
              <h1>CAPIT@L HUMANO</h1>
            </header>
          ) : (
            <h1>CAPIT@L HUMANO</h1>
          )}
          {menuSession === "" && (
            <>
              <h4>Seleccione una opción para inciar sesión</h4>
              <div className="cont-btn">
                <div className="btn">
                  <Button
                    bgcolor={colors.primary}
                    onClick={() => setMenuSession("consultor")}
                  >
                    CONSULTOR
                  </Button>
                </div>
                <div className="btn">
                  <Button
                    bgcolor={colors.primary}
                    onClick={() => setMenuSession("candidato")}
                  >
                    CUESTIONARIO
                  </Button>
                </div>
              </div>
            </>
          )}
          {menuSession === "consultor" && (
            <>
              <h4>Ingrese sus datos para acceder como Consultor</h4>
              <div className="cont-btn">
                <div className="cont-input">
                  <Input
                    placeholder="Usuario"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="cont-input">
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
                {error && <span className="err-info">{error}</span>}
                <div className="btn">
                  <Button
                    bgcolor={colors.primary}
                    onClick={ingresar}
                    disabled={load}
                  >
                    INGRESAR
                  </Button>
                </div>
              </div>
            </>
          )}
          {menuSession === "candidato" && (
            <>
              <h4>Ingrese sus datos para acceder a un Cuestionario</h4>
              <div className="cont-btn">
                <div className="first-cont">
                  <select
                    className="tipo-inp"
                    name="tipoDoc"
                    value={form.tipoDoc}
                    onChange={handleChange}
                  >
                    <option hidden selected>
                      Tipo
                    </option>
                    <option value="DNI">DNI</option>
                    <option value="CUIT">CUIT</option>
                    <option value="CUIL">CUIL</option>
                  </select>
                  <div className="cont-input-nro">
                    <Input
                      placeholder="Numero de documento"
                      name="documento"
                      value={form.documento}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="cont-input">
                  <Input
                    placeholder="Clave"
                    type="password"
                    name="clave"
                    value={form.clave}
                    onChange={handleChange}
                  />
                </div>
                <div className="btn">
                  <Button bgcolor={colors.primary} onClick={ingresar}>
                    INGRESAR
                  </Button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <style jsx>{`
        .err-info {
          color: #ff6f6f;
        }
        .btn {
          width: 200px;
          height: 70px;
        }
        .first-cont {
          display: flex;
          gap: 10px;
          height: 50px;
        }
        .tipo-inp {
          border-radius: 10px;
        }
        header {
          display: flex;
          width: 100%;
        }
        img {
          height: 30px;
          width: 30px;
          margin-right: 50px;
          cursor: pointer;
        }
        main {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 25vw;
          height: 70vh;
          background: ${colors.white};
          border-radius: 10px;
          padding: 30px;
        }
        .cont-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          height: 60%;
        }
        h1,
        h4 {
          margin: 0;
        }
        h1 {
          margin-bottom: 100px;
        }
        h4 {
          text-align: center;
          width: 90%;
          border-bottom: 1px solid ${colors.black};
          margin-bottom: 30px;
        }
        .cont-input {
          height: 50px;
          width: 100%;
          margin-bottom: 15px;
        }
      `}</style>
    </>
  );
};

export default Login;
