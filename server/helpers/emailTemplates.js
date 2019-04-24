export default {
  confirmationTemplateHtml(name, url) {
    return `<h4>Hi ${name}.</h4> <p>Thanks for your order, you can see your orders by going to ${url}/orders/inCustomer</p>`;
  },

  confirmationTemplateText(name, url) {
    return `Hi ${name}. Thanks for your order, you can see your orders by going to ${url}/orders/inCustomer`;
  }
};
