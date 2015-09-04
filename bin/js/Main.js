/// <reference path="DataHolder" />
/// <reference path="IField" />
/**
* @module FleetManagement
*/
var FleetManagement;
(function (FleetManagement) {
    var Main = (function () {
        function Main() {
        }
        /**
        * Entry-point.
        * @author Marcelo Camargo
        * @return void
        */
        Main.init = function () {
            var holder = new FleetManagement.DataHolder;
            this.render(holder);
            this.bindSearch(holder);
            this.bindCreator(holder);
            this.renderPaginator(holder);
        };

        /**
        * Adds a new vehicle to the stack.
        * @author Marcelo Camargo
        * @param holder: DataHolder
        * @return void
        */
        Main.bindCreator = function (holder) {
            var _this = this;
            var field = {
                plate: document.getElementById("field-plate"),
                fuel: document.getElementById("field-fuel"),
                model: document.getElementById("field-model"),
                trademark: document.getElementById("field-trademark"),
                image: document.getElementById("field-image")
            };

            document.getElementById("btn-add").onclick = function (e) {
                try  {
                    holder.addVehicle({
                        plate: field.plate.value,
                        fuel: (function () {
                            switch (field.fuel.value) {
                                case "Alcohol":
                                    return 1 /* Alcohol */;
                                case "Gas":
                                    return 0 /* Gas */;
                                default:
                                    return 2 /* Flex */;
                            }
                        })(),
                        model: field.model.value,
                        trademark: field.trademark.value,
                        image: field.image.value.trim() === "" ? null : field.image.value
                    });
                    field.plate.value = "";
                    field.model.value = "";
                    field.image.vaue = "";
                    _this.render(holder, 0);
                    _this.renderPaginator(holder);
                } catch (e) {
                    alert(e.message);
                }
            };
        };

        /**
        * Renders the paginator, with a limit of 5 elements.
        * @author Marcelo Camargo
        * @param holder: DataHolder
        * @return void
        */
        Main.renderPaginator = function (holder) {
            var _this = this;
            var pagesNumber = holder.getSize();
            pagesNumber = pagesNumber % 5 === 0 ? pagesNumber / 5 : parseInt((pagesNumber / 5).toString()) + 1;

            this.paginator.innerHTML = "";
            for (var i = 0; i < pagesNumber; i++) {
                this.paginator.appendChild((function () {
                    var p = document.createElement("button");
                    p.className = "btn btn-default";
                    p.innerHTML = i.toString();
                    p.onclick = function () {
                        _this.render(holder, parseInt(p.innerHTML) * 5);
                    };
                    return p;
                })());
            }
        };

        /**
        * Binds the search event.
        * @author Marcelo Camargo
        * @param holder: DataHolder
        * @return void
        */
        Main.bindSearch = function (holder) {
            var _this = this;
            this.search.onkeyup = function () {
                var content = _this.search.value.toLowerCase().trim();
                if (content !== "") {
                    var data = holder.getVehicles().filter(function (vehicle) {
                        return Main.getFuelName(vehicle.fuel).toLowerCase().indexOf(content) !== -1 || vehicle.model.toLowerCase().indexOf(content) !== -1 || vehicle.plate.toLowerCase().indexOf(content) !== -1 || vehicle.trademark.toLowerCase().indexOf(content) !== -1;
                    });
                    _this.render(holder, 0, data);
                    _this.paginator.style.visibility = "hidden";
                } else {
                    _this.render(holder);
                    _this.paginator.style.visibility = "visible";
                }
            };
        };

        /**
        * Refreshes the layout based on the data in the memory
        * @author Marcelo Camargo
        * @param holder: DataHolder
        * @param from: number
        * @param searchData: Array<IVehicle>
        * @return void
        */
        Main.render = function (holder, from, searchData) {
            var _this = this;
            if (typeof from === "undefined") { from = 0; }
            console.log(from);
            var data = searchData ? searchData : holder.getVehicles().slice(from, from + 5);

            this.dataset.innerHTML = "";

            var header = document.createElement("tr");

            ["Image", "Plate", "Fuel", "Model", "Trademark", "Edit", "Delete"].forEach(function (td) {
                var elem = _this.td(td);
                elem.align = "center";
                header.appendChild(elem);
            });

            this.dataset.appendChild(header);
            data.forEach(function (vehicle) {
                var line = document.createElement("tr");

                line.appendChild(_this.getImage(vehicle.image, vehicle.trademark));
                line.appendChild(_this.td(vehicle.plate));
                line.appendChild(_this.td(_this.getFuelName(vehicle.fuel)));
                line.appendChild(_this.td(vehicle.model));
                line.appendChild(_this.td(vehicle.trademark));
                line.appendChild(_this.renderEditButton(vehicle, holder));
                line.appendChild(_this.renderDeleteButton(vehicle, holder));

                _this.dataset.appendChild(line);
            });
        };

        /**
        * Renders the button to edit an instance of vehicle.
        * @author Marcelo Camargo
        * @param vehicle: IVehicle
        * @param holder: DataHolder
        * @return HTMLTableDataCellElement
        */
        Main.renderEditButton = function (vehicle, holder) {
            var _this = this;
            var td = document.createElement("td");

            var button = document.createElement("button");

            button.innerHTML = "Edit";
            button.className = "btn btn-info";

            button.onclick = function () {
                _this.onEdit(td.parentNode, vehicle, holder);
            };

            td.appendChild(button);

            return td;
        };

        /**
        * Opens a row to edition.
        * @author Marcelo Camargo
        * @param line: HTMLTableRowElement
        * @param vehicle: IVehicle
        * @param holder: DataHolder
        * @return void
        */
        Main.onEdit = function (line, vehicle, holder) {
            var _this = this;
            // Fuel
            var currentFuel = line.children[2].innerHTML;
            var fuelField = document.createElement("select");
            ["Flex", "Alcohol", "Gas"].forEach(function (fuel) {
                fuelField.appendChild((function () {
                    var option = document.createElement("option");
                    option.value = fuel;
                    option.innerHTML = fuel;
                    if (fuel === currentFuel) {
                        option.selected = true;
                    }
                    return option;
                })());
            });

            fuelField.className = "form-control";

            // Model
            var currentModel = line.children[3].innerHTML;
            var modelField = document.createElement("input");
            modelField.type = "text";
            modelField.value = currentModel;
            modelField.required = true;
            modelField.className = "form-control";

            // Trademark
            var currentTrademark = line.children[4].innerHTML;
            var trademarkField = document.createElement("select");
            ["Volkswagen", "Ford", "Fiat"].forEach(function (trademark) {
                trademarkField.appendChild((function () {
                    var option = document.createElement("option");
                    option.value = trademark;
                    option.innerHTML = trademark;
                    if (trademark === currentFuel) {
                        option.selected = true;
                    }
                    return option;
                })());
            });

            trademarkField.className = "form-control";

            line.children[2].innerHTML = "";
            line.children[3].innerHTML = "";
            line.children[4].innerHTML = "";
            line.children[2].appendChild(fuelField);
            line.children[3].appendChild(modelField);
            line.children[4].appendChild(trademarkField);

            // Transform buttons
            var confirmButton = line.children[5].firstChild;
            confirmButton.innerHTML = "Confirm";
            confirmButton.className = "btn btn-success";
            confirmButton.onclick = function () {
                _this.onConfirmEdit(line, vehicle, holder, {
                    fuel: (function () {
                        switch (fuelField.value) {
                            case "Gas":
                                return 0 /* Gas */;
                            case "Alcohol":
                                return 1 /* Alcohol */;
                            default:
                                return 2 /* Flex */;
                        }
                    })(),
                    model: modelField.value,
                    trademark: trademarkField.value
                });
            };

            var cancelButton = line.children[6].firstChild;
            cancelButton.innerHTML = "Cancel";
            cancelButton.onclick = function () {
                _this.onCancelEdit(line, vehicle, holder);
            };
        };

        /**
        * When cancel button is pressed while in edition mode.
        * @author Marcelo Camargo
        * @param line: HTMLTableRowElement
        * @param vehicle: IVehicle
        * @param holder: DataHolder
        * @return void
        */
        Main.onCancelEdit = function (line, vehicle, holder) {
            line.children[2].innerHTML = this.getFuelName(vehicle.fuel);
            line.children[3].innerHTML = vehicle.model;
            line.children[4].innerHTML = vehicle.trademark;

            // Restore buttons
            line.removeChild(line.lastChild);
            line.removeChild(line.lastChild);

            line.appendChild(this.renderEditButton(vehicle, holder));
            line.appendChild(this.renderDeleteButton(vehicle, holder));
        };

        /**
        * When the user confirms the edition
        * @author Marcelo Camargo
        * @param line: HTMLTableRowElement
        * @param vehicle: IVehicle
        * @param holder: DataHolder
        * @param newData: IField
        * @return void
        */
        Main.onConfirmEdit = function (line, vehicle, holder, newData) {
            vehicle.fuel = newData.fuel;
            vehicle.model = newData.model;
            vehicle.trademark = newData.trademark;
            vehicle.image = this.placeholder[newData.trademark.toLowerCase()];

            line.children[0].firstChild.src = vehicle.image;
            line.children[2].innerHTML = this.getFuelName(vehicle.fuel);
            line.children[3].innerHTML = vehicle.model;
            line.children[4].innerHTML = vehicle.trademark;

            // Restore buttons
            line.removeChild(line.lastChild);
            line.removeChild(line.lastChild);

            line.appendChild(this.renderEditButton(vehicle, holder));
            line.appendChild(this.renderDeleteButton(vehicle, holder));
        };

        /**
        * Renders the button to delete an instance of vehicle.
        * @author Marcelo Camargo
        * @param vehicle: IVehicle
        * @param holder: DataHolder
        * @return HTMLTableDataCellElement
        */
        Main.renderDeleteButton = function (vehicle, holder) {
            var td = document.createElement("td");

            var button = document.createElement("button");

            button.innerHTML = "Delete";
            button.className = "btn btn-danger";

            button.onclick = function () {
                holder.removeVehicleByPlate(vehicle.plate);
                Main.render(holder);
            };

            td.appendChild(button);

            return td;
        };

        /**
        * Renders a table field.
        * @author Marcelo Camargo
        * @param text: string
        * @return HTMLTableDataCellElement
        */
        Main.td = function (text) {
            var td = document.createElement("td");
            td.innerHTML = text;
            return td;
        };

        /**
        * Gets the name of the fuel based on the enumerator.
        * @author Marcelo Camargo
        * @param fuel: Fuel
        * @return string
        */
        Main.getFuelName = function (fuel) {
            switch (fuel) {
                case 1 /* Alcohol */:
                    return "Alcohol";
                case 0 /* Gas */:
                    return "Gas";
                default:
                    return "Flex";
            }
        };

        /**
        * Shows the image of the car if it exists, otherwise shows the image of
        * the trademark.
        * @author Marcelo Camargo
        * @param image: string;
        * @param trademark: string;
        * @return HTMLTableDataCellElement
        */
        Main.getImage = function (image, trademark) {
            var td = document.createElement("td");

            var img = document.createElement("img");
            img.src = image !== null ? image : this.getDefaultImage(trademark);

            img.width = 100;
            img.height = 60;

            td.appendChild(img);
            return td;
        };

        /**
        * Uses a virtual table to search for the image as placeholder.
        * @author Marcelo Camargo
        * @param trademark: string;
        * @return string
        */
        Main.getDefaultImage = function (trademark) {
            trademark = trademark.toLowerCase();
            if (this.placeholder[trademark] !== undefined) {
                return this.placeholder[trademark];
            }
            return "resource/no-image.jpg";
        };
        Main.dataset = document.getElementById("dataset");
        Main.search = document.getElementById("search");
        Main.paginator = document.getElementById("paginator");
        Main.placeholder = {
            volkswagen: "http://img1.wikia.nocookie.net/__cb20131206125409/logopedia/images/9/9f/Volkswagen56.png",
            ford: "http://seeklogo.com/images/F/Ford-logo-FAE532D2CC-seeklogo.com.gif",
            fiat: "http://s3.caradvice.com.au/wp-content/themes/caradvice/assets/img/showroom/fiat.png"
        };
        return Main;
    })();
    FleetManagement.Main = Main;
})(FleetManagement || (FleetManagement = {}));
