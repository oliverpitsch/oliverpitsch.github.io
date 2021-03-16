all: init lint build

srcFiles = $(shell find src)
OS := $(shell uname)


init:
	bundle install

lint:
	bundle exec scss-lint source/stylesheets

middleman-build:
	middleman build --verbose

build: init middleman-build

start:
	middleman

deploy:
	aws s3 sync build s3://${BUCKET_NAME}/
