import { useRouter } from "next/router";
import { useEffect } from "react";
import ButtonLink from "../components/ButtonLink";
import Layout from "../components/Layout";
import { colors } from "../styles";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const { query } = router;
    if (!query.consultor) {
      router.push("/login");
    }});
  return (
    <>
      <Layout title="PANTALLA PRINCIPAL">
        <ButtonLink bgcolor={colors.primary} href="/puesto">
          GESTIONAR PUESTOS
        </ButtonLink>
        <ButtonLink bgcolor={colors.primary} href="/evaluar">
          EVALUAR CANDIDATOS
        </ButtonLink>
      </Layout>
    </>
  );
}
