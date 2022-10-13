import ButtonLink from "../../components/ButtonLink";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { colors } from "../../styles";

const Puesto = () => {
  return (
    <>
      <Layout title="GESTIONAR PUESTOS">
        <section className="search">
          <Input placeholder="Código" />
          <Input placeholder="Nombre" />
          <Input placeholder="Empresa" />
          <Button bgcolor={colors.primary}>BUSCAR</Button>
        </section>
        <div></div>
        <section className="options">
          <ButtonLink bgcolor={colors.primary} href="/puesto/new">
            NUEVO
          </ButtonLink>
          <Button bgcolor={colors.secondary}>ELIMINAR</Button>
          <Button bgcolor={colors.primary}>MODIFICAR</Button>
        </section>
      </Layout>
      <style jsx>{`
        .search {
          display: flex;
          gap: 20px;
          width: 100%;
          justify-content: center;
          height: 40px;
        }
        .options {
          display: flex;
          gap: 20px;
          width: 100%;
          padding-right: 20px;
          justify-content: end;
        }
      `}</style>
    </>
  );
};

export default Puesto;
