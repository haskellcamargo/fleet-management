##
# Builder for FleetManagement
#

SRC = ./src
BIN = ./bin
FLEET = FleetManagement

compile:
	tsc $(SRC)/$(FLEET)/DataHolder.ts --outDir $(BIN)
	tsc $(SRC)/$(FLEET)/Vehicle.ts --outDir $(BIN)

install:
	npm install
