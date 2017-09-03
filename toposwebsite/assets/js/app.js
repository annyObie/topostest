let env = 'production';
if (window.location.protocal === 'file:') {
    env = 'sandbox'
}
const sandboxId = 'AAYsej7dailJb5KejHfVyl1mmjiWa4udy36FrsvkOxA8g_tPKY6f_q5WT38H-VHwK08B_D1dDS4jos7l4';
const prodId = 'AZIt1kRn0bAqOOQbWrbMBfFKJX1HS6hk8YAiAQ7VSR2plj1dfkT6Lnl-2O-pyv36FyYXVtZJdqHrk6e1';
const renderPaypalBtn = (idx, el) => {
    const $el = $(el);
    const $payPalButton = $el.find('.paypal-button');
    $payPalButton.attr('id', 'paypal-button-'+idx);
    paypal.Button.render({
      env: env,
      client: {
          sandbox: sandboxId,
          production: prodId,
      },
      style: {
            size: 'small',
            color: 'gold',
            shape: 'pill',
            label: 'checkout'
        },
      commit: true, // Show a 'Pay Now' button
      payment: function(data, actions) {
          return actions.payment.create({
              payment: {
                  transactions: [
                      {
                          amount: { total: $payPalButton.attr('data-total'), currency: $payPalButton.attr('data-currency') }
                      }
                  ]
              }
          });
      },
      onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
              // The payment is complete!
              // You can now show a confirmation message to the customer
              console.log('confirmed!')
          });
      }
    }, '#paypal-button-'+idx);
    
}
const $paymentItems = $('.js-payment-item');
$paymentItems.each(renderPaypalBtn);



;(function(window,document,undefined){
    "use strict";
        var init = function(){    
            var canvas = document.querySelector('#x');
            var icon_template = document.querySelector('#template');
            var icon_width = 150;
            var icon_height = 250;
            var the_images = [
                'assets/img/img_1.jpg',
                'assets/img/img_2.jpg',
                'assets/img/img_3.jpg',
                'assets/img/img_4.jpg',
                'assets/img/img_5.jpg',
                'assets/img/img_6.jpg',
                'assets/img/img_7.jpg',
                'assets/img/img_8.jpg',
                'assets/img/img_9.jpg',
                'assets/img/img_10.jpg',
                'assets/img/img_11.jpg',

            ];
            var pickRandomImage = function(){
                var i = Math.floor( Math.random() * the_images.length );
                return the_images[i];
            };
            var total_number_of_images = 8;
            var max_height = canvas.offsetHeight - icon_height;
            var max_width = canvas.offsetWidth - icon_width;
            var randomCoordinate = function(){
                var r = [];
                var x = Math.floor( Math.random() * max_width );
                var y = Math.floor( Math.random() * max_height );
                r = [x,y];
                return r;
            };
            var createImage = function(){
                var node = icon_template.cloneNode(true);
                var xy = randomCoordinate();
                node.removeAttribute('id');
                node.removeAttribute('hidden');
                node.style.top = xy[1] + 'px';
                node.style.left = xy[0] + 'px';
                node.setAttribute('src',pickRandomImage());
                canvas.appendChild(node);
            };
            for (var i=0;i<total_number_of_images;i++){
                createImage();
            };
        };
       window.addEventListener('load',init);
})(window,document);