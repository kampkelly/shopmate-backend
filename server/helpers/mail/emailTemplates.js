export default {
  confirmationTemplateHtml(name, url) {
    return `<h4>Hi ${name}.</h4> <p>Thanks for your order, you can go back to the website by this visiting this url: ${url}</p>`;
  },

  confirmationTemplateText(name, url) {
    return `Hi ${name}. Thanks for your order, you can go back to the website by this visiting this url: ${url}`;
  }
};
