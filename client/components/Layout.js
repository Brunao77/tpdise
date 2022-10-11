import { colors } from "../styles";

const Layout = ({ children, title }) => {
  return (
    <>
      <header>
        <h3>{title}</h3>
      </header>
      <main>{children}</main>
      <style jsx>
        {`
          header {
            display: flex;
            align-items: center;
            background: ${colors.primary};
            padding-left: 40px;
            height: 8vh;
          }
          main {
            display: flex;
            background: ${colors.white};
            margin: 10px 0 10px 0;
            align-items: center;
            justify-content: center;
            height: 88vh;
          }
          h3 {
            padding: 0;
            margin: 0;
            font-size: 30px;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
