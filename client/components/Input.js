import { colors } from "../styles";

const Input = ({ placeholder, name, value, onChange, err }) => {
  return (
    <>
      <div>
        <input
          type="search"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {err && <span>{err}</span>}
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          gap: 5px;
          height: 100%;
        }
        input {
          border-radius: 10px;
          outline: none;
          padding: 5px;
          font-weight: 600;
          width: 30vh;
          height: 95%;
          border: 1px solid ${err ? colors.secondary : colors.black};
        }
        span {
          color: ${colors.secondary};
          height: 5%;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};

export default Input;
