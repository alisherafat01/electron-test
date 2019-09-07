const {ipcRenderer} = require('electron');
const ordersRepository = require('./repository/ordersRepository');
let btnSubmitOrder = $('#submitOrder');

ipcRenderer.send('load-products');
ipcRenderer.on('load-products-done', (e, data) => {
  // present data to UI
  let products = data.products;
  let productsDom = '';
  products.forEach(product => {
    productsDom += `
<span class="glyphicon glyphicon-file"></span>
      <div class="food-row" data-food-id="${product.id}">
    <img class="rounded product-image"
         src="${product.image}"
         alt="...">
    <div class="food-data" style="display: inline-block">

      <div class="food-title">${product.name}</div>
      <br>
      <div class="food-description">${product.description}</div>
      <br>
      <span class="food-price">${product.price}</span>
      تومان
      <div class="form-check">
  <input class="form-check-input order-check" type="checkbox">
  <label class="form-check-label" for="defaultCheck1">
    سفارش
  </label>
</div>
    </div>
    
    
  </div>
  <hr>
    `
    $('div.foods').html(productsDom);
  });
});

$(document).ready(function () {
  $(document).on('change', 'input.order-check:checkbox', () => {
    console.log($('input.order-check:checkbox:checked').length);
    if ($('input.order-check:checkbox:checked').length > 0) {
      $('#submitOrder').prop('disabled', false);
    } else {
      $('#submitOrder').prop('disabled', true);
    }
  });
  $('#submitOrder').on('click', () => {
    let OrderItems = [];
    $('input.order-check:checkbox:checked').each((index, item) => {
      let food = $(item).closest('.food-row');
      let product = {
        productId: food.data('food-id'),
        name: food.find('.food-title').html(),
        price: food.find('.food-price').html(),
      };
      OrderItems.push(product);
    });
    ipcRenderer.send('new-order', {OrderItems});
    btnSubmitOrder.prop('disabled', true);
    btnSubmitOrder.html('در حال ثبت سفارش ...');
  });

  $('#foods-page').on('click', () => {
    ipcRenderer.send('load-products');
    $('div.orders').empty();
    $('#submitOrderBox').show();
  });

  $('#orders-page').on('click', () => {
    $(this).closest('li').addClass('active');
    $('#foods-page').closest('li').removeClass('active');
    $('#submitOrderBox').hide();
    $('div.foods').empty();
    // show loading...
    let orders = ordersRepository.get();
    let ordersDom = '';
    if (orders.length === 0) {
      ordersDom = `
      <div class="alert alert-warning" role="alert">
  سفارشی جهت نمایش وجود ندارد!
</div>
      `;
      $('div.orders').show().html(ordersDom);
      return;
    }
    orders.forEach(order => {
      let orderItemsDom = '';
      order.OrderItems.forEach(item => {
        orderItemsDom += `
         <tr>
        <td>${item.name}</td>
        <td>1</td>
        <td>${item.price}</td>
      </tr>
        `;
      });
      let orderDom = `
    <div class="panel panel-default">
      <strong class="panel-heading">سفارش شماره ${order.id}</strong>
      <div class="panel-body">
        <table class="table table-hover">
    <thead>
      <tr>
        <th>نام غذا</th>
        <th>تعداد</th>
        <th>قیمت</th>
      </tr>
    </thead>
    <tbody>
     ${orderItemsDom}
    </tbody>
  </table>
      
      </div>
    </div>
    <br>
      `;
      ordersDom += orderDom;
    });
    $('div.orders').show().html(ordersDom);
  });
});


ipcRenderer.on('new-order-done', (e, order) => {
  console.log(order);
  ordersRepository.add(order);
  btnSubmitOrder.prop('disabled', false);
  btnSubmitOrder.html('ثبت سفارش');
  $("input:checkbox").prop('checked', false);
  $('#orderDoneAlert').slideDown();
  setTimeout(() => {
    $('#orderDoneAlert').slideUp();
  }, 2000)
});