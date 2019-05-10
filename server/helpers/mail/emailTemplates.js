export default {
  confirmationTemplateHtml(name, url) {
    return `<h4>Hi ${name}.</h4> <p>Thanks for your order, you can go back to the website by this visiting this url: ${url}</p>`;
  },

  confirmationTemplateText(name, url) {
    return `Hi ${name}. Thanks for your order, you can go back to the website by this visiting this url: ${url}`;
  },

  orderTemplateHtml(name, url) {
    return `<h4>Hi ${name}.</h4> <p>You have created a new order, you can go back to the website by this visiting this url: ${url}</p>`;
  },

  orderTemplateText(name, url) {
    return `Hi ${name}. You have created a new order, you can go back to the website by this visiting this url: ${url}`;
  }
};
