<html>
    <body>
        <h1>Appointment Booking App</h1>
        <form  onsubmit="saveToLocalStorage(event)">
            <label> Name</label>
            <input id='username' type="text" name="username"  required/>
            <label> EmailId</label>
            <input id='email' type="email" name="emailId"  required/>
            <label> PhoneNumber</label>
            <input id="phoneNumber" type="number" name="number">
            <button> Submit </button>
        </form>
        <ul id='listOfUsers'></ul>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.1/axios.min.js"></script>
        <script>
            function saveToLocalStorage(event) {
                event.preventDefault();
                const name = event.target.username.value;
                const email = event.target.emailId.value;
                const number = event.target.number.value;
                const obj = {
                    name,
                    email,
                    number
                }
                axios.post("https://crudcrud.com/api/994c252f2fd9437e8cce1949b8a6814c/appointmentdata",obj)
                .then((respose) =>{
                    showNewUserOnScreen(respone.data)
                    console.log(respone)
                })
                .catch((err)=>{
                    //document.body.innerHTML= document.body.innerHTML + "<h4>Something Went Wrong </h4>"
                    console.log(err)
                })
               // localStorage.setItem(obj.email, JSON.stringify(obj))
                //showNewUserOnScreen(obj)
            }

            window.addEventListener("DOMContentLoaded", () => {
                const localStorageObj = localStorage;
                const localstoragekeys  = Object.keys(localStorageObj)

                for(var i =0; i< localstoragekeys.length; i++){
                    const key = localstoragekeys[i]
                    const userDetailsString = localStorageObj[key];
                    const userDetailsObj = JSON.parse(userDetailsString);
                    showNewUserOnScreen(userDetailsObj)
                }
            })

            function showNewUserOnScreen(user){
                document.getElementById('email').value = '';
                document.getElementById('username').value = '';
                document.getElementById('phoneNumber').value = '';
                
                if(localStorage.getItem(user.email) !== null){
                    removeUserFromScreen(user.email)
                }

                const parentNode = document.getElementById('listOfUsers');
                const childHTML = `<li id=${user.email}> ${user.name} - ${user.email}
                                        <button onclick=deleteUser('${user.email}')> Delete User </button>
                                        <button onclick=editUserDetails('${user.email}','${user.name}','${user.phoneNumber}')>Edit User </button>
                                     </li>`

                parentNode.innerHTML = parentNode.innerHTML + childHTML;
            }

            //Edit User

            function editUserDetails(emailId, name){

                document.getElementById('email').value = emailId;
                document.getElementById('username').value = name;
                document.getElementById('phoneNumber').value = number;
                

                deleteUser(emailId)
             }

            // deleteUser('abc@gmail.com')

            function deleteUser(emailId){
                console.log(emailId)
                localStorage.removeItem(emailId);
                removeUserFromScreen(emailId);

            }

            function removeUserFromScreen(emailId){
                const parentNode = document.getElementById('listOfUsers');
                const childNodeToBeDeleted = document.getElementById(emailId);
                if(childNodeToBeDeleted) {
                    parentNode.removeChild(childNodeToBeDeleted)
                }
            }







        </script>


    </body>
</html>