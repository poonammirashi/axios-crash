var form = document.getElementById('my-form');
var itemList = document.getElementById('users');
let editId = document.getElementById('editId');
// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);

let crudid = "a659cbb947d14be190fb17d42e9a7521"

window.onload = () => {
    axios.get(`https://crudcrud.com/api/${crudid}/appointmentdata`)
        .then((res) => {
            res.data.forEach(e => {
                showOutput(e)
            });
        })
}
// Add item
function addItem(e) {
    e.preventDefault();
    let newName = document.getElementById('name').value;
    let newEmail = document.getElementById('email').value;
    let newPhone = document.getElementById('number').value;

    class Myobj {
        constructor(name, email, phone) {
            this.name = name;
            this.email = email
            this.phone = phone
        }
    }
    let postObj = new Myobj(newName, newEmail, newPhone)
    if (editId.textContent) {
        axios.put(`https://crudcrud.com/api/${crudid}/appointmentdata/${editId.textContent}`, postObj)
        showOutput(postObj)

    } else {
        axios.post(`https://crudcrud.com/api/${crudid}/appointmentdata`, postObj)
            .then(res => showOutput(res.data))
    }
    form.reset()
}
// Remove item
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
            let editobjkey = li.classList[1];
            axios.delete(`https://crudcrud.com/api/${crudid}/appointmentdata/${editobjkey}`)
        }
    }
}
// edit item
function editItem(e) {
    if (e.target.classList.contains('edit')) {
        var li = e.target.parentElement;
        let editData = li.innerText.split("-");
        let editobjkey = li.classList[1];
        // console.log(li.classList)
        editId.textContent = editobjkey;
        itemList.removeChild(li);
        document.getElementById('name').value = editData[0];
        document.getElementById('email').value = editData[1];
        document.getElementById('number').value = editData[2].slice(0, 10);
    }
}
function showOutput(data) {
    itemList.insertAdjacentHTML("beforeend", `
        <li class="list-group-item ${data._id}">${data.name}-${data.email}-${data.phone}<button class="btn btn-primary btn-sm float-right edit ml-2">
    Edit</button><button class="btn btn-danger btn-sm float-right delete">X</button></li>`)
}