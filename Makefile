##
# Builder for FleetManagement
#

SRC = ./src
BIN = ./bin
GUI = ./gui
FLEET = FleetManagement

compile:
	lessc $(GUI)/main.less > $(BIN)/css/main.css

	tsc $(SRC)/$(FLEET)/DataHolder.ts --outDir $(BIN)/js
	tsc $(SRC)/$(FLEET)/Vehicle.ts --outDir $(BIN)/js

install:
	npm install
