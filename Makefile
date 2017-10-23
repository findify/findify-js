test:
	npm t
test-once:
	npm run test:once
clean:
	npm run clean
rebuild:
	npm run rebuild
build:
	npm run build
build-tdd:
	npm run build:tdd
commit:
	npm run c
changelogs:
	npm run release:post
release:
	npm run release

.PHONY: test test-once clean build build-tdd commit release
