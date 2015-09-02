##
# Builder for FleetManagement
#

SRC = ./src
BIN = ./bin
FLEET = FleetManagement

compile:
	tsc $(SRC)/$(FLEET)/Vehicle.ts --outDir $(BIN) --out Vehicle.js

install:
	npm install
