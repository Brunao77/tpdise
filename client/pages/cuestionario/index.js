import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import { colors } from "../../styles";

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
        <div className="inst-cont">
          <h5>Instrucciones para realizar este cuestionario</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            feugiat ligula at venenatis rhoncus. Etiam justo sem, ultricies ut
            lacinia quis, lacinia eget augue. Vivamus vitae velit elit. Vivamus
            id sem vel massa ultrices sodales sed ac nisi. Aliquam erat
            volutpat. Suspendisse sed dictum enim, eu tempor velit. Quisque in
            magna ut massa lacinia iaculis. Maecenas sodales, ipsum vitae
            bibendum sollicitudin, nisl eros venenatis nisi, vel pharetra tortor
            nisi ac urna. Integer non condimentum nibh, a dignissim quam. Nunc
            mollis eu lorem sit amet finibus. Suspendisse pulvinar lacus eget
            dolor pellentesque dictum. Vivamus sagittis dui nec justo convallis
            faucibus. Ut a orci convallis, suscipit mauris vel, sollicitudin
            urna. Duis vulputate cursus dignissim. Donec viverra sit amet dui
            vitae semper. Nam mollis pulvinar orci, at bibendum dolor. Sed
            lobortis imperdiet risus, sit amet aliquet tellus imperdiet vitae.
            Vivamus sagittis, nulla vel elementum elementum, mi quam elementum
            lacus, nec luctus diam dolor at turpis. Donec rutrum malesuada
            scelerisque. Sed id felis condimentum, gravida augue et, laoreet
            lorem. Vestibulum consequat odio id lectus dictum, vel dictum lectus
            finibus. Curabitur nec metus urna. Etiam et tincidunt lectus, dictum
            ultrices arcu. Maecenas tincidunt malesuada accumsan. Maecenas non
            massa sed nisi consequat bibendum. Etiam gravida diam vel ante
            congue, in blandit odio interdum. Donec a lectus vitae risus aliquam
            ultricies quis eget leo. Aliquam nec tristique nibh, id fermentum
            nibh. Curabitur quis augue non neque tempor cursus in et lorem.
            Fusce eu turpis dui. Sed at justo ac nisi vestibulum porttitor sed
            quis purus. Morbi euismod venenatis nunc, non semper augue dignissim
            vel. Nunc condimentum eu ex nec mollis. Etiam pulvinar dolor purus,
            at hendrerit orci mattis sit amet. Nam tellus lectus, varius auctor
            pellentesque ac, sodales id orci. Proin in tincidunt sapien.
            Maecenas accumsan, massa tristique tristique aliquet, risus nisl
            eleifend risus, nec gravida ante nisi sed arcu. Nulla et facilisis
            augue. Nunc condimentum scelerisque malesuada. Mauris porttitor
            mollis neque id semper. Praesent sed sapien tellus. Quisque odio
            lorem, efficitur non varius vel, volutpat porttitor ex. Ut eleifend
            vel tellus sed aliquam. Nulla justo nibh, condimentum nec leo
            commodo, tristique pharetra nisi. Curabitur lobortis diam non justo
            vulputate finibus. Vestibulum congue a felis nec vestibulum. Nam
            mattis ipsum felis, vel venenatis augue commodo sit amet.
            Suspendisse mollis lectus lorem. Aenean sodales ac enim quis
            elementum. Nam eget bibendum lectus, vitae porttitor sem. Sed quis
            fermentum ligula.
          </p>
        </div>
        <footer>
          <div className="btn">
            <Button bgcolor={colors.secondary}>CANCELAR</Button>
          </div>
          <div className="btn">
            <Button bgcolor={colors.primary}>ACEPTAR</Button>
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
  );
};

export default Cuestionario;
