lint:
	npx eslint --fix '{src,scripts}/**/*.{js,ts,tsx}'

build-ts-dev: lint
	rm -rf lib
	npx tsc --project tsconfig.json

build-ts-prod: lint
	rm -rf lib
	npx tsc --project tsconfig.build.json

build-assets:
	node scripts/build.quasar.js
	cp -r src/assets lib

copy-css:
	cd ./src && find . -name '*.css' | cpio -pdm ./../lib

build-dev: build-ts-dev build-assets

build-prod: build-ts-prod build-assets copy-css

build-example:
	apk add --update-cache cpio
	npm ci
	npx npm-self-link
	make -f Makefile build-prod
	DEPLOY_ENV=GH_PAGES npx nuxt generate dev --modern
	cp -r dev/dist ./dist-docs

watch: build-dev
	npx tsc-watch --onSuccess 'make -f Makefile copy-css'
