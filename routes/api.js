const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const fs = require('fs');

let previous_orderID, data, variationID = [], id_name_pair = {};

const WooCommerce = new WooCommerceRestApi({
  url: 'https://forthefans.in',
  consumerKey: 'ck_03f16bb27a299e7b8ff01d2b23353e73593559ae',
  consumerSecret: 'cs_02aa84c5a24f47a11b7f546c3120fed69e1f4e89',
  version: 'wc/v3'
});

function getTime() {
    let currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() - 5);
    return currentTime.toISOString();
}

async function getOrderDetails(status) {
    // await WooCommerce.get(`orders?status=${status}&after=${getTime()}`)
    await WooCommerce.get(`orders?status=${status}`)
        .then((response) => {
            data = (response.data);
            previous_orderID = (response.data)[0].id;
            (response.data).forEach(element => {
                variationID.push(element.line_items[0].variation_id)
                id_name_pair[element.id] = element.billing.first_name;
            });    
    })
        .catch((error) => {
        // console.log(error.response.data);
    });
    console.log(previous_orderID)
    console.log(variationID)
    console.log(id_name_pair)
}

module.exports = getOrderDetails;