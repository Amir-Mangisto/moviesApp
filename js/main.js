let email = document.getElementById("email");
const userClients = [];
let isExists;
formBtn.onclick = (event) => {
  event.preventDefault();
  if (userClients == 0 && email.value>0) {
    userClients.push(email.value);
    console.log(userClients);
    alert("welcome to the family members");
  } else {
    for (let i = 0; i < userClients.length; i++) {
      if (email.value == userClients[i]) {
        isExists = true;
      }
    }
    if (isExists != true) {
      userClients.push(email.value,);
      alert("welcome to the family members");
    } else {
      alert("you are already a member ");
    }
  }
};
