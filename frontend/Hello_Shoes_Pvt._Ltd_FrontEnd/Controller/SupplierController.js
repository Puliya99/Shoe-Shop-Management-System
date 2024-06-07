import {SupplierModel} from "../Model/SupplierModel.js";


// Save Suppliers
$('#supplierSaveBtn').on('click', ()=>{

    var supplierCode = $('#supplierCodeTxt').val();
    var supplierName = $('#supplierNameTxt').val();
    var category = $('#supCategoryOption').val();
    var address1 = $('#address1Txt').val();
    var address2 = $('#address2Txt').val();
    var address3 = $('#address3Txt').val();
    var address4 = $('#address4Txt').val();
    var address5 = $('#address5Txt').val();
    var address6 = $('#address6Txt').val();
    var contact1 = $('#contact1Txt').val();
    var contact2 = $('#contact2Txt').val();
    var mail = $('#mailTxt').val();


    if (validate(supplierCode,"Supplier Code") && validate(supplierName,"Supplier Name") && validate(category,"Category") && validate(address1,"Address 1") && validate(address2,"Address 2") && validate(address3,"Address 3") && validate(address4,"Address 4")&& validate(address5,"Address 5")&& validate(address6,"Address 6") && validate(contact1,"Contact 1") && validate(contact2,"Contact 2") && validate(mail,"Mail")){


        var  supplierDetails = new SupplierModel(supplierCode,supplierName,category,address1,address2,address3,address4,address5,address6,contact1,contact2,mail);
        var supplierDetailsJson = JSON.stringify(supplierDetails);

        $.ajax({
            type: "POST",
            url: "http://localhost:9090/shoes/supplier/save",
            contentType: "application/json",
            data: supplierDetailsJson,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
            },
            success: function(data) {
                $('#supplier_Table').empty();
                getAllSupplier();
                clearTextFields();
                Swal.fire({
                    title: "Supplier Save Success",
                    icon: "success"
                });
            },
            error: function(xhr, status, error) {
                alert("Failed");
            }
        });
    }

})


// Search Supplier
$('#supplierSearchBtn').on('click', ()=>{

    var searchSupId = $('#supplierSearchTxt').val();


    if (validate(searchSupId,"Search Supplier Code")){
        $.ajax({
            type: "GET",
            url: "http://localhost:9090/shoes/supplier/search/"+searchSupId,
            contentType: "application/json",
            data: false,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
            },
            success: function(data) {

                if (!data){
                    Swal.fire({
                        title: "Sorry This Id Have No Supplier !",
                        icon: "info"
                    });
                }else {
                    $('#supplierCodeTxt').val(data.supplierCode);
                    $('#supplierNameTxt').val(data.supplierName);
                    $('#supCategoryOption').val(data.category);
                    $('#address1Txt').val(data.addressLine1);
                    $('#address2Txt').val(data.addressLine2);
                    $('#address3Txt').val(data.addressLine3);
                    $('#address4Txt').val(data.addressLine4);
                    $('#address5Txt').val(data.addressLine5);
                    $('#address6Txt').val(data.addressLine6);
                    $('#contact1Txt').val(data.contact1);
                    $('#contact2Txt').val(data.contact2);
                    $('#mailTxt').val(data.email);
                }

            },
            error: function(xhr, status, error) {
                alert("Failed");
            }
        });

    }

})




// update Employee
$('#supplierUpdateBtn').on('click', ()=>{

    var updateSupplierCode = $('#supplierCodeTxt').val();
    var supplierName = $('#supplierNameTxt').val();
    var category = $('#supCategoryOption').val();
    var address1 = $('#address1Txt').val();
    var address2 = $('#address2Txt').val();
    var address3 = $('#address3Txt').val();
    var address4 = $('#address4Txt').val();
    var address5 = $('#address5Txt').val();
    var address6 = $('#address6Txt').val();
    var contact1 = $('#contact1Txt').val();
    var contact2 = $('#contact2Txt').val();
    var mail = $('#mailTxt').val();


    if (validate(updateSupplierCode,"Update Supplier Code") && validate(supplierName,"Supplier Name") && validate(category,"Category") && validate(address1,"Address 1") && validate(address2,"Address 2") && validate(address3,"Address 3")&& validate(address4,"Address 4")&& validate(address5,"Address 5") && validate(address6,"Address 6") && validate(contact1,"Contact 1") && validate(contact2,"Contact 2") && validate(mail,"Mail")){

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success m-1",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Do you want to Update this Suppler ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Update it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {


                var  supplierDetails = new SupplierModel(updateSupplierCode,supplierName,category,address1,address2,address3,address4,address5,address6,contact1,contact2,mail);
                var supplierDetailsJson = JSON.stringify(supplierDetails);

                $.ajax({
                    type: "PUT",
                    url: "http://localhost:9090/shoes/supplier/update/"+updateSupplierCode,
                    contentType: "application/json",
                    data: supplierDetailsJson,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
                    },
                    success: function(data) {
                        $('#supplier_Table').empty();
                        getAllSupplier();
                        clearTextFields();
                        swalWithBootstrapButtons.fire({
                            title: "Supplier Update Success !",
                            icon: "success"
                        });
                    },
                    error: function(xhr, status, error) {
                        alert("Failed");
                    }
                });

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Suppler Update Cancelled !",
                    icon: "error"
                });
            }
        });



    }

})

// Delete Employee
$('#supplierDeleteBtn').on('click', ()=>{

    var deleteSupplierCode = $('#supplierCodeTxt').val();


    if (validate(deleteSupplierCode,"Delete Supplier Code")){

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success m-1",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Do you want to Delete this Suppler?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:9090/shoes/supplier/delete/"+deleteSupplierCode,
                    contentType: "application/json",
                    data: false,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
                    },
                    success: function(data) {
                        $('#supplier_Table').empty();
                        getAllSupplier();
                        clearTextFields();
                        swalWithBootstrapButtons.fire({
                            title: "Suppler Delete Success !",
                            icon: "success"
                        });
                    },
                    error: function(xhr, status, error) {
                        Swal.fire({
                            title: "Sorry Sir !!",
                            text:  " Your account does not have permission to delete the Suppliers details!",
                            icon: "error"
                        });
                    }
                });

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Item Delete Cancelled !",
                    icon: "error"
                });
            }
        });

    }

})


// get All Suppliers and supplier table set data
const getAllSupplier = () => {
    $.ajax({
        type: "GET",
        url: "http://localhost:9090/shoes/supplier/getAllSuppliers",
        contentType: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("jwtToken"));
        },
        success: function(data) {
            data.forEach(suppliers => {
                var newRow = "<tr><th scope='row'>" + suppliers.supplierCode + "</th><td>" + suppliers.supplierName + "</td><td>" + suppliers.category + "</td><td>" + suppliers.addressLine1 + "</td><td>" + suppliers.addressLine2   + "</td><td>" + suppliers.addressLine3 + "</td><td>" + suppliers.addressLine4 + "</td><td>" + suppliers.addressLine5 + "</td><td>" + suppliers.addressLine6 + "</td><td>" + suppliers.contact1  +  "</td><td>" + suppliers.contact2 +  "</td><td>" + suppliers.email +  "</td></tr>";
                $("#supplier_Table").append(newRow);
            });

        },
        error: function(xhr, status, error) {
            alert("Failed");
        }
    });
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
    getAllSupplier();
});

function clearTextFields() {
    $("#supplierCodeTxt").val("");
    $("#supplierNameTxt").val("");
    $("#supCategoryOption").val("");
    $("#address1Txt").val("");
    $("#address2Txt").val("");
    $("#address3Txt").val("");
    $("#address4Txt").val("");
    $("#address5Txt").val("");
    $("#address6Txt").val("");
    $("#contact1Txt").val("");
    $("#contact2Txt").val("");
    $("#mailTxt").val("");
}

//row click and get values text fields
$("#supplier_Table").on("click","tr", function (){
    let id = $(this).find("th");
    let data = $(this).find("td");

    $("#supplierCodeTxt").val(id.eq(0).text());
    $("#supplierNameTxt").val(data.eq(0).text());
    $("#supCategoryOption").val(data.eq(1).text());
    $("#address1Txt").val(data.eq(2).text());
    $("#address2Txt").val(data.eq(3).text());
    $("#address3Txt").val(data.eq(4).text());
    $("#address4Txt").val(data.eq(5).text());
    $("#address5Txt").val(data.eq(6).text());
    $("#address6Txt").val(data.eq(7).text());
    $("#contact1Txt").val(data.eq(8).text());
    $("#contact2Txt").val(data.eq(9).text());
    $("#mailTxt").val(data.eq(10).text());

});
