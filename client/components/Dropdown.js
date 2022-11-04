import { colors } from "../styles";
import { Combobox } from "react-widgets";
import "react-widgets/styles.css";

const Dropdown = ({
  placeholder,
  name,
  data,
  dataKey,
  textField,
  onChange,
  value,
  err,
}) => {
  return (
    <>
      <div>
        <Combobox
          type="search"
          name={name}
          data={data}
          dataKey={dataKey}
          textField={textField}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {err && <span>{err}</span>}
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          gap: 5px;
          height: 100%;
          width: 100%;
        }
        DropdownList {
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

export default Dropdown;
