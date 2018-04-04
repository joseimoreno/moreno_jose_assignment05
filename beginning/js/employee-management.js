/*eslint-env browser*/

window.addEventListener('load', function () {

    'use strict';

    var $ = function (id) {
        return document.getElementById(id);
    };

    function currentEmployees() {
        var employees = [];

        var employee1 = ['Amy Indanger', 'Lab Hazmat', 331];
        var employee2 = ['Manny Legs', 'Lab Tachnician', 332];
        var employee3 = ['Sam Aiam', 'Lab Supervisor', 333];
        var employee4 = ['Carl Strauss', 'Lab Scientist', 334];
        var employee5 = ['Molly Eria', 'Lab Manager', 335];

        employees.push(employee1, employee2, employee3, employee4, employee5);

        return employees;
    }

    function validate(name, title, extension) {

        if (!name || !title || !extension) {
            if (name === '') {
                $('name-error').innerHTML = "Enter Value";
            } else {
                $('name-error').innerHTML = "";
            }
            if (title === '') {
                $('title-error').innerHTML = "Enter Value";
            } else {
                $('title-error').innerHTML = "";
            }
            if (extension === '') {
                $('extension-error').innerHTML = "Enter Value";
            } else {
                $('name-error').innerHTML = "";
            }

            return false;
        }

        if (isNaN(+extension)) {
            $('extension-error').innerHTML = "Extension Must be a Number";
            return false;
        } else {
            $('extension-error').innerHTML = "";
        }

        return true;
    }

    function add(employees) {

        var tempEmployee = [];
        var name = $('name').value;
        var title = $('title').value;
        var extension = $('extension').value;

        if (!validate(name, title, extension)) {
            return false;
        }

        $('name-error').innerHTML = '';
        tempEmployee[0] = name;
        $('name').value = '';

        $('title-error').innerHTML = '';
        tempEmployee[1] = title;
        $('title').value = '';

        $('extension-error').innerHTML = '';
        tempEmployee[2] = extension;
        $('extension').value = '';

        makeTable(tempEmployee);
        employees.push(tempEmployee);
    }

    function makeTable(employee) {
        var table = $('table');
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = employee[0];
        cell2.innerHTML = employee[1];
        cell3.innerHTML = employee[2];
        cell4.innerHTML = "<button class='deleteBtn'>Delete</button>";
    }

    function init() {
        var employees = currentEmployees();

        employees.forEach(function (employee) {
            makeTable(employee);
        });

        $('enter').addEventListener('click', function () {
            add(employees);

            $('num-employees').innerHTML = employees.length;
        });

        var table = $('table');

        table.addEventListener('click', function (e) {
            if (e.target.nodeName === 'BUTTON') {

                var cell = e.target.parentNode;
                var row = cell.parentNode;
                var table = row.parentNode;

                var rowInfo = row.childNodes;
                var name = rowInfo[0].innerHTML;
                var title = rowInfo[1].innerHTML;
                var extension = rowInfo[2].innerHTML;

                for (var i = 0; i < employees.length; i++) {
                    if (employees[i][0] == name && employees[i][1] == title && employees[i][2] == extension) {
                        employees.splice(i, 1);
                    }
                }

                table.removeChild(row);

                $('num-employees').innerHTML = employees.length;
            }
        });

        $('num-employees').innerHTML = employees.length;

    }

    init();
});

