import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";

const Cuestionario = () => {
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    const { query } = router;
    console.log(JSON.parse(query.candidato));
  }, []);

  return (
    <>
      <Layout title="INSTRUCCIONES">
        <div>
          <h5>Instrucciones para realizar este cuestionario</h5>
          <p>Lorem</p>
        </div>
      </Layout>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid gray;
          border-radius: 10px;
          padding: 10px;
          width: 60vw;
          height: 40vh;
        }
      `}</style>
    </>
  );
};

export default Cuestionario;
