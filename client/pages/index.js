import ButtonLink from "../components/ButtonLink";
import Layout from "../components/Layout";
import { colors } from "../styles";

export default function Home() {
  return (
    <>
      <Layout title="PANTALLA PRINCIPAL">
        <ButtonLink bgcolor={colors.primary} href="/puesto">
          GESTIONAR PUESTOS
        </ButtonLink>
      </Layout>
    </>
  );
}
