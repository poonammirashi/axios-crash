let form = document.getElementById("my-form");

const crudid = "d4f4bdb40693460cb1ff3d3494b8fbde"
let itemlist=document.getElementById("users")
// itemlist.addEventListener("onclick",buyone)

window.addEventListener("DOMContentLoaded", () => {
    axios.get(`https://crudcrud.com/api/${crudid}/stocktool`)
        .then(res => {
            res.data.forEach((element) => {
                showOutput(element);
            })
        })
})

function addItem (e){
    e.preventDefault();
    let newname = document.getElementById("Candyname").value;
    let newdescriptin = document.getElementById("Description").value
    let newprice = document.getElementById("price").value
    let newQuantity = document.getElementById("quantity").value

    let obj = {
        newname,
        newdescriptin,
        newprice,
        newQuantity
    }

    axios.post(`https://crudcrud.com/api/${crudid}/stocktool`, obj)
        .then((res) => {
            showOutput(res.data)
        })

}

function showOutput(data) {
    document.getElementById("Candyname").value = '';
    document.getElementById("Description").value = '';
    document.getElementById("price").value = '';
    document.getElementById("quantity").value = '';
    console.log(data)

    let itemlist = document.getElementById("users")
    let childnode = `<li class='list-group-items' id="${data._id}">${data.newname}-${data.newdescriptin}-${data.newprice}-
  ${data.newQuantity}<button onclick="buyone('${data._id}','${data.newname}','${data.newdescriptin}','${data.newprice}','${data.newQuantity}','${1}')">Buy one</button><button onclick="buyone('${data._id}','${data.newname}','${data.newdescriptin}','${data.newprice}','${data.newQuantity}','${2}')">
  Buy two</button><button onclick="buyone('${data._id}','${data.newname}','${data.newdescriptin}','${data.newprice}','${data.newQuantity}','${3}')">Buy three</button><button onclick="deleteuser('${data._id}')">X</button> </li>`
    itemlist.innerHTML = itemlist.innerHTML + childnode;
}

function deleteuser(stockid) {

    removefromscreen(stockid);
    axios.delete(`https://crudcrud.com/api/${crudid}/stocktool/${stockid}`)
        .then(res => {
            // console.log(res);
            console.log(stockid)
        })

}
function removefromscreen(stockid){
    let user=document.getElementById(`${stockid}`)
    let parent=document.getElementById("users");
    parent.removeChild(user);
}

function buyone(_id,newname,newdescriptin,newprice,newQuantity,n) {
    console.log(_id);
    if(newQuantity>=n){
    removefromscreen(_id);
    let obj={_id,newname,newdescriptin,newprice,newQuantity:newQuantity-n}
    axios.put(`https://crudcrud.com/api/${crudid}/stocktool/${_id}`, {newname,newdescriptin,newprice,newQuantity:newQuantity-1})
    .then((res) => {
            console.log(res)
            showOutput(obj)
    })
} else {
    let li=document.getElementById(`${_id}`)
    li.innerHTML="<h5>stock is over</h5>"
    let itemlist=document.getElementById("users")
    // itemlist.removeChild(li)
    deleteuser(_id);

}
}

