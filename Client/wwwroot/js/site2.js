
$.ajax({
    url: "https://localhost:44378/API/Employees/Gender",

}).done((result) => {
    console.log(result);
    var options = {
        series: [],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: [],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 100
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    result.map(x => {
        options.series.push(Math.round(x.value));
    });
    result.map(x => {
        var gen = '';
        if (x.gender == 0) {
            gen = 'Male'
        } else {
            gen = 'Female'
        }
        options.labels.push(gen);
    });

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}).fail((error) => {
    console.log(error)
})


/*$.ajax({
    url: "https://localhost:44378/API/Employees/Role",

}).done((result) => {

    var options = {
        series: [],
        labels: [],
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 120,
            options: {
                chart: {
                    width: 50
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    result.map(x => {
        options.series.push(Math.round(x.value));
    });
    result.map(x => {
        options.labels.push(x.role);
    });

    var chart = new ApexCharts(document.querySelector("#donutChart"), options);
    chart.render();
}).fail((error) => {
    console.log(error)
})*/

$.ajax({
    url: "https://localhost:44378/API/Employees/Salary",

}).done((result) => {
    console.log(result);
    var options = {
        series: [{
            data: []
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: [],
        }
    };
    result.map(x => {
        options.series[0].data.push(Math.round(x.value));
    });
    result.map(x => {

        options.xaxis.categories.push(x.label);
    });

    var chart = new ApexCharts(document.querySelector("#barchart"), options);
    chart.render();

}).fail((error) => {
    console.log(error)
})


$(document).ready(function () {
    var table = $('#example').DataTable({
        dom: 'Bftrip',
        buttons: [

            /*'excelHtml5'*/
            {
                extend: 'excelHtml5',
                name: 'excel',
                title: 'Employee',
                sheetName: 'Employee',
                text: '<i class=""></i>',
                className: 'buttonHide fa fa-download btn-default',
                filename: 'Employee',
                autoFilter: true,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                }
            }
        ],

        'ajax': {
            url: "Employees/GetAll",
            'dataSrc': ''
        },

        'columns': [
            {
                "data": "null",
                "render": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return row['nik']
                }

            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return row['firstName'] + " " + row['lastName']
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                   /* if (row['phone'].charAt(0) == '0') {
                        return "+62" + row['phone'].substring(1, 11);
                    } else {*/
                        return "+62"+row['phone'];
                    /*}*/
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return "Rp. " + row['salary'];
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return row['email'];
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {

                    if (row['gender'] == 0) {
                        return "Male";
                    } else {
                        return "Female";
                    }
                }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-warning btn-sm"  data-bs-toggle="Edit" data-bs-placement="top" title="Edit" onclick="ModalUpdate(${row['nik']})"><i class="fas fa-edit"></i></i></button>`
                        + `<button type="button" class="btn btn-danger btn-sm" data-bs-toggle="Delete" data-bs-placement="top" title="Tooltip on top" onclick="Delete(${row['nik']})"><i class="fas fa-trash-alt"></i></button>`
                }
            }
        ]
    });
    setInterval(function () {
        table.ajax.reload();
    }, 30000);

    table.ajax.reload(function (json) {
        $('#myInput').val(json.lastInput);
    });
});

function ExportTable(){
    var table = $('#example').DataTable();
    table.buttons('excel:name').trigger();
}

$.ajax({
    url: "https://localhost:44378/API/Universities",
    success: function (result) {
        var university = "";
        $.each(result, function (key, val) {
            university += `<option value="${val.id}">${val.name}</option>`;
        })

        $('#University').html(university);
    }

})

//Insert Data
function insertData() {
    var obj = new Object();
    console.log(obj);
    obj.NIK = $('#inputNIK').val();
    obj.firstName = $('#inputFirstName').val();
    obj.lastName = $('#inputLastName').val();
    obj.phoneNumber = $('#inputPhone').val();
    obj.birthDate = $('#ttl').val();
    obj.salary = parseInt($('#inputSalary').val());
    obj.Email = $('#inputEmail').val();
    obj.Password = $('#Password').val();
    obj.Degree = $('#Degree').val();
    obj.Gpa = parseFloat($('#Gpa').val());
    obj.university_Id = $('#University').val();
    obj.Gender = parseInt($(".Gender:checked").val());
    console.log(obj);
    coba = '';
    $.ajax({
        /*headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },*/
        url: "Employees/Register/",
        type: 'POST',
        'data': obj, //objek kalian
        'dataType': 'json',
    }).done((result) => {
        console.log(result);
        if (result == 200) {
            Swal.fire(
                'Good job!',
                'Data Inserted!',
                'success'
            ), $('#formModal').modal('hide'),
                clearTextBox(),
                table.ajax.reload();
        } else if (result.message == 'NIK Sudah Terdafar') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'NIK already exist!',
            })
        } else if (result.message == 'Email Sudah Terdafar') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email already exist!',
            })
        } else if (result.message == 'Phone Number Sudah Terdafar') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Phone Number already exist!',
            })
        }
    }).fail((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
        })
    })
}

$("#DataEmploye").validate({
    rules: {
        inputNIK: {
            maxlength: 16,
            required: true
        },
        inputFirstName: {
            required: true
        },
        inputLastName: {
            required: true
        },
        inputPhone: {
            minlength: 10,
            maxlength: 12,
            required: true
        },
        ttl: {
            required: true
        },
        inputEmail: {
            emailCustomFormat: true,
            required: true
        },
        Password: {
            /*PasswordCheck: true,*/
            required: true,
            /*minlength: 8*/
        },
        Salary: {
            required: true
        },
        Degree: {
            required: true
        },
        Gpa: {
            required: true
        },
        University: {
            required: true
        }

    },

    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
    highlight: function (element) {
        $(element).closest('.form-control').addClass('is-invalid');
    },
    unhighlight: function (element) {
        $(element).closest('.form-control').removeClass('is-invalid');
    }
});

function Validation() {
    var a = $("#DataEmploye").valid();
    console.log(a);
    if (a == true) {
        insertData();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Register Failed!',
            footer: 'All columns must be filled !'

        })
    }
}

function Delete(id) {
    console.log(id);
    Swal.fire({
        title: 'Are you sure?',
        icon: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "Employees/Delete/" + id,
                type: "Delete"
            }).then((result) => {
                if (result.result == 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted',
                        'success'
                    )
                    $('#example').DataTable().ajax.reload();
                } else if (result.status == 400) {
                    Swal.fire(
                        'Error!',
                        'Your file failed to delete.',
                        'error'
                    )
                } else if (result.status == 404) {
                    Swal.fire(
                        'Warning!',
                        'Your NIK is not valid.',
                        'warning'
                    )
                }

            })
        }
    })
}

function ModalUpdate(nik) {
    console.log(nik);
    $.ajax({
        url: "Employees/Get/" + nik,
        success: function (result) {
            console.log(result);
            $("#ModalUpdate").modal("show");
            $('#inputNIK2').val(result.nik);
             $('#inputFirstName2').val(result.firstName);
            $('#inputLastName2').val(result.lastName);
            $('#inputPhone2').val(result.phone);
            var date = result.birthDate.substr(0, 10);
            $("#ttl2").val(date);
            parseInt($('#inputSalary2').val(result.salary));
            $('#inputEmail2').val(result.email);
            $('#Degree').val(result.Degree);
            parseFloat($('#Gpa').val(result.Gpa));
            $('#University').val();
            if (result.gender === 'Male') {
                $("#gender2").val(0);
            } else {
                $("#gender2").val(1);
            }
        }
    })
}

function Update(id) {
    console.log(id);
    var obj = new Object();
    obj.NIK = $('#inputNIK2').val();
    obj.FirstName = $('#inputFirstName2').val();
    obj.LastName = $('#inputLastName2').val();
    obj.Phone = $('#inputPhone2').val();
    obj.BirthDate = $('#ttl2').val();
    obj.salary = parseInt($('#inputSalary2').val());
    obj.Email = $('#inputEmail2').val();
    obj.Gender = parseInt($("#gender2").val());
    console.log(obj);
    $.ajax({
        /*headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        },*/
        url: "Employees/Put/",
        type: "PUT",
        data: { id: id, entity: obj }, //objek kalian
        dataType: 'json',
    }).then((result) => {
        console.log(result);
        if (result == 200) {
            Swal.fire(
                'Good job!',
                'Data Updated!',
                'success'
            )
            $('#ModalUpdate').modal("toggle"),
            $('#ModalUpdate').modal('hide'),
            $('#example').DataTable().ajax.reload();
        } else {
            alert("error");
        }

    })
}

$.ajax({
    url: "https://localhost:44378/API/Employees/",
    success: function (result) {
        console.log(result.result);
    }

})



$.validator.addMethod("emailCustomFormat", function (value, element) {
    return this.optional(element) || /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
}, "Please_enter_valid_email_message");

/*$.validator.addMethod("PasswordCheck", function (value, element) {
    let Password = value;
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&])(.{8,20}$)/.test(Password))) {
        return false;
    }
    return true;
}, function (value, element) {
    let Password = $(element).val();
    if (!(/^(.{8,20}$)/.test(Password))) {
        return 'Password must be between 8 and 20 characters long.';
    }
    else if (!(/^(?=.*[A-Z])/.test(Password))) {
        return 'Password must contain atleast one uppercase.';
    }
    else if (!(/^(?=.*[a-z])/.test(Password))) {
        return 'Password must contain atleast one lowercase.';
    }
    else if (!(/^(?=.*[0-9])/.test(Password))) {
        return 'Password must contain atleast one digit.';
    }
    else if (!(/^(?=.*[@#$%&])/.test(Password))) {
        return "Password must contain special characters from @#$%&.";
    }
    return false;
});*/

function clearTextBox() {
    $('#inputNIK').val("");
    $('#inputFirstName').val("");
    $('#inputLastName').val("");
    $('#inputPhone').val("");
    $('#ttl').val("");
    $('#inputSalary').val("");
    $('#inputEmail').val("");
    $('#Password').val("");
    $('#Degree').val("");
    $('#Gpa').val("");
    $('#University').val("");
    $('#inputNIK').css('border-color', 'lightgrey');
    $('#inputFirstName').css('border-color', 'lightgrey');
    $('#inputLastName').css('border-color', 'lightgrey');
    $('#inputPhone').css('border-color', 'lightgrey');
    $('#ttl').css('border-color', 'lightgrey');
    $('#inputSalary').css('border-color', 'lightgrey');
    $('#inputEmail').css('border-color', 'lightgrey');
    $('#Password').css('border-color', 'lightgrey');
    $('#Degree').css('border-color', 'lightgrey');
    $('#Gpa').css('border-color', 'lightgrey');
    $('#University').css('border-color', 'lightgrey');
}


/*$.ajax({
    url: "",

}).done((result) => {
    console.log(result);
    var options = {
        series: [2, 8],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Female', 'Male'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 100
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
   *//* result.map(x => {
        *//* options.series.push(Math.round(x.value));*//*
    });*//*
   *//* result.map(x => {
        *//* var gen = '';
         if (x.gender == 0) {
             gen = 'Male'
         } else {
             gen = 'Female'
         }
         options.labels.push(gen);*//*
    });
*//*
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}).fail((error) => {
    console.log(error)
})

$.ajax({
    url: "",

}).done((result) => {
    console.log(result);
    var options = {
        series: [2, 2, 6],
        chart: {
            type: 'donut',
        },
        labels: ['Manager', 'Dirrector', 'Employee'],
        responsive: [{
            breakpoint: 10,
            options: {
                chart: {
                    width: 10
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var chart = new ApexCharts(document.querySelector("#donut"), options);
    chart.render();
}).fail((error) => {
    console.log(error)
})
*/
