
const jsdom = require("jsdom");

const createDescriptor = results => async (task, value) => {
  if (typeof value === 'boolean') return results.push([task, value]);
  try {
    return results.push([task, await value()]);
  } catch (e) {
    return results.push([task, false, e])
  }
}

const createTest = fx => async (feature, merchant, { findify, dom, getError }) => {
  const res = { feature };

  if (!findify.widgets) {
    res.status = 'disabled';
    return res;
  }

  dom.reconfigure({ url: "https://example.com" });

  findify.widgets && findify.widgets.get('test') && findify.widgets.detach('test');

  try {
    const results = [];
    await fx(createDescriptor(results))(merchant, findify, dom);
    res.status = results.every(([_, value]) => value) ? 'ok' : 'error';
    res.results = results;
    const error = getError();
    if (error) res.error = error;
  } catch (e) {
    res.status = 'error';
    res.error = e;
  }

  return res;
}

const eq = (a, b) => a === b;

module.exports = { createTest, eq }
