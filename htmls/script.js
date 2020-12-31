var razorpay = new Razorpay({
  key: "rzp_test_X3JTq1F0wJ0zfC",  
  image: "https://i.imgur.com/n5tjHFD.png"
});

var data = {
  amount: 500,
  currency: "INR",
  email: "mani.yedidi@test.com",
  contact: "9123456780",
  notes: {
    address: "Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru"
  },
  order_id: "order_EyR4P6DuE2yW6a",
  method: "netbanking",
  bank: "HDFC"
};

razorpay.once('ready', function(response) {
  console.log(response.methods);
})

var btn = document.querySelector("#btn");
btn.addEventListener("click", function() {
    debugger;
  // has to be placed within user initiated context, such as click, in order for popup to open.
  razorpay.createPayment(data);

  razorpay.on("payment.success", function(resp) {
    alert(resp.razorpay_payment_id),
      alert(resp.razorpay_order_id),
      alert(resp.razorpay_signature);
  }); // will pass payment ID, order ID, and Razorpay signature to success handler.

  razorpay.on("payment.error", function(resp) {
    alert(resp.error.description);
  }); // will pass error object to error handler
});
