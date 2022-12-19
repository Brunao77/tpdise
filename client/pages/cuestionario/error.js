import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { colors } from "../../styles";

const InvalidAccess = () => {
  const router = useRouter()
  let [msg, setMsg] = useState("");
  useEffect(() => {
    const { query } = router;
    setMsg( query.msg);
  }, []);

  const handleAccept = () => {
    router.push("/login")
  }
  return (
    <>
      <Layout title="ACCESO INVALIDO">
        <div className="inst-cont">
          <h5>{msg}</h5>
        </div>
        <footer>
          <div className="btn">
            <Button bgcolor={colors.primary} onClick={handleAccept}>ACEPTAR</Button>
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

    export default InvalidAccess;