import { colors } from "../styles";

const Button = ({ children, onClick, bgcolor }) => {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          background: ${bgcolor};
          padding: 20px;
          border-radius: 10px;
          color: ${colors.black};
          font-size: 20px;
          font-weight: 600;
          transition: 0.2s;
          border: none;
          cursor: pointer;
        }
        button:active {
          transform: scale(97%);
        }
      `}</style>
    </>
  );
};

export default Button;
