import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { colors } from "../../styles";

const Login = () => {
  const [menuSession, setMenuSession] = useState("");
  return (
    <>
      <main>
        <section>
          {menuSession !== "" ? (
            <header>
              <img src="/back.svg" onClick={() => setMenuSession("")} />
              <h1>CAPIT@L HUMANO</h1>
            </header>
          ) : (
            <h1>CAPIT@L HUMANO</h1>
          )}
          {menuSession === "" && (
            <>
              <h4>Seleccione una opción para inciar sesión</h4>
              <div className="cont-btn">
                <Button
                  bgcolor={colors.primary}
                  onClick={() => setMenuSession("consultor")}
                >
                  CONSULTOR
                </Button>
                <Button
                  bgcolor={colors.primary}
                  onClick={() => setMenuSession("cuestionario")}
                >
                  CUESTIONARIO
                </Button>
              </div>
            </>
          )}
          {menuSession === "consultor" && (
            <>
              <h4>Ingrese sus datos para acceder como Consultor</h4>
              <div className="cont-btn">
                <div className="cont-input">
                  <Input placeholder="Usuario" />
                </div>
                <div className="cont-input">
                  <Input placeholder="Contraseña" type="password" />
                </div>
                <Button bgcolor={colors.primary}>INGRESAR</Button>
              </div>
            </>
          )}
          {menuSession === "cuestionario" && (
            <>
              <h4>Ingrese sus datos para acceder a un Cuestionario</h4>
              <div className="cont-btn">
                <div className="first-cont">
                  <select className="tipo-inp">
                    <option hidden selected>
                      Tipo
                    </option>
                    <option value="value1">DNI</option>
                    <option value="value2">CUIT</option>
                    <option value="value3">CUIL</option>
                  </select>
                  <div className="cont-input-nro">
                    <Input placeholder="Numero de documento" />
                  </div>
                </div>
                <div className="cont-input">
                  <Input placeholder="Clave" type="password" />
                </div>
                <Button bgcolor={colors.primary}>INGRESAR</Button>
              </div>
            </>
          )}
        </section>
      </main>
      <style jsx>{`
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
