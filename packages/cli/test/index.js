/**
 * [--login][required]
 * [--password][required]
 * [--merchants][optional] eq: 123,321,222
 * [--token][optional] token to fetch merchants without auth
 * [--v][optional] version on MJS to test on, if no present then *local build* will be used
 */

const argv = require('yargs').argv;
const signale = require('signale');
const axios = require('axios');
const createEnvironment = require('./environment');
const runTest = require('./tests');

let __done = false;
const wait = () => new Promise(resolve => setTimeout(__done ? resolve : wait, 1000));


const auth = async ({ login, password, token }) => {
  const interactive = new signale.Signale({ interactive: true, scope: 'auth' });
  interactive.await('Authorization');
  if (!token && (!login || !password)) throw new Error('--login and --password are required');
  try {
    const { data } = (!!token
      && await axios.get('https://admin.findify.io/v1/merchants', { headers: { 'x-token': token } })
      || await axios.post('https://admin.findify.io/v1/accounts/login', { login, password: String(password) })
    );
    interactive.success(`Authorized as ${!token && data.user.name || data.name}`);
    return !!token && data.merchants || data.user.merchants;
  } catch (e) {
    interactive.error(e.response.data, 4);
  }
}

const test = ({ v: version }) => async (merchant, index) => {
  let statuses = []
  let hasError = false;
  try {
    const environment = await createEnvironment(version, merchant);
    for(const feature of ['search', 'autocomplete', 'recommendation']) {
      const status = await runTest(merchant, environment)(feature);
      statuses.push(status);
    }
    hasError = !statuses.every(s => s.status === 'ok');
  } catch (e) {
    hasError = true
    statuses = error;
  }

  signale[hasError ? 'error' : 'success'](`${merchant.merchantName} - ${merchant.merchantID} - #${index}`);
  console.dir(statuses, { depth: null, colors: true });

  return [merchant.merchantName, statuses];
}

const pickMerchants = (merchants, { merchants: m }) => {
  if (!m) return merchants;
  const ids = String(m).split(',').map(Number)
  return merchants.filter(({ merchantID }) => ids.includes(merchantID))
}

const program = async () => {
  const merchants = await auth(argv);
  const stores = pickMerchants(merchants, argv).filter(({ feConfig }) => feConfig.hasCustomizations && Number(feConfig.mjsVersion.split('.')[0]) > 5)
  signale.success(`Testing ${stores.length} stores`);
  const statuses = await Promise.all(stores.map(test(argv)));
}

(async () => {
  try {
    await Promise.race([wait(), program()])
    __done = true;
  } catch (e){
    __done = true;
    signale.error(e);
  }
})()