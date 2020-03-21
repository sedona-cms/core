build:
	rm -rf lib
	npx tsc --project tsconfig.json
	node scripts/build.quasar.js
	cp -r src/assets lib

watch: build
	npx tsc --watch --project tsconfig.json
