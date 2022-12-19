import { colors } from "../styles";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const ModalFinalizar = () => {
  return (
    <>
      <div className="success">
        <div className="success-int">
          <div className="success-sup">
            <section className="success-dot"></section>
            <h3>EXITO!</h3>
          </div>
          <div className="success-mid">
            <h3>¿Quiere exportar la lista de candidatos a un archivo excel?</h3>
          </div>
          <div className="success-inf">
            <ButtonLink bgcolor={colors.secondary} href="/puesto">
              RECHAZAR
            </ButtonLink>
            <div className="btn">
              <Button bgcolor={colors.primary}>ACEPTAR</Button>
            </div>
          </div>
        </div>
      </div>{" "}
      <style jsx>{`
        .btn {
          width: 150px;
        }
        .success {
          width: 100%;
          height: 100vh;
          position: fixed;
          z-index: 10000;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .success-int {
          background: ${colors.white};
          border-radius: 10px;
          width: 40vw;
          height: 20vw;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .success-sup {
          display: flex;
          align-items: center;
          gap: 5px;
          height: 5%;
        }
        .success-mid {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 75%;
        }
        .success-inf {
          display: flex;
          justify-content: end;
          gap: 10px;
          height: 20%;
        }
        .success-dot {
          width: 20px;
          height: 20px;
          background: rgba(138, 255, 94);
          border-radius: 100%;
        }
      `}</style>
    </>
  );
};

export default ModalFinalizar;
