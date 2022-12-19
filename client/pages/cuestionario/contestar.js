import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { colors } from "../../styles";

const Contestar = () => {
  return (
    <>
      <Layout title="COMPLETAR CUESTIONARIO">
        <div className="inst-cont">
          <h5>El cuestionario se encuentra en proceso</h5>
        </div>
        <footer>
          <div className="btn">
            <Button bgcolor={colors.primary}>SIGUIENTE BLOQUE</Button>
          </div>
        </footer>
      </Layout>
      <style jsx>{`
        .inst-cont {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid gray;
          border-radius: 10px;
          padding: 10px;
          width: 60vw;
          height: 50vh;
          overflow: auto;
        }
        .btn {
          width: 200px;
          height: 50px;
        }
        footer {
          display: flex;
          width: 100%;
          height: 25%;
          align-items: center;
          justify-content: end;
          gap: 20px;
          padding: 50px;
        }
      `}</style>
    </>
    )}

    export default Contestar;