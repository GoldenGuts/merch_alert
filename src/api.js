const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const fs = require('fs');

let previous_orderID, orderIDs = [], firstNames = [],
productData = {
    variationID: [], 
    streamerName: [], 
    productType: []
};

const WooCommerce = new WooCommerceRestApi({
  url: 'https://forthefans.in',
  consumerKey: 'ck_03f16bb27a299e7b8ff01d2b23353e73593559ae',
  consumerSecret: 'cs_02aa84c5a24f47a11b7f546c3120fed69e1f4e89',
  version: 'wc/v3'
});

function getTime() {
    let currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() - 1);
    return currentTime.toISOString();
}

async function getOrderDetails(status) {
    // await WooCommerce.get(`orders?status=${status}&after=${getTime()}`)
    await WooCommerce.get(`orders?status=${status}`)
        .then((response) => {
             previous_orderID = (response.data)[0].id;
            (response.data).forEach(element => {
                productData.variationID.push(element.line_items[0].variation_id)
                orderIDs.push(element.id)
                firstNames.push(element.billing.first_name)
            });
    })
        .catch((error) => {
            console.log(error.response.data);
    });
}

async function getProductDetails(var_id) {
    await WooCommerce.get(`products/${var_id}`)
        .then((response) => {
            productData.sku = response.data.sku
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    productData.streamerName.push(productData.sku.slice(0,4))
    productData.productType.push(productData.sku.slice(4,5))
    return [{
        streamer: productData.streamerName, 
        type: productData.productType
    }];
}

module.exports = {
    getOrderDetails,
    getProductDetails,
    productData,
    orderIDs,
    firstNames
};