Findify really appreciates any user feedback, especially contributions to our libraries!

It's really easy to submit a pull request:

- Fork the repository
- Work on the code
- Make a pull request to the __develop__ branch

We will review your pull request ASAP!

## Testing

We use [nock (back)](https://github.com/node-nock/nock#nock-back) for HTTP API
mocking. See [nock back modes](https://github.com/node-nock/nock#modes) for more info about available options.
Usually you don't need to change it, so please stick to `lockdown` whenever possible.

If you want to regenerate fixtures:

* stop test runner
* [manually remove](https://github.com/node-nock/nock/issues/417#issuecomment-333385945) fixture files that you want to regenerate
* run tests and verify that snapshots match your expectations
* update the spanshots or fix code / tests
