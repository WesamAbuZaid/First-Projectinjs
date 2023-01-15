var inputName = document.getElementById('name');
var inputPrice = document.getElementById('price');
var inputCapacity = document.getElementById('qty');
var inputDescription = document.getElementById('desc');
var inputCategory = document.getElementById('cat');
var inputSearch = document.getElementById('keyword');
var addBtn = document.getElementById('add-btn');
var clrBtn = document.getElementById('clear-btn');
var updateBtn = document.querySelector('#update-btn');
var table = document.getElementById('table');
var courses=[];
var courseNeedUpdate = 0 ;
window.errorsName = 1 ;
window.errorsPrice = 1 ;
window.errorsDisc = 1 ;
window.errorsCap= 1 ;
window.errorsCat = 1 ;
window.ifEnterElseName=0;
window.ifEnterElsePrice = 0;
window.ifEnterElseCap=0
window.ifEnterElseDisc=0;
window.ifEnterElseCat=0;
window.nameFailed=0;
window.priceFailed=0;
window.capFailed=0;
window.discFailed=0;
window.catFailed=0;
var disable =1;
//-------------------------------------------------------

//show the data from local storage
updateBtn.style.cssText ="display : none";
if(localStorage.length > 0){
var test = localStorage.getItem("courses");
courses = JSON.parse(test);
    showTable();
  }
//-----------------------------------------------------


//when user fill the data
  
  inputName.addEventListener("keyup",fillName)
  
  inputPrice.addEventListener("keyup",fillPrice)
  
  inputCapacity.addEventListener("keyup",fillCap)
  
  inputDescription.addEventListener("keyup",fillDisc)
  
  inputCategory.addEventListener("click",fillCat)




//end fill of data

//-------------------------------------------------------------------



// when click on add button
addBtn.onclick = function(e){
    e.preventDefault();
    var course ={
        "name":inputName.value,
        "price":inputPrice.value,
        "capacity":inputCapacity.value,
        "description":inputDescription.value,
        "Category":inputCategory.value
    }
    Swal.fire({
        title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
       }).then((result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
           courses.push(course);
           showTable();
           clr();
          localStorage.setItem("courses",JSON.stringify(courses));
          Swal.fire('Saved!', '', 'success')
         } else if (result.isDenied) {
           Swal.fire('Changes are not saved', '', 'info')
        }
       })
       inputName.classList.remove("is-valid");
       inputPrice.classList.remove("is-valid");
       inputCapacity.classList.remove("is-valid");
       inputDescription.classList.remove("is-valid");
       inputCategory.classList.remove("is-valid");
}
//when click on clear button
clrBtn.addEventListener("click",clr);

// when click on search
inputSearch.addEventListener('keydown',function(e){
    var data =" ";
    for(var i=0 ; i<courses.length ; i++)
    {
        if(courses[i].name.includes(e.key)){
        data +=`<tr>
        <td>${i+1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].Category}</td>
        <td>${courses[i].description}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].capacity}</td>
        <td><a href="#" onclick=" edit(${i})" class="btn btn-primary"><i class="fa-solid fa-pencil"></i></a></td>
        <td><a href="#" onclick="del(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></a></td>               
        </tr>`
        }
    }
    table.innerHTML=data; 
});

//when click on delete all
document.querySelector("#delete").addEventListener('click',function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            showTable();
            localStorage.setItem("courses",JSON.stringify(courses));
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    })

    //when click on update
    updateBtn.addEventListener("click",function(){
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            var course ={
                "name":inputName.value,
                "price":inputPrice.value,
                "capacity":inputCapacity.value,
                "description":inputDescription.value,
                "Category":inputCategory.value
            }
            courses[courseNeedUpdate] = course;
            showTable();
            localStorage.setItem("courses",JSON.stringify(courses));
            addBtn.style.cssText = "display:inline-block ;";
            updateBtn.style.cssText = "display:none;";
            clr();
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            clr();
           addBtn.style.cssText = "display:inline-block ;";
            updateBtn.style.cssText = "display:none;";
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    })

//--------------------------------------------------------------------------------------------------

//show table
function showTable(){
    var data =" ";
    for(var i=0 ; i<courses.length ; i++)
    {
        data +=`<tr>
        <td>${i+1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].Category}</td>
        <td>${courses[i].description}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].capacity}</td>
        <td><a href="#" onclick=" edit(${i})" class="btn btn-primary"><i class="fa-solid fa-pencil"></i></a></td>
        <td><a href="#" onclick="deleteItem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></a></td>               
        </tr>`;
    }
    table.innerHTML=data;
}
//clear function
function clr(){
    inputName.value = "";
    inputPrice.value = "";
    inputCapacity.value = "";
    inputDescription.value = "";
    inputCategory.value = "";
    inputName.classList.remove("is-valid");
    inputName.classList.remove("is-invalid");
    inputPrice.classList.remove("is-valid");
    inputPrice.classList.remove("is-invalid");
    inputCapacity.classList.remove("is-valid");
    inputCapacity.classList.remove("is-invalid");
    inputDescription.classList.remove("is-valid");
    inputDescription.classList.remove("is-invalid");
    inputCategory.classList.remove("is-valid");
    inputCategory.classList.remove("is-invalid");
}
//edit function
function edit(i){
    inputName.value = courses[i].name;
    inputPrice.value = courses[i].price;
    inputCapacity.value = courses[i].capacity;
    inputDescription.value = courses[i].description;
    inputCategory.value = courses[i].Category;
    addBtn.style.cssText = "display : none";
    updateBtn.style.cssText = "display : inline-block";
      courseNeedUpdate = i ;
}
//update function


//delete item
function deleteItem(i){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(i,1);
            showTable();
            localStorage.setItem("courses",JSON.stringify(courses));
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

}
//---------------------------------------------------------
function fillName(){
if(inputName.value.length < 3){
  inputName.classList.add("is-invalid");
  
  if(nameFailed==0){
    errorsName++;
    nameFailed++;
    ifEnterElseName=0;
  }
  
}
else{
  nameFailed=0;
  errorsName-=2;
  inputName.classList.remove("is-invalid");
  inputName.classList.add("is-valid");
  ifEnterElseName++;
  if(ifEnterElseName>1 ){
    errorsName+=2;
}
}
console.log("name errors: ",errorsName)
isAllTrue();
}
//--------------------------------------------------
function fillPrice(){

  if(!Number(inputPrice.value)){
    inputPrice.classList.add("is-invalid");
    if(priceFailed==0){
      errorsPrice++;
      priceFailed++;
      ifEnterElsePrice=0;
  }
}
  else 
  {
    priceFailed=0;
    errorsPrice-=2;
    inputPrice.classList.remove("is-invalid");
    inputPrice.classList.add("is-valid");
    ifEnterElsePrice++;
    if(ifEnterElsePrice > 1 )
    errorsPrice+=2;
  }
    console.log("price errors : " , errorsPrice);
    isAllTrue();
}
//-------------------------------------------------
function fillCap(){
  if(!Number(inputCapacity.value)){
    inputCapacity.classList.add("is-invalid");
    if(capFailed==0){
      errorsCap++;
      capFailed++;
      ifEnterElseCap=0;
  }
  }else 
  {
    capFailed=0;
    errorsCap-=2;
    inputCapacity.classList.remove("is-invalid");
    inputCapacity.classList.add("is-valid");
    ifEnterElseCap++;
    if(ifEnterElseCap > 1 )
    errorsCap+=2;
  }
    console.log("cap errors : " , errorsCap);
    isAllTrue();
}
//----------------------------------------------------------
function fillDisc(){
  if(inputDescription.value.length < 10 ){
    inputDescription.classList.add("is-invalid");
    if(discFailed==0){
      errorsDisc++;
      discFailed++;
      ifEnterElseDisc=0;
  }

  }else{
    discFailed=0;
    errorsDisc-=2;
    inputDescription.classList.remove("is-invalid");
    inputDescription.classList.add("is-valid");
    ifEnterElseDisc++;
    if(ifEnterElseDisc > 1 )
    errorsDisc+=2;
  }
  console.log("disc errors : " , errorsDisc);
  isAllTrue();
}
//----------------------------------------------------------
function fillCat(){
  if(!inputCategory.value){
    inputCategory.classList.add("is-invalid");
    if(catFailed==0){
      errorsCat++;
      catFailed++;
      ifEnterElseCat=0;
  }
  }else 
  {
    catFailed=0;
    errorsCat-=2;
    inputCategory.classList.remove("is-invalid");
    inputCategory.classList.add("is-valid");
    ifEnterElseCat++;
    if(ifEnterElseCat>1)
    errorsCat+=2;
  }
 
console.log("cat errors : " , errorsCat);
isAllTrue();
}

//---------------------------
function isAllTrue(){
  if(errorsName<=0&&errorsPrice<=0&&errorsCap<=0&&errorsDisc<=0&&errorsCat<=0)
  addBtn.classList.remove("disabled");
  else
  addBtn.classList.add("disabled");

}