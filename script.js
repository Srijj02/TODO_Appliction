let addform = document.getElementById('myOverlay');
let addText = document.getElementById('addText');
let date = document.getElementById('date');
let discrption = document.getElementById('discrption');
let errorMsg = document.getElementById('errorMsg');
let tasks = document.getElementById('tasks');
let addBtn = document.getElementById('addBtn');

function tst(e) {
    e.preventDefault();
    console.log(addText.value);
    console.log(typeof (date.value));
    console.log(discrption.value);
}




form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('hello');
    validate(e);
})


function openPopUp(e) {
    if (e)
        e.preventDefault();
    addform.style.display = 'block';
}

function closePopUp(e) {
    if (e) {
        e.preventDefault();
    }
    addform.style.display = 'none';
}



function validate(e) {
    if (e) {
        e.preventDefault();
    }
    if (addText.value === "" || date.value === "" || discrption.value === "") {
        errorMsg.innerHTML = "Please fill the empty fields";
        addform.style.display = 'block';
    }
    else {
        errorMsg.innerHTML = "";
        console.log(date.value);
        add(e);
    }
}


let data = [];

window.onload=async function () {
    // eve.preventDefault();
    await fetch('http://localhost:5000/tasks', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        return response.json();
    })
    .then(val => {
        console.log(val);
        data = val;
    })
    display(data)
}




// (ID INT PRIMARY KEY, Task VARCHAR(255), PerformDate VARCHAR(255), Discription VARCHAR(255));




function display(data) {
    // e.preventDefault();

    tasks.innerHTML="";
    data.map((val,index)=> {
        return (tasks.innerHTML += `<div id=${index}>
        <input id="checkBox" type="checkbox">
        <span><b>${val.Task}</b></span>
        <br><br>
        <span id="date">${val.PerformDate}</span>
        <p>${val.Discription}</p>
        <span class="options">
            <i onclick="edit(${index})" id="edit" class="fa-regular fa-pen-to-square"></i>
            <i onclick="del(${index})" id="delete" class="fa-regular fa-trash-can"></i>
        </span>
    </div>`);
    })
    
    // addform.style.display = "none";
}

function add(eve) {
    eve.preventDefault();
    let newData={
        Task:addText.value,
        PerformDate:date.value,
        Discription:discrption.value
    }

    fetch('http://localhost:5000/tasks',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(newData)
    })
    .then(response=> {
        return response.json();
    } )
    .then(addedData=> {
        data.push(addedData);
        display(data,eve);
    })

    addform.style.display = "none";
    resetForm();
}

function resetForm() {
    addText.value="";
    date.value="";
    discrption.value="";
}



function edit(index) {
    // eve.preventDefault();
    console.log("hey browser");
    console.log(data[index].ID);
    let currentId=data[index].ID;


    addText.value=data[index].Task;
    date.value=data[index].PerformDate;
    discrption.value=data[index].Discription;


    console.log(addText.value);
    console.log(date.value);
    console.log(discrption.value);

    addform.style.display = "block";

    let newData={
        Task:addText.value,
        PerformDate:date.value,
        Discription:discrption.value
    }

    fetch(`http://localhost:5000/tasks/${currentId}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response=> {
        del(index);
        return response.json();
    } )
    .then(updetedData=> {
        data[index]=updetedData;
        display(data);
    } )
    
}

function del(index) {
    let currentId=data[index].ID;
    fetch(`http://localhost:5000/tasks/${currentId}`,{
        method:'DELETE'
    })
    .then(()=> {
        data.splice(index,1);
        display(data);
    })
}





















// function storeData() {
//     console.log("hiiii");
//     data.push({
//         taskNo: addText.value,
//         date: date.value,
//         discrption: discrption.value
//     })
//     console.log("hiiii22");

//     localStorage.setItem('data', JSON.stringify(data));
//     console.log(JSON.stringify(data));
//     add();
//     errorMsg.innerHTML = "";
//     addText.value = "";
//     date.value = "";
//     discrption.value = "";
    


// }






// function deleteTask(index) {
//     // ele.parentElement.parentElement.remove();
//     data.splice(index,1);
    
//     localStorage.setItem("data",JSON.stringify(data));
//     add();
// }

// function editTask(index,event) {
//     if(event)
//     event.preventDefault();

//     let val = data[index];
//     console.log(val);
    

//     console.log("ookkk")




//     // console.log(val.children[1].children[0].innerHTML);
//     // console.log(val.children[4].innerHTML);
//     // console.log(val.children[5].innerHTML);
//     // console.log(val.children[6].innerHTML);



//     // console.log(val.children[4].innerHTML.trim()+"T"+val.children[5].innerHTML.trim());

//     addText.value = val.taskNo;
//     date.value = val.date;
//     discrption.value = val.discrption;


//     console.log("lkjhgf");
    
    

//     // setTimeout(() => {
//     //     deleteTask(index)
//     // }, 100);

//     deleteTask(index);
//     addform.style.display = 'block';

//     // val.remove();
//     // localStorage.removeItem()


// }


// // window.onload=()=> {
// //     data=JSON.parse(localStorage.getItem('data')) || [];
// //     add();
// // }



