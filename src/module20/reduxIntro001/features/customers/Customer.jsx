import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer);
  // useSelector takes a callback function. This callback function takes a single argument, i.e. the entire redux store
  console.log(customer);
  return (
    <h2>
      👋 Welcome, {customer?.fullName === "" ? "John Doe" : customer.fullName}
    </h2>
  );
}

export default Customer;
