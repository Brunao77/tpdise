import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { colors } from "../../styles";

const Cuestionario = () => {
  let estado = {estado: undefined};
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    const { query } = router;
    if(!query.candidato) router.push("/login");
    else {
      async function getEstado() {
        estado = await getCuestionario(JSON.parse(query.candidato))
        console.log(estado);
      }
      getEstado();
    }
  }, []);

  async function getCuestionario(candidato) {
    const response = await fetch(
      `http://localhost:3000/api/cuestionario/${candidato.nroCandidato}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    console.log(res);
    if (res.err) router.push({
      pathname: "/cuestionario/error",
      query: { msg: JSON.stringify(res.err) },
    });
    if (res.estado == "activo") router.push({
      pathname: "/cuestionario/instrucciones",
      query: { candidato: candidato.nroCandidato },
    });
    if (res.estado == "enProceso") router.push("/cuestionario/instrucciones");
  } 

  return (
    <>
      {estado.estado === "error" && <Layout title="ACCESO INVALIDO">
        <div className="inst-cont">
          <h5>{estado.msg}</h5>
        </div>
        <footer>
          <div className="btn">
            <Button bgcolor={colors.primary}>ACEPTAR</Button>
          </div>
        </footer>
      </Layout>}
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
  );
};

export default Cuestionario;
