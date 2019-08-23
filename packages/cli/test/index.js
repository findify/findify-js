/**
 * [--login][required]
 * [--password][required]
 * [--merchants][optional] eq: 123,321,222
 * [--v][optional] version on MJS to test on, if no present then *local build* will be used
 */

const argv = require('yargs').argv;
const signale = require('signale');
const axios = require('axios');
const createEnvironment = require('./environment');
const runTest = require('./tests');

let __done = false;
const wait = () => new Promise(resolve => setTimeout(__done ? resolve : wait, 1000));


const auth = async ({ login, password }) => {
  const interactive = new signale.Signale({ interactive: true, scope: 'auth' });
  interactive.await('Authorizing merchant');
  if (!login || !password) throw new Error('--login and --password are required');
  try {
    const { data } = await axios.post('https://admin.findify.io/v1/accounts/login', { login, password: String(password) });
    interactive.success(`Authorized as ${data.user.name}`);
    return data.user.merchants;
  } catch (e) {
    interactive.error(e.response.data, 4);
  }
}

const test = ({ v: version }) => async (merchant) => {
  const environment = await createEnvironment(version, merchant);
  const statuses = []
  for(const feature of ['search', 'autocomplete']) {
    const status = await runTest(merchant, environment)(feature);
    statuses.push(status);
  }
  return statuses;
}


const pickMerchants = (merchants, { merchants: m }) => {
  if (!m) return merchants;
  const ids = String(m).split(',').map(Number)
  return merchants.filter(({ merchantID }) => ids.includes(merchantID))
}

const program = async () => {
  const merchants = await auth(argv);
  const statuses = await Promise.all(pickMerchants(merchants, argv).map(test(argv)));
  console.log(statuses)
}

(async () => {
  try {
    await Promise.race([wait(), program()])
    __done = true;
  } catch (e){
    __done = true;
    signale.error(e);
  }
}) ()