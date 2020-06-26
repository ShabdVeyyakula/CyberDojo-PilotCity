function initializeFirebase() {
    var firebaseConfig = {
        production: true,
        apiKey: "AIzaSyA2ESJBkNRjibHsQr2UTHtyYPslzNleyXw",
        authDomain: "cyberdojo-a2a3e.firebaseapp.com",
        databaseURL: "https://cyberdojo-a2a3e.firebaseio.com",
        projectId: "cyberdojo-a2a3e",
        storageBucket: "cyberdojo-a2a3e.appspot.com",
        messagingSenderId: "938057332518",
        appId: "1:938057332518:web:99c34da5abf1b1548533e7",
        measurementId: "G-0EWJ1V40VX"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

//FIRESTORE MIGRATED
function facebookLoginStudent() {
    base_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        var errorMessage = document.getElementById('signupError');


        //OLD CODE
        // var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        // _ref.once('value').then(function (snapshot) {
        //     var exists = snapshot.val();

        //     console.log(exists);

        //     if (exists == null) {
        //         errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
        //     </div>`;

        //         errorMessage.innerHTML = errorHTML;


        //     } else {

        //         if (exists == "Student") {
        //             localStorage.setItem("photo", profilePic);
        //             localStorage.setItem("email", formattedEmail);
        //             localStorage.setItem("name", name3);

        //             window.location = "/studentDashboard.html";

        //             window.location = "/studentDashboard.html";
        //         } else {
        //             errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
        //     </div>`;

        //             errorMessage.innerHTML = errorHTML;
        //         }

        //     }

        // });


        //NEW CODE
        firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {
            if (doc.exists) {
                var accountType = doc.data()["Account Type"];


                if (accountType != null) {
                    if (accountType == "Student") {

                        localStorage.setItem("email", email);

                        window.location = "../studentPortal/studentDashboard.html";
                    } else {

                        errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account was signed up as a ${accountType} account. You do not have sufficient permissions.
            </div>`;

                        document.getElementById('signupError').innerHTML = errorHTML;

                    }
                } else {

                    errorHTML = `<div class="alert alert-danger" role="alert" 
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
                 <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
           </div>`;

                    document.getElementById('signupError').innerHTML = errorHTML;
                }


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }).catch(function (err) {

        var errorMessage = document.getElementById('signupError');

        console.log(err)
        console.log("Facebook Sign In Failed");

        if (err.code == "auth/account-exists-with-different-credential") {
            errorHTML = `<div class="alert alert-danger" role="alert" 
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Oops! </strong> An account with this email is already registered.
        </div>`;

            errorMessage.innerHTML = errorHTML;
        }
    })
}


//FIRESTORE MIGRATED
function facebookLoginDistrict() {
    base_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        var errorMessage = document.getElementById('signupError');



        //OLD CODE
        // var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        // _ref.once('value').then(function (snapshot) {
        //     var exists = snapshot.val();

        //     console.log(exists);

        //     if (exists == null) {
        //         errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
        //     </div>`;

        //         errorMessage.innerHTML = errorHTML;


        //     } else {

        //         if (exists == "District") {
        //             localStorage.setItem("photo", profilePic);
        //             localStorage.setItem("email", formattedEmail);
        //             localStorage.setItem("name", name3);

        //             window.location = "/dashboard.html";

        //             window.location = "/districtDashboard.html";
        //         } else {
        //             errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
        //     </div>`;

        //             errorMessage.innerHTML = errorHTML;
        //         }

        //     }

        // });

        //NEW CODE
        firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {

            var accountType = doc.data()["Account Type"];

            if (accountType != null) {
                if (accountType == "District") {
                    console.log('Login Success');
                    localStorage.setItem("email", email);
                    window.location = "districtDashboard.html";
                } else {

                    errorHTML = `<div class="alert alert-danger" role="alert" 
                        style="margin-top: 20px; width: 94%; margin-left: 6%;">
                        <strong>Oops! </strong> This account was signed up as a ${accountType} account. You do not have sufficient permissions.
                    </div>`;

                    document.getElementById('signupError').innerHTML = errorHTML;

                }
            } else {

                errorHTML = `<div class="alert alert-danger" role="alert" 
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
                 <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
           </div>`;

                document.getElementById('signupError').innerHTML = errorHTML;
            }

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });




    }).catch(function (err) {

        var errorMessage = document.getElementById('signupError');

        console.log(err)
        console.log("Facebook Sign In Failed");

        if (err.code == "auth/account-exists-with-different-credential") {
            errorHTML = `<div class="alert alert-danger" role="alert" 
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Oops! </strong> An account with this email is already registered.
        </div>`;

            errorMessage.innerHTML = errorHTML;
        }
    })
}


//FIRESTORE MIGRATED WORKING
function facebookLoginTeacher() {
    base_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        //OLD CODE
        // var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        // _ref.once('value').then(function (snapshot) {
        //     var exists = snapshot.val();

        //     console.log(exists);

        //     if (exists == null) {
        //         errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
        //     </div>`;

        //         errorMessage.innerHTML = errorHTML;


        //     } else {

        //         if (exists == "Teacher") {
        //             localStorage.setItem("photo", profilePic);
        //             localStorage.setItem("email", formattedEmail);
        //             localStorage.setItem("name", name3);

        //             window.location = "/dashboard.html";
        //         } else {
        //             errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
        //     </div>`;

        //             errorMessage.innerHTML = errorHTML;
        //         }

        //     }

        // });

        //NEW CODE

        firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {

            var accountType = doc.data()['Account Type'];


            if (accountType != null) {
                if (accountType == "Teacher") {
                    console.log('Login Success');
                    localStorage.setItem("photo", profilePic);
                    localStorage.setItem("email", email);
                    localStorage.setItem("name", name3);

                    window.location = "/dashboard.html";
                } else {

                    errorHTML = `<div class="alert alert-danger" role="alert" 
                        style="margin-top: 20px; width: 94%; margin-left: 6%;">
                        <strong>Oops! </strong> This account was signed up as a ${accountType} account. You do not have sufficient permissions.
                    </div>`;

                    document.getElementById('signupError').innerHTML = errorHTML;

                }
            } else {

                errorHTML = `<div class="alert alert-danger" role="alert" 
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
                 <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
           </div>`;

                document.getElementById('signupError').innerHTML = errorHTML;
            }

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });



    }).catch(function (err) {

        var errorMessage = document.getElementById('signupError');

        console.log(err)
        console.log("Facebook Sign In Failed");

        if (err.code == "auth/account-exists-with-different-credential") {
            errorHTML = `<div class="alert alert-danger" role="alert" 
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Oops! </strong> An account with this email is already registered.
        </div>`;

            errorMessage.innerHTML = errorHTML;
        }
    })
}


//FIRESTORE MIGRATED SHOULD WORK?
googleSignInStudent = () => {
    console.log('this is executing');

    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {

            console.log("data from doc : ", doc.data());

            var accountType = doc.data()['Account Type'];

            console.log("Document data:", doc.data()["Account Type"]);

            if (accountType != null) {
                if (accountType == "Student") {
                    console.log('Login Success');

                    localStorage.setItem("photo", profilePic);
                    localStorage.setItem("email", email);
                    localStorage.setItem("name", name3);

                    window.location = "../studentPortal/studentDashboard.html";

                } else {

                    errorHTML = `<div class="alert alert-danger" role="alert" 
                     style="margin-top: 20px; width: 94%; margin-left: 6%;">
                      <strong>Oops! </strong> This account was signed up as a ${accountType} account. You do not have sufficient permissions.
                </div>`;

                    document.getElementById('signupError').innerHTML = errorHTML;

                }
            } else {

                errorHTML = `<div class="alert alert-danger" role="alert" 
                   style="margin-top: 20px; width: 94%; margin-left: 6%;">
                        <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
                  </div>`;

                document.getElementById('signupError').innerHTML = errorHTML;

            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });


        // var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        // _ref.once('value').then(function (snapshot) {
        //     var exists = snapshot.val();

        //     if (exists == null) {
        //         errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
        //     </div>`;

        //         errorMessage.innerHTML = errorHTML;


        //     } else {
        //         if (exists == "Student") {
        //             localStorage.setItem("photo", profilePic);
        //             localStorage.setItem("email", formattedEmail);
        //             localStorage.setItem("name", name3);



        //             window.location = "/studentDashboard.html";
        //         } else {
        //             errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
        //     </div>`;

        //             errorMessage.innerHTML = errorHTML;
        //         }
        //     }

        // });

        //NEW CODE

    });

}


//FIRESTORE MIGRATED WORKING
googleSignInTeacher = () => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;



        var errorMessage = document.getElementById('signupError');

        // old code
        // var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        // _ref.once('value').then(function (snapshot) {

        //     var exists = snapshot.val();

        //     console.log(exists);

        //     if (exists == null) {
        //         errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
        //     </div>`;

        //         errorMessage.innerHTML = errorHTML;


        //     } else {
        //         if (exists == "Teacher") {
        //             localStorage.setItem("photo", profilePic);
        //             localStorage.setItem("email", formattedEmail);
        //             localStorage.setItem("name", name3);

        //             window.location = "/dashboard.html";
        //         } else {
        //             errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
        //     </div>`;

        //             errorMessage.innerHTML = errorHTML;
        //         }
        //     }

        // });

        //NEW CODE

        firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {
            localStorage.setItem("email", email);


            console.log("data from doc : ", doc.data());

            var accountType = doc.data()['Account Type'];

            if (doc.exists) {
                console.log("Document data:", doc.data()["Account Type"]);

                if (accountType != null) {
                    if (accountType == "Teacher") {
                        console.log('Login Success');

                        localStorage.setItem("photo", profilePic);
                        localStorage.setItem("email", email);
                        localStorage.setItem("name", name3);

                        var emailDisplay = localStorage.getItem("email");

                        console.log("Email:" + email + ":" + emailDisplay);

                        window.location = "../../dashboard.html";
                    } else {

                        errorHTML = `<div class="alert alert-danger" role="alert" 
                        style="margin-top: 20px; width: 94%; margin-left: 6%;">
                        <strong>Oops! </strong> This account was signed up as a ${accountType} account. You do not have sufficient permissions.
                    </div>`;

                        document.getElementById('signupError').innerHTML = errorHTML;

                    }
                } else {

                    errorHTML = `<div class="alert alert-danger" role="alert"
                    style="margin-top: 20px; width: 94%; margin-left: 6%;">
                    <strong>Error! </strong> An unexpected error has acurred, please contact customer support.
                </div>`;

                    document.getElementById('signupError').innerHTML = errorHTML;
                }
            } else {

                errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
           </div>`;

                errorMessage.innerHTML = errorHTML;

            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });





    }).catch(function (err) {
        console.log(err)
        console.log("Google Sign In Failed");
    })
}


//FIRESTORE MIGRATED
googleSignInDistrict = () => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        var errorMessage = document.getElementById('signupError');

        //OLD CODE
        // var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        // _ref.once('value').then(function (snapshot) {
        //     var exists = snapshot.val();

        //     if (exists == null) {
        //         errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
        //     </div>`;

        //         errorMessage.innerHTML = errorHTML;


        //     } else {
        //         if (exists == "District") {
        //             localStorage.setItem("photo", profilePic);
        //             localStorage.setItem("email", formattedEmail);
        //             localStorage.setItem("name", name3);

        //             window.location = "/districtDashboard.html";
        //         } else {
        //             errorHTML = `<div class="alert alert-danger" role="alert" 
        //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
        //         <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
        //     </div>`;

        //             errorMessage.innerHTML = errorHTML;
        //         }
        //     }

        // });

        //NEW CODE

        firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {

            var accountType = "";

            if (doc.exists) {
                accountType = doc.data()["Account Type"];
                // console.log("Document data:", doc.data()["Account Type"]);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }


            if (accountType != null) {
                if (accountType == "District") {
                    console.log('Login Success');
                    localStorage.setItem("email", email);
                    window.location = "../districtDashboard.html";
                } else {

                    errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account was signed up as a ${accountType} account. You do not have sufficient permissions.
            </div>`;

                    document.getElementById('signupError').innerHTML = errorHTML;

                }
            } else {

                errorHTML = `<div class="alert alert-danger" role="alert"
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Error! </strong> An unexpected error has acurred, please contact customer support.
        </div>`;

                document.getElementById('signupError').innerHTML = errorHTML;
            }

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }).catch(function (err) {
        console.log(err)
        console.log("Google Sign In Failed");
    })
}





const btnLogout = document.getElementById("btnLogout");

//FIRESTORE MIGRATED
function emailSignUp(type) {

    document.getElementById('signup-btn-text').style.display = "none";
    document.getElementById('signup-btn-main-button').disabled = true;
    document.getElementById('btn-loading').style.display = "initial";

    var email = document.getElementById('inputEmail').value;
    var displayName = document.getElementById('inputDisplayName').value;
    var password = document.getElementById('inputPassword').value;
    var repeatPassword = document.getElementById('inputRepeatPassword').value;

    var loginSuccess = true;

    var errorMessage = document.getElementById('signupError');

    var errorHTML = `<div class="alert alert-danger" role="alert"
    style="margin-top: 20px; width: 94%; margin-left: 6%;">
    <strong>Oops! </strong>${errorMessage}
</div>`;

    if (email == "" || displayName == "" || password == "" || repeatPassword == "") {
        errorHTML = `<div class="alert alert-danger" role="alert" 
    style="margin-top: 20px; width: 94%; margin-left: 6%;">
    <strong>Oops! </strong> You cannot leave any of the fields blank
</div>`;

        errorMessage.innerHTML = errorHTML;
    } else {
        if (password != repeatPassword) {
            errorHTML = `<div class="alert alert-danger" role="alert"
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Oops! </strong> Password and repeat password don't match
        </div>`;

            errorMessage.innerHTML = errorHTML;
        } else {

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {

                document.getElementById('signupError').innerHTML = "";


                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorMessage);
                console.log(errorCode);

                loginSuccess = false;

                if (errorCode == "auth/invalid-email") {
                    document.getElementById('email-error').innerHTML = errorMessage;
                    document.getElementById('password-error').innerHTML = "";
                }

                if (errorCode == "auth/weak-password") {
                    document.getElementById('password-error').innerHTML = errorMessage;
                    document.getElementById('email-error').innerHTML = "";
                }

                if (errorCode == "auth/email-already-in-use") {
                    document.getElementById('email-error').innerHTML = errorMessage;
                    document.getElementById('password-error').innerHTML = "";
                }

            }).then(() => {

                console.log(loginSuccess);

                if (loginSuccess == true) {
                    var signUpPage = document.getElementById('signup-page-full');

                    signUpPage.style.display = "none";

                    var successPage = document.getElementById('signup-success-form');

                    successPage.style.display = "initial";

                    //FIREBASE DATABASE UPLOAD

                    if (type == "student") {

                        firebase.firestore().collection("UserData").doc(email).set({
                            "display-name": displayName,
                            "email": email,
                            "username": email,
                            "Account Type": "Student",
                            "Account Status": "Deactivated",
                        });

                        const increment = firebase.firestore.FieldValue.increment(1);

                        firebase.firestore().collection("Application Management").doc("Statistics").update({
                            "webUsers": increment,
                            "totalUsers": increment,
                        });
                    }

                    else if (type == 'teacher') {
                        firebase.firestore().collection("UserData").doc(email).set({
                            "display-name": displayName,
                            "email": email,
                            "username": email,
                            "Account Type": "Teacher",
                            "Account Status": "Deactivated",
                        });

                        const increment = firebase.firestore.FieldValue.increment(1);

                        firebase.firestore().collection("Application Management").doc("Statistics").update({
                            "webUsers": increment,
                            "totalUsers": increment,
                        });
                    }

                    else if (type == 'district') {
                        firebase.firestore().collection("UserData").doc(email).set({
                            "display-name": displayName,
                            "email": email,
                            "username": email,
                            "Account Type": "District",
                            "Account Status": "Deactivated",
                        });

                        const increment = firebase.firestore.FieldValue.increment(1);

                        firebase.firestore().collection("Application Management").doc("Statistics").update({
                            "webUsers": increment,
                            "totalUsers": increment,
                            "totalDistricts": increment
                        });
                    }


                }

            });
        }
    }

    setTimeout(() => {
        document.getElementById('signup-btn-text').style.display = "initial";
        document.getElementById('signup-btn-main-button').disabled = false;
        document.getElementById('btn-loading').style.display = "none";
    }, 500)
}


//FIRESTORE MIGRATED
facebookSignUp = (type) => {

    base_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {

        console.log("Facebook login success:");

        var user = result.user;
        var email = user.email;
        var displayName = user.displayName;
        var profilePic = user.photoURL;

        firebase.firestore().collection("UserData").doc(email).get().then((documentSnapshot) => {

            var value = documentSnapshot.data();

            console.log(value);

            if (value != undefined || value != null) {

                errorHTML = `<div class="alert alert-danger" role="alert"
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Error! </strong> An account with this email already exists
            </div>`;

                document.getElementById('signupError').innerHTML = errorHTML;

            } else {
                if (type == "student") {

                    firebase.firestore().collection("UserData").doc(email).set({
                        "display-name": displayName,
                        "email": email,
                        "username": email,
                        "Account Type": "Student",
                        "Account Status": "Deactivated",
                    });

                    const increment = firebase.firestore.FieldValue.increment(1);

                        firebase.firestore().collection("Application Management").doc("Statistics").update({
                            "webUsers": increment,
                            "totalUsers": increment,
                        });
                }

                else if (type == 'teacher') {
                    firebase.firestore().collection("UserData").doc(email).set({
                        "display-name": displayName,
                        "email": email,
                        "username": email,
                        "Account Type": "Teacher",
                        "Account Status": "Deactivated",
                    });

                    const increment = firebase.firestore.FieldValue.increment(1);

                        firebase.firestore().collection("Application Management").doc("Statistics").update({
                            "webUsers": increment,
                            "totalUsers": increment,
                        });
                }

                else if (type == 'district') {

                    firebase.firestore().collection("UserData").doc(email).set({
                        "display-name": displayName,
                        "email": email,
                        "username": email,
                        "Account Type": "District",
                        "Account Status": "Deactivated",
                    });

                    const increment = firebase.firestore.FieldValue.increment(1);

                        firebase.firestore().collection("Application Management").doc("Statistics").update({
                            "webUsers": increment,
                            "totalUsers": increment,
                            "totalDistricts": increment,
                        });
                }

                console.log('signup success facebook');

                setTimeout(() => {
                    var signUpPage = document.getElementById('signup-page-full');

                    signUpPage.style.display = "none";

                    var successPage = document.getElementById('signup-success-form');

                    successPage.style.display = "initial";
                }, 200)

            }
        }).catch((e) => {
            console.log(e);
        });


    }).catch(function (err) {
        console.log(err)
        console.log("Facebook Sign In Failed")
        errorHTML = `<div class="alert alert-danger" role="alert"
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Error! </strong> Facebook Login Failed
        </div>`;

        document.getElementById('signupError').innerHTML = errorHTML;
    })
}


//FIRESTORE MIGRATED
googleSignUp = (type) => {

    console.log("TYPE Signup:" + type);

    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {

        console.log("Google login success:");

        var user = result.user;
        var email = user.email;
        var displayName = user.displayName;
        var profilePic = user.photoURL;

        firebase.firestore().collection("UserData").doc(email).get().then((documentSnapshot) => {

            var value = documentSnapshot.data();

            console.log(value);

            if (value != undefined || value != null) {

                console.log("EXISTS:" + value);

                errorHTML = `<div class="alert alert-danger" role="alert"
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Error! </strong> An account with this email already exists
            </div>`;

                document.getElementById('signupError').innerHTML = errorHTML;

            } else {
                if (type == "student") {

                    firebase.firestore().collection("UserData").doc(email).set({
                        "display-name": displayName,
                        "email": email,
                        "username": email,
                        "Account Type": "Student",
                        "Account Status": "Deactivated",
                    });

                    const increment = firebase.firestore.FieldValue.increment(1);

                        firebase.firestore().collection("Application Management").doc("Statistics").update({
                            "webUsers": increment,
                            "totalUsers": increment,
                        });
                }

                else if (type == 'teacher') {
                    firebase.firestore().collection("UserData").doc(email).set({
                        "display-name": displayName,
                        "email": email,
                        "username": email,
                        "Account Type": "Teacher",
                        "Account Status": "Deactivated",
                    });

                    const increment = firebase.firestore.FieldValue.increment(1);

                        firebase.firestore().collection("Application Management").doc("Statistics").update({
                            "webUsers": increment,
                            "totalUsers": increment,
                        });
                }

                else if (type == 'district') {

                    firebase.firestore().collection("UserData").doc(email).set({
                        "display-name": displayName,
                        "email": email,
                        "username": email,
                        "Account Type": "District",
                        "Account Status": "Deactivated",
                    });

                    const increment = firebase.firestore.FieldValue.increment(1);

                        firebase.firestore().collection("Application Management").doc("Statistics").update({
                            "webUsers": increment,
                            "totalUsers": increment,
                            "totalDistricts": increment,
                        });
                }

                console.log('signup success google');

                setTimeout(() => {
                    var signUpPage = document.getElementById('signup-page-full');

                    signUpPage.style.display = "none";

                    var successPage = document.getElementById('signup-success-form');

                    successPage.style.display = "initial";
                }, 200)

            }
        }).catch((e) => {
            console.log(e);
        });

    }).catch(function (err) {
        console.log(err)
        console.log("Google Sign In Failed")
    })
}


//Firestore Migrated
function loginWithEmailStudent() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    var authValid = true;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);

        errorHTML = `<div class="alert alert-danger" role="alert"
        style="margin-top: 20px; width: 94%; margin-left: 6%;">
        <strong>Error! </strong> Credentials are not valid.
    </div>`;

        document.getElementById('signupError').innerHTML = errorHTML;

        authValid = false;
        // ...
    }).then(() => {

        if (authValid == true) {

            //OLD CODE

            // var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child('Account Type');

            // _ref.once('value').then(function (snapshot) {
            //     var exists = snapshot.val();
            //     console.log(exists);

            //     if (exists != null) {
            //         if (exists == "Student") {
            //             console.log('Login Success');
            //             localStorage.setItem("email", formattedEmail);
            //             window.location = "studentDashboard.html";
            //         } else {

            //             errorHTML = `<div class="alert alert-danger" role="alert" 
            //             style="margin-top: 20px; width: 94%; margin-left: 6%;">
            //             <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
            //         </div>`;

            //             document.getElementById('signupError').innerHTML = errorHTML;

            //         }
            //     } else {

            //         errorHTML = `<div class="alert alert-danger" role="alert"
            //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
            //         <strong>Error! </strong> An unexpected error has acurred, please contact customer support.
            //     </div>`;

            //         document.getElementById('signupError').innerHTML = errorHTML;
            //     }
            // });

            //NEW CODE
            firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {
                var accountType = doc.data()['Account Type'];

                console.log(accountType);

                if (accountType != null) {
                    if (accountType == "Student") {

                        window.localStorage.setItem("email", email.toString());

                        console.log(email);

                        window.location = "../studentPortal/studentDashboard.html";

                    } else {

                        errorHTML = `<div class="alert alert-danger" role="alert" 
                        style="margin-top: 20px; width: 94%; margin-left: 6%;">
                        <strong>Oops! </strong> This account was signed up as a ${accountType} account. You do not have sufficient permissions.
                    </div>`;

                        document.getElementById('signupError').innerHTML = errorHTML;

                    }
                } else {

                    errorHTML = `<div class="alert alert-danger" role="alert" 
             style="margin-top: 20px; width: 94%; margin-left: 6%;">
               <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
             </div>`;

                    document.getElementById('signupError').innerHTML = errorHTML;
                }

            }).catch(function (error) {
                console.log("Error getting document:", error);
            });


        }
    });

}

//Firestore Migrated
function loginWithEmailTeacher() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    var authValid = true;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);

        errorHTML = `<div class="alert alert-danger" role="alert"
        style="margin-top: 20px; width: 94%; margin-left: 6%;">
        <strong>Error! </strong> Credentials are not valid.
    </div>`;

        document.getElementById('signupError').innerHTML = errorHTML;

        authValid = false;
        // ...
    }).then(() => {

        if (authValid == true) {

            // OLD CODe

            //     var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child('Account Type');

            //     _ref.once('value').then(function (snapshot) {
            //         var exists = snapshot.val();
            //         console.log(exists);

            //         if (exists != null) {
            //             if (exists == "Teacher") {


            //                 console.log('Login Success');

            //                 localStorage.setItem("email", formattedEmail);


            //                 window.location = "dashboard.html";
            //             } else {

            //                 errorHTML = `<div class="alert alert-danger" role="alert" 
            //                 style="margin-top: 20px; width: 94%; margin-left: 6%;">
            //                 <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
            //             </div>`;

            //                 document.getElementById('signupError').innerHTML = errorHTML;

            //             }
            //         } else {

            //             errorHTML = `<div class="alert alert-danger" role="alert"
            //             style="margin-top: 20px; width: 94%; margin-left: 6%;">
            //             <strong>Error! </strong> An unexpected error has acurred, please contact customer support.
            //         </div>`;

            //             document.getElementById('signupError').innerHTML = errorHTML;
            //         }
            //     });




            //NEW CODE

            firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {

                var accountType = doc.data()['Account Type'];

                if (doc.exists) {


                    if (accountType != null) {
                        if (accountType == "Teacher") {
                            //localStorage.setItem("photo", profilePic);
                            localStorage.setItem("email", email);
                            //localStorage.setItem("name", name3);
                            window.location = "../teacherPortal/dashboard.html";
                        } else {

                            errorHTML = `<div class="alert alert-danger" role="alert" 
                        style="margin-top: 20px; width: 94%; margin-left: 6%;">
                        <strong>Oops! </strong> This account was signed up as a ${accountType} account. You do not have sufficient permissions.
                    </div>`;

                            document.getElementById('signupError').innerHTML = errorHTML;

                        }
                    } else {

                        errorHTML = `<div class="alert alert-danger" role="alert"
                    style="margin-top: 20px; width: 94%; margin-left: 6%;">
                    <strong>Error! </strong> An unexpected error has acurred, please contact customer support.
                </div>`;

                        document.getElementById('signupError').innerHTML = errorHTML;
                    }
                } else {
                    errorHTML = `<div class="alert alert-danger" role="alert" 
             style="margin-top: 20px; width: 94%; margin-left: 6%;">
               <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
             </div>`;

                    errorMessage.innerHTML = errorHTML;
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
    });





}

//Firestore Migrated
function loginWithEmailDistrict() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    var authValid = true;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);

        errorHTML = `<div class="alert alert-danger" role="alert"
        style="margin-top: 20px; width: 94%; margin-left: 6%;">
        <strong>Error! </strong> Credentials are not valid.
    </div>`;

        document.getElementById('signupError').innerHTML = errorHTML;

        authValid = false;
        // ...
    }).then(() => {

        if (authValid == true) {

            // var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child('Account Type');

            // _ref.once('value').then(function (snapshot) {
            //     var exists = snapshot.val();
            //     console.log(exists);

            //     if (exists != null) {
            //         if (exists == "District") {

            //             console.log('Login Success');

            //             localStorage.setItem("email", formattedEmail);


            //             window.location = "districtDashboard.html";
            //         } else {

            //             errorHTML = `<div class="alert alert-danger" role="alert" 
            //             style="margin-top: 20px; width: 94%; margin-left: 6%;">
            //             <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
            //         </div>`;

            //             document.getElementById('signupError').innerHTML = errorHTML;

            //         }
            //     } else {

            //         errorHTML = `<div class="alert alert-danger" role="alert"
            //         style="margin-top: 20px; width: 94%; margin-left: 6%;">
            //         <strong>Error! </strong> An unexpected error has acurred, please contact customer support.
            //     </div>`;

            //         document.getElementById('signupError').innerHTML = errorHTML;
            //     }
            // });

            //NEW CODE
            //NEW CODE

            firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {

                var accountType = doc.data()["Account Type"];

                if (accountType != null) {
                    if (accountType == "District") {

                        localStorage.setItem("email", email);

                        window.location = "districtDashboard.html";
                    } else {

                        errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account was signed up as a ${accountType} account. You do not have sufficient permissions.
            </div>`;

                        document.getElementById('signupError').innerHTML = errorHTML;

                    }
                } else {

                    errorHTML = `<div class="alert alert-danger" role="alert" 
             style="margin-top: 20px; width: 94%; margin-left: 6%;">
               <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
             </div>`;

                    document.getElementById('signupError').innerHTML = errorHTML;
                }


            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        }
    });

}

