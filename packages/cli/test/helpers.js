
 const createTest = fx => async (feature, merchant, { virtualConsole, findify, dom }) => {
  const res = { feature };

  dom.reconfigure({ url: "https://example.com" });

  virtualConsole.on('error', (error) => {
    console.log(error);
  })

  try {
    const results = await fx(merchant, findify, dom);
    res.status = results.every(r => r.status === 'ok') ? 'ok' : 'error';
    res.results = JSON.stringify(results);
  } catch (e) {
    res.status = 'error';
    res.error = e;
  }

  return res;
}

const describe = (...tasks) => tasks.map(([task, value]) => ({ task, status: value && 'ok' || 'error' }))

module.exports = { createTest, describe }