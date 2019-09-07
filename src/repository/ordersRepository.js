exports.get = (filter = {}) => {
  // static products data (can also get from db,...)
  return JSON.parse(localStorage.getItem('orders')) || [];
};

exports.add = (order) => {
  let orders = this.get();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
};

