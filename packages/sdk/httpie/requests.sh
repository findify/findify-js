http POST https://search-staging.findify.io/v3/smart-collection/collections/sdk-test-1 "X-Key: 0d2f3aad-8702-46ad-a786-ae9fe2670294" < ./httpie/smart-collections/1.json | jq '.items | length'
http POST https://search-staging.findify.io/v3/recommend/items/newest "X-Key: 0d2f3aad-8702-46ad-a786-ae9fe2670294" < ./httpie/recommendations/newest-1.json | jq '.items | length'
http POST https://search-staging.findify.io/v3/recommend/items/viewed/latest "X-Key: 0d2f3aad-8702-46ad-a786-ae9fe2670294" < ./httpie/recommendations/recently-viewed-1.json | jq '.items | length'

http POST https://search-staging.findify.io/v3/feedback "X-Key: 0d2f3aad-8702-46ad-a786-ae9fe2670294" < ./httpie/feedback/view-page-1.json
http POST https://search-staging.findify.io/v3/feedback "X-Key: 0d2f3aad-8702-46ad-a786-ae9fe2670294" < ./httpie/feedback/view-page-2.json
