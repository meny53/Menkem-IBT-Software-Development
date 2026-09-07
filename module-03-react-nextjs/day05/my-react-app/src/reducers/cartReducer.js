function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.item];

    case "remove":
      return state.filter((item) => item.id !== action.id);

    case "clear":
      return [];

    default:
      return state;
  }
}

export default cartReducer;



const item = { id: 1, name: "Shiro", price: 80 };

console.log("ADD:", cartReducer([], {
  type: "add",
  item: item
}));

console.log("REMOVE:", cartReducer([item], {
  type: "remove",
  id: 1
}));

console.log("CLEAR:", cartReducer([item], {
  type: "clear"
}));