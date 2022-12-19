import { colors } from "../styles";

const Button = ({ children, onClick, bgcolor, disabled }) => {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
      <style jsx>{`
        button {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          background: ${bgcolor};
          padding: 20px;
          border-radius: 10px;
          color: ${colors.black};
          font-size: 20px;
          font-weight: 600;
          transition: 0.2s;
          border: none;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
        button:active {
          transform: scale(97%);
        }
      `}</style>
    </>
  );
};

export default Button;
