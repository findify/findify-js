import axios from 'axios';

const processShopify = (analytics, removeFindifyID = false) => {
  const user = analytics.user;
  if (!user.persist) {
    const res = removeFindifyID
      ? ''
      : JSON.stringify({ uniq_id: user.uid, visit_id: user.sid });
    axios.post('/cart/update.js', `attributes[_findify_id]=${res}`);
  }
};

export default (analytics, config) => {
  analytics.initialize();

  /**
   * Platform specific code
   */
  if (config.platform && config.platform.shopify)
    processShopify(analytics, config.removeFindifyID);

  return;
};
