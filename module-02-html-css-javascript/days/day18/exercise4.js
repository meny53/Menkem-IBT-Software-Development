const customer = {
    name: "Menkem",
    city: "Addis Ababa",
    balance: 5000
};

const updatedCustomer = {
    ...customer,
    city: "Mekelle",
    phone: "0912345678"
};

console.log("Original:", customer);
console.log("Updated:", updatedCustomer);