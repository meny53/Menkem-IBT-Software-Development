import { useReducer } from "react";

const initialState = {
  name: "",
  phone: "",
  area: "",
};

function reducer(state, action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

function OrderForm() {
  const [form, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Order Form</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          dispatch({
            field: "name",
            value: e.target.value,
          })
        }
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          dispatch({
            field: "phone",
            value: e.target.value,
          })
        }
      />

      <input
        placeholder="Area"
        value={form.area}
        onChange={(e) =>
          dispatch({
            field: "area",
            value: e.target.value,
          })
        }
      />

      <p>
        {form.name} - {form.phone} - {form.area}
      </p>
    </div>
  );
}

export default OrderForm;