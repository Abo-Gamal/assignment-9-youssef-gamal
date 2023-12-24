var siteNameInput = document.getElementById("siteNameInput");
var siteURLInput = document.getElementById("siteURLInput");
var tableBody = document.getElementById("tableBody"); 
var siteContainer;
var nameRegex;
var urlRegex;
var errorLayer = document.getElementById("errorLayer");
if(localStorage.getItem("bookmarks") != null){
    siteContainer = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark(siteContainer);
}
else{
    siteContainer = [];
}
function addBookmark(){

    if(siteNameValidation(siteNameInput.value) && siteUrlValidation(siteURLInput.value)){
        var site = {
            siteName : siteNameInput.value , 
            siteURL : siteURLInput.value
        }
        siteContainer.push(site);
        localStorage.setItem("bookmarks" , JSON.stringify(siteContainer));
        clearForm();
        displayBookmark(siteContainer);
    }
    else{
        errorLayer.classList.remove("d-none");
    }
}
function closeErrorLayer(){
    errorLayer.classList.add("d-none");
}
function clearForm(){
    siteNameInput.value = ""
    siteURLInput.value = ""
}
function displayBookmark(arr){
    var productTableRow = ``;
    for(var i = 0 ; i < siteContainer.length ; i++ ){
        productTableRow += `<tr>
        <td>${i+1}</td>
        <td>${arr[i].siteName}</td>
        <td><a href="${arr[i].siteURL}" target="_blank"><button class="btn btn-success ps-3 pe-3 pt-1 pb-1 text-center text-capitalize"><i class="fa-solid fa-eye"></i> visit</button></a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-danger ps-3 pe-3 pt-1 pb-1 text-center text-capitalize"><i class="fa-solid fa-trash-can"></i> delete</button></td>
        </tr>`
    }
    tableBody.innerHTML = productTableRow;
}
function deleteBookmark(deleteIndex){
    siteContainer.splice(deleteIndex , 1);
    localStorage.setItem("bookmarks" , JSON.stringify(siteContainer));
    displayBookmark(siteContainer);
}
function siteNameValidation(name){
    nameRegex = /^[A-Za-z]{3}/;
    if(nameRegex.test(name)){
        siteNameInput.classList.replace("is-invalid" , "is-valid");
        return true;
    }
    else{
        siteNameInput.classList.add("is-invalid");
        return false;
    }
}
function siteUrlValidation(url){
    urlRegex = /^(http(s)?):\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
    if(urlRegex.test(url)){
        siteURLInput.classList.replace("is-invalid" , "is-valid");
        return true;
    }
    else{
        siteURLInput.classList.add("is-invalid");
        return false;
    }
}