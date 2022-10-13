import Link from "next/link";
import { colors } from "../styles";

const ButtonLink = ({ children, href, bgcolor }) => {
  return (
    <>
      <Link href={href}>
        <a>{children}</a>
      </Link>
      <style jsx>{`
        a {
          background: ${bgcolor};
          padding: 20px;
          border-radius: 10px;
          text-decoration: none;
          color: ${colors.black};
          font-size: 20px;
          font-weight: 600;
          transition: 0.2s;
        }
        a:active {
          transform: scale(97%);
        }
      `}</style>
    </>
  );
};

export default ButtonLink;
