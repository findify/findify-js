import axios from 'axios';

export default (platform, disabled) => {
  if (!platform.shopify) return;
  const user = __root.analytics.user;
  if (!user.persist) {
    const res = disabled
      ? ''
      : JSON.stringify({ uniq_id: user.uid, visit_id: user.sid });
    axios.post('/cart/update.js', `attributes[_findify_id]=${res}`);
  }
}
