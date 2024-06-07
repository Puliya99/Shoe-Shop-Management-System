export class SupplierModel{
    constructor(id,name,category,address1,address2,address3,address4,address5,address6,contact1,contact2,mail,itemEntityList) {
        this.supplierCode = id;
        this.supplierName = name;
        this.category = category;
        this.addressLine1=address1;
        this.addressLine2 = address2;
        this.addressLine3 = address3;
        this.addressLine4 = address4;
        this.addressLine5 = address5;
        this.addressLine6 = address6;
        this.contact1 = contact1;
        this.contact2 = contact2;
        this.email = mail;
        this.itemEntityList = itemEntityList;
    }
}