let form= document.getElementById('my-form');
let itemlist=document.getElementsByClassName("users")
// itemlist.addEventListener("onclick", removeItem)
// itemlist.addEventListener("onclick", editItem)


let crudid= "2c124f4d34264604982662da8f4067a7";
form.addEventListener("submit", addItem(e))
// form.addEventListener("submit", adduser);

document.addEventListener("DOMContentLoaded", () => {
    axios.get(`https://crudcrud.com/api/${crudid}/appointmentdata`)
    .then(res => {
        res.data.forEach(element => {
            showOutput(element);
        });
        
    })
})
 
 addItem = (e) => {
    e.preventDefault();
    let newname=document.getElementById("name").value;
    let newemail=document.getElementById("email").value
    let newnumber=document.getElementById("number").value 
    // let li=document.getElementById()
   let obj={
        newname,
        newemail,
        newnumber
    }
    // if(obj._id) {
    //     console.log(this.id)
    // } else {
    // console.log(obj)
    axios.post(`https://crudcrud.com/api/${crudid}/appointmentdata`, obj)
    .then((res) => {
            showOutput(res.data)
    })
    
}

function showOutput(data) {
    document.getElementById("name").value='';
    document.getElementById("email").value='';
    document.getElementById("number").value='';

 let itemlist =document.getElementById("users")
  let childnode=`<li class='list-group-items' id="${data._id}">${data.newname}-${data.newemail}-${data.newnumber}
 <button onclick="deleteuser('${data._id}')">X</button>
            <button onclick="edituser('${data._id}','${data.newname}','${data.newemail}',${data.newnumber})">edit</button></li>`
  itemlist.innerHTML=itemlist.innerHTML + childnode;
}

function deleteuser(userid){
    
    removefromscreen(userid);
    axios.delete(`https://crudcrud.com/api/${crudid}/appointmentdata/${userid}`)
    .then(res => {
        // console.log(res);
        console.log(userid)
    })
    
}

function removefromscreen(userid){
    let user=document.getElementById(`${userid}`)
    let parent=document.getElementById("users");
    parent.removeChild(user);
}

function edituser(id,name,email,number){
    document.getElementById("name").value=name;
    document.getElementById("email").value=email;
    document.getElementById("number").value=number;
    let obj={
        newname:name,
        newemail:email,
        newnumber:number
    }
    removefromscreen(id);
    // deleteuser()
    axios.put(`https://crudcrud.com/api/${crudid}/appointmentdata/${id}`,obj)
    // addItem(id);
}