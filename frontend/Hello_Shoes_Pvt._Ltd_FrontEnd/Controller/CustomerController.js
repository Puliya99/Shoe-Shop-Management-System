import {CustomerModel} from "../Model/CustomerModel.js";

let jwtToken = localStorage.getItem("jwtToken")

// Save Customer
$('#customerSaveBtn').on('click', ()=>{
    var customerId = $('#customerIdTxt').val();
    var customerName = $('#customerNameTxt').val();
    var contact= $('#custContactTxt').val();
    var mail = $('#custEmailTxt').val();
    var gender = $('#customerGenderOpation').val();
    var address1 = $('#custAddress1').val();
    var address2 = $('#custAddress2').val();
    var address3 = $('#custAddress3').val();
    var address4 = $('#custAddress4').val();
    var address5 = $('#custAddress5').val();
    var bod = $('#custBirthday').val();
    var joinDate = $('#custJoinDate').val();
    var level = $('#custLevel').val();

    if (validate(customerId,"Customer Id") && validate(customerName,"Customer Name") && validate(contact,"Contact") && validate(mail,"Mail") && validate(gender,"Gender") && validate(address1,"Address 1") && validate(address2,"Address 2") && validate(address3,"Address 3") && validate(address4,"Address 4") && validate(address5,"Address 5") && validate(bod,"Birthday") && validate(joinDate,"Join Date") && validate(level,"Level")){

        var customerDetails = new CustomerModel(customerId,customerName,gender,joinDate,level,bod,address1,address2,address3,address4,address5,contact,mail);
        var customerDetailsJson = JSON.stringify(customerDetails);

        const sendAJAX = (customerDetails,jwtToken) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:9090/shoes/customer/save",
                contentType: "application/json",
                data: customerDetails,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
                },
                success: function(data) {
                    $("#customer_Table").empty();
                    getAllCustomerSendAJAX(jwtToken)
                    clearTextFields();
                    $('#custLevel').val('BRONZE')
                    Swal.fire({
                        title: "Customer Save Success",
                        icon: "success"
                    });
                },
                error: function(xhr, status, error) {
                    alert("Failed");
                }
            });
        };
        sendAJAX(customerDetailsJson, jwtToken);

    }
})


// Update Customer
$('#custUpdateBtn').on('click', ()=>{
    var customerId = $('#customerIdTxt').val();
    var customerName = $('#customerNameTxt').val();
    var contact= $('#custContactTxt').val();
    var mail = $('#custEmailTxt').val();
    var gender = $('#customerGenderOpation').val();
    var address1 = $('#custAddress1').val();
    var address2 = $('#custAddress2').val();
    var address3 = $('#custAddress3').val();
    var address4 = $('#custAddress4').val();
    var address5 = $('#custAddress5').val();
    var bod = $('#custBirthday').val();
    var joinDate = $('#custJoinDate').val();
    var level = $('#custLevel').val();

    if (validate(customerId,"Customer Id") && validate(customerName,"Customer Name") && validate(contact,"Contact") && validate(mail,"Mail") && validate(gender,"Gender") && validate(address1,"Address 1") && validate(address2,"Address 2") && validate(address3,"Address 3") && validate(address4,"Address 4") && validate(address5,"Address 5") && validate(bod,"Birthday") && validate(joinDate,"Join Date") && validate(level,"Level")) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success m-1",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Do you want to Update this Customer ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Update it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var customerDetails = new CustomerModel(customerId, customerName, gender, joinDate, level, bod, address1, address2, address3, address4, address5, contact, mail);
                var customerDetailsJson = JSON.stringify(customerDetails);

                $.ajax({
                    type: "PUT",
                    url: "http://localhost:9090/shoes/customer/update/" + customerId,
                    contentType: "application/json",
                    data: customerDetailsJson,
                    beforeSend: function(xhr) {
                        // Consider using a JWT library for better handling
                        xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
                    },
                    success: function(data) {
                        $("#customer_Table").empty();
                        getAllCustomerSendAJAX(jwtToken);
                        clearTextFields();
                        $('#custLevel').val('BRONZE');
                        Swal.fire({
                            title: "Customer Update Success",
                            icon: "success"
                        });
                    },
                    error: function(xhr, status, error) {
                        Swal.fire("Error", "Failed to update customer!", "error");  // Simplified error message
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Customer Update Cancelled !",
                    icon: "error"
                });
            }
        });
    }
});

// Delete Customer
$('#custDeleteBtn').on('click', ()=>{

    var customerId = $('#customerIdTxt').val();

    if (validate(customerId,"Customer Id")){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success m-1",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Do you want to Remove this Customer ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:9090/shoes/customer/delete/"+ customerId,
                    contentType: "application/json",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
                    },
                    success: function(data) {
                        $("#customer_Table").empty();
                        getAllCustomerSendAJAX(jwtToken)
                        clearTextFields();
                        $('#custLevel').val('BRONZE')

                        swalWithBootstrapButtons.fire({
                            title: "Customer Deleted Success !",
                            icon: "success"
                        });

                    },
                    error: function(xhr, status, error) {
                        Swal.fire({
                            title: "Sorry Sir !!",
                            text:  " Your account does not have permission to delete the customer details!",
                            icon: "error"
                        });
                    }
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Customer Deleted Cancelled !",
                    icon: "error"
                });
            }
        });
    }
})


// Customer Search
$('#customerSearchBtn').on('click', ()=>{
    var customerId = $('#custSearchTxt').val();

    if (validate(customerId,"Customer Id")){
        const sendAJAX = (jwtToken) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:9090/shoes/customer/search/"+ customerId,
                contentType: "application/json",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
                },
                success: function(data) {
                    if (!data){
                        Swal.fire({
                            title: "Sorry This Id Have No Customer !",
                            icon: "info"
                        });
                    }else {
                        $("#customerIdTxt").val(data.customerCode);
                        $("#customerNameTxt").val(data.customerName);
                        $("#custContactTxt").val(data.contactNumber);
                        $("#custEmailTxt").val(data.email);
                        $("#customerGenderOpation").val(data.customerGender);
                        $("#custAddress1").val(data.addressLine1);
                        $("#custAddress2").val(data.addressLine2);
                        $("#custAddress3").val(data.addressLine3);
                        $("#custAddress4").val(data.addressLine4);
                        $("#custAddress5").val(data.addressLine5);
                        $("#custBirthday").val(data.birthDay);
                        $("#custJoinDate").val(data.customerJoinDate);
                        $("#custLevel").val(data.level);
                        $("#totalPoints").val(data.totalPoints);
                        $("#recentPurchaseDate").val(data.recentPurchaseDate);
                    }
                },
                error: function(xhr, status, error) {
                    alert("Failed");
                }
            });
        };
        sendAJAX(jwtToken);
    }
})

// Get All Customer
const getAllCustomerSendAJAX = (jwtToken) => {
    $.ajax({
        type: "GET",
        url: "http://localhost:9090/shoes/customer/getAllCustomer",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);
        },
        success: function(data) {
            console.log(data)
            data.forEach(customer => {
                var newRow = "<tr><th scope='row'>" + customer.customerCode + "</th><td>" + customer.customerName + "</td><td>" + customer.contactNumber + "</td><td>" + customer.email + "</td><td>" + customer.customerGender + "</td><td>" + customer.addressLine1 + "</td><td>" + customer.addressLine2 + "</td><td>" + customer.addressLine3 + "</td><td>" + customer.addressLine4 + "</td><td>" + customer.addressLine5 + "</td><td>" + customer.birthDay + "</td><td>" + customer.customerJoinDate + "</td><td>" + customer.level + "</td><td>" + customer.totalPoints + "</td><td>" + customer.recentPurchaseDate  + "</td></tr>";
                $("#customer_Table").append(newRow);
            });
        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
};

//row click and get values text fields
$("#customer_Table").on("click","tr", function (){
    let id = $(this).find("th");
    let data = $(this).find("td");

    $("#customerIdTxt").val(id.eq(0).text());
    $("#customerNameTxt").val(data.eq(0).text());
    $("#custContactTxt").val(data.eq(1).text());
    $("#custEmailTxt").val(data.eq(2).text());
    $("#customerGenderOpation").val(data.eq(3).text());
    $("#custAddress1").val(data.eq(4).text());
    $("#custAddress2").val(data.eq(5).text());
    $("#custAddress3").val(data.eq(6).text());
    $("#custAddress4").val(data.eq(7).text());
    $("#custAddress5").val(data.eq(8).text());
    $("#custBirthday").val(data.eq(9).text());
    $("#custJoinDate").val(data.eq(10).text());
    $("#custLevel").val(data.eq(11).text());
    $("#totalPoints").val(data.eq(12).text());
    $("#recentPurchaseDate").val(data.eq(13).text());
});

// Text Fields Clear
function clearTextFields() {
    $("#customerIdTxt").val("");
    $("#customerNameTxt").val("");
    $("#custContactTxt").val("");
    $("#custEmailTxt").val("");
    $("#customerGenderOpation").val("");
    $("#custAddress1").val("");
    $("#custAddress2").val("");
    $("#custAddress3").val("");
    $("#custAddress4").val("");
    $("#custAddress5").val("");
    $("#custBirthday").val("");
    $("#custJoinDate").val("");
    $("#custLevel").val("");
    $("#totalPoints").val("");
    $("#recentPurchaseDate").val("");
}

// Validation Function
function validate(value, field_name){
    if (!value){
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = localStorage.getItem("jwtToken");
    getAllCustomerSendAJAX(jwtToken)
    $('#custLevel').val('NEW')
});

