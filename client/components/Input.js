import { colors } from "../styles";

const Input = ({ placeholder, name, value, onChange }) => {
  return (
    <>
      <input
        type="search"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <style jsx>{`
        input {
          border-radius: 10px;
          outline: none;
          padding: 5px;
          font-weight: 600;
          width: 30vh;
          border: 1px solid ${colors.black};
        }
      `}</style>
    </>
  );
};

export default Input;
