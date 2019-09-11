# @findify/cli

## Utils

`yarn test` - test bundle and customizations on real merchant.
```bash
--login | required # user name
--password | required # password 
--merchants | optional # eq: 123,321,222
--token | optional # token to fetch merchants without auth
--v | optional # version on MJS to test on, if no present then local build will be used
```