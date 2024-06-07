export class CustomerModel{
    constructor(id,name,gender,joinDate,level,dob,address1,address2,address3,address4,address5,contact,mail,point,lastBuyDate) {
        this.customerCode = id;
        this.customerName =name;
        this.customerGender = gender;
        this.customerJoinDate = joinDate;
        this.level = level;
        this.birthDay = dob;
        this.addressLine1 = address1;
        this.addressLine2 = address2;
        this.addressLine3 = address3;
        this.addressLine4 = address4;
        this.addressLine5 = address5;
        this.contactNumber = contact;
        this.email = mail;
        this.totalPoints = point
        this.recentPurchaseDate = lastBuyDate
    }
}