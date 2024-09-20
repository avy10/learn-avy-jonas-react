import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}
function mapStateToProps(state) {
  return {
    // define the name of the props that our component will receive
    balance: state.account.balance,
  };
}
export default connect(mapStateToProps)(BalanceDisplay);
