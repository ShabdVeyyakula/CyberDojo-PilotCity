
function validateAccountState(page){
    var email = localStorage.getItem('email');

    var _ref = firebase.database().ref().child("UserData").child(email).child('Account Status');

    _ref.once('value').then(function (snapshot) {
        if(snapshot.val() == "Deactivated"){
            document.getElementById('deactivatedAccountSection').style.display = "initial";
            document.getElementById('createDistrictOptions').style.display = "none";

            return "Deactivated";

        } else if(snapshot.val() == "Activated"){

            if(page == 'dashboard'){
                getDistrictStatus();
            }

            if(page = 'createPage'){
                getDistrictStatusCreatePage();
            }

            return "Activated";
        }
    });
}

function getDistrictStatus(){
    var email = localStorage.getItem('email');

    var _ref = firebase.database().ref().child("UserData").child(email).child('Districts');

    _ref.once('value').then(function (snapshot) {
        console.log(snapshot.val());

        var value = snapshot.val();

        if(snapshot.val() == null){
            document.getElementById('createDistrictOptions').style.display = "initial";
            document.getElementById('districtInfo-stats').style.display = "none";
        } else {
            document.getElementById('districtInfo-stats').style.display = "initial";
            document.getElementById('createDistrictOptions').style.display = "none";
            snapshot.forEach((child) => {
                console.log("CHILD:" + child);
                getDistrictData(child.child('Code'));
            });
            
        }
    });
}

function getDistrictStatusCreatePage(){
    var email = localStorage.getItem('email');

    var _ref = firebase.database().ref().child("UserData").child(email).child('Districts');

    _ref.once('value').then(function (snapshot) {
        console.log(snapshot.val());

        if(snapshot.val() == null){
            document.getElementById('createDistrict-page').style.display = "initial";
            document.getElementById('quotaReached').style.display = "none";
        } else {
            document.getElementById('createDistrict-page').style.display = "none";
            document.getElementById('quotaReached').style.display = "initial";
        }
    });
}

function createDistrict(){

    var userEmail = localStorage.getItem('email');
    var name = document.getElementById('districtName').value;
    var email = document.getElementById('districtEmail').value;
    var website = document.getElementById('districtWebsite').value;
    var headOffice = document.getElementById('districtAddress').value;
    var headEmail = document.getElementById('districtEmailHead').value;
    var phone = document.getElementById('districtPhone').value;
    var socialMedia = document.getElementById('districtSocialMedia').value;

    var errorMessage = document.getElementById('districtCreateError');

    if(name,email,website,headOffice,headEmail,phone,socialMedia == ""){

        var errorHTML = `
        <div class="alert alert-danger" role="alert"
        style="margin-top: 20px; width: 100%;">
        <strong>Error! </strong> You can't leave any fields blank
    </div>
        `;

        errorMessage.innerHTML = errorHTML;
        
    } else {
        errorMessage.innerHTML = "";

        var code = Math.floor(100000 + Math.random() * 900000);

        console.log(code);

        var _ref = firebase.database().ref().child('Districts').child(code).child('Name');

        _ref.once('value').then(function (snapshot) {
            var exists = snapshot.val();

            while(exists != null){

                function generateNew(){
                    _newRef.once('value').then(function (snapshot) {
                        if(snapshot.val() == null){
                            code = newCode;
                            return true;
                        }else {
                            return false;
                        }
                    });
                }
                console.log("exists");
                var newCode = Math.floor(100000 + Math.random() * 900000);

                console.log(newCode);

                var _newRef = firebase.database().ref().child('Districts').child(newCode).child('Name');

                var newCode = generateNew();

                if(newCode == true){
                    break
                }
                

            }
        }).then(() => {
            var _ref = firebase.database().ref().child('Districts').child(code);

            _ref.child("Name").set(name);
            _ref.child("Email").set(email);
            _ref.child("Website").set(website);
            _ref.child("Address").set(headOffice);
            _ref.child("Head Email").set(headEmail);
            _ref.child("Phone").set(phone);
            _ref.child("Social Media Links").set(socialMedia);
            _ref.child("Code").set(code);

            var _ref = firebase.database().ref().child('UserData').child(userEmail).child("Districts").child(code);

            _ref.child("Name").set(name);
            _ref.child("Code").set(code);
        });
    }
}

function getDistrictData(code){
    var students = 0;
    var teachers = 0;
    var schools = 0;
    var pendingTeacherRequests = 0;

    console.log("CODE: " + code);

    //STUDENTS GET

    var _studentRef = firebase.database().ref().child('Districts').child(code).child("Student Count");

    _studentRef.once('value').then(function (snapshot) {
        var value = snapshot.val();

        if(value == null || value == undefined){
            students = 12;
            _studentRef.set(students);
        } else {
            students = snapshot.val();
        }
    });

    $('#studentsCount').text(students);


}