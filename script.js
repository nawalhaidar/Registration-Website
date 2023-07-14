// ********************************************
// The following javascipt is for index.html

let keys=['fname','lname', 'email','gender','phone', 'birthdate','univ', 'maj','employed'];

if(localStorage.getItem('scroll')==='1'){
    const element = document.getElementById('univ');
    element.scrollIntoView();
    localStorage.setItem('scroll','0');
}
function addNoti(notiContent, ID, siblingID){
    let noti=document.getElementById(ID);
        if(!noti){
            const notiElement=document.createElement('p');
            const notiText=document.createTextNode(notiContent);
            notiElement.appendChild(notiText);
            const attributeNode=document.createAttribute('id');
            attributeNode.value=ID;
            notiElement.setAttributeNode(attributeNode);

            notiElement.style.color = "red";
            notiElement.style.fontStyle = "italic";
            notiElement.style.fontSize="0.8rem";


            let sibling=document.getElementById(siblingID);
            sibling.insertAdjacentElement("afterend",notiElement);
        }
}


let form = document.getElementById("register");
if(form){
    form.addEventListener("submit",function (event){
        event.preventDefault();

        let motivation=document.getElementById("motive").value;

        let gender;
        let genderRadio=this.querySelectorAll('#gender label');
        genderRadio.forEach(labl=>{
            if(labl.querySelector("input").checked)
                gender=labl.textContent.trim();
        })   

        let employed;
        let employedRadio=this.querySelectorAll('#experience label');
        employedRadio.forEach(labl=>{
            if(labl.querySelector("input").checked)
                employed=labl.textContent.trim();
        }) 

        let data={
            fname: document.getElementById("fname").value,
            lname: document.getElementById("lname").value,
            email: document.getElementById("email").value,
            gender: gender,
            phone: document.getElementById("phone").value,
            birthdate: document.getElementById("birthdate").value,
            univ: document.getElementById("univ").value,
            maj: document.getElementById("maj").value,
            employed: employed,
            motivation: motivation
        }

        for(let i=3; i<keys.length;i++){
            if(!data[keys[i]])
            data[keys[i]]='-';
        }

        let valid = true;
        if(!(/^[a-zA-Z\s-]{2,30}$/.test(data.fname))){
            addNoti('Invalid name.','notifName','ffname');
            valid = false;
        }
        if(!(/^[a-zA-Z\s-]{2,30}$/.test(data.lname))){
            addNoti('invalid name','notiLname','llname');
            valid = false;
        }
        if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))){
            addNoti('Invalid email.','notiEmail','eemail');
            valid = false;
        }
        if(!(/^\+?[0-9\s-]+[0-9]$/.test(data.phone))){
            addNoti('Invalid phone.','notiPhone','pphone');
            valid = false;
        }
        if(!(/(^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$)|(^$)/.test(data.birthdate))){
            addNoti('Invalid date.','notiDate','bbirth');
            valid = false;
        }

        
        // localStorage.setItem('myData','');
        if(valid){
            let storedData=localStorage.getItem('myData');
            let dataArray=[];
            if(storedData)
                dataArray=JSON.parse(storedData);
            dataArray.push(data);
            localStorage.setItem('myData',JSON.stringify(dataArray));

            //reset form
            let toRemove=document.getElementById('register');
            toRemove.remove();

            const newBlock=document.createElement('div');

            const textBlock=document.createElement('p');
            const txt=document.createTextNode('Your registration has been submitted successfully. Thank you!');
            textBlock.appendChild(txt);
            newBlock.appendChild(textBlock);

            const goBackContainer=document.createElement('div');
            newBlock.appendChild(goBackContainer);    

            const goBack=document.createElement('button');
            const txtt=document.createTextNode('New Registration');
            goBack.appendChild(txtt);
            goBackContainer.appendChild(goBack);

            let sibling=document.getElementById('about');
            sibling.insertAdjacentElement("afterend",newBlock);

            const BlockAttribute=document.createAttribute('id');
            BlockAttribute.value='submission';
            newBlock.setAttributeNode(BlockAttribute);

            const ButtonContainerAttribute=document.createAttribute('id');
            ButtonContainerAttribute.value='goBackContainer';
            goBackContainer.setAttributeNode(ButtonContainerAttribute);

            const ButtonAttribute=document.createAttribute('id');
            ButtonAttribute.value='goBack';
            goBack.setAttributeNode(ButtonAttribute);

            goBack.addEventListener('click', ()=>{
                localStorage.setItem('scroll','1');
                window.location.href='index.html';
            })



        }
    })
}


let display= document.getElementById("display-button");
if(display){
    display.addEventListener('click',()=>{
        window.location.href='login.html';
    })
}



// ********************************************
// The following javascipt is for login.html

let home= document.getElementById("home-button");
if(home){
    home.addEventListener('click',()=>{
        window.location.href='index.html';
    })
}

let login = document.getElementById("loginBlock");
if(login){
    login.addEventListener("submit",function (event){
        event.preventDefault();
        let username=document.getElementById("username").value;
        let password=document.getElementById("password").value;

        if(username!=='nawalhaidar' || password!=='P@55W0RD'){
            addNoti('Incorrect username or password. Please try again.','noti','notiAfter');
        }
        else{
            window.location.href='display.html';
        }
    })
}


// ********************************************
// The following javascipt is for display.html


let tablee=document.getElementById('table');
if(tablee){

    const storedData=localStorage.getItem('myData');
    displayArray=JSON.parse(storedData);

    function addtr(i){
        let row=document.createElement('tr');
        let column=[];

        for(let j=0;j<keys.length;j++){
            column.push(document.createElement('td'));
            const text=document.createTextNode(displayArray[i][keys[j]]);
            column[j].appendChild(text);
            row.appendChild(column[j]);
        }
        tablee.appendChild(row);
    }

    for(let i=0;i<displayArray.length;i++){
        // if(displayArray[i][searchKeyIndex]===searchValue)
            addtr(i);
    }


    let searchButton=document.getElementById('searchButton');
    searchButton.addEventListener('click',(event)=> {
        event.preventDefault();

        let searchBy=document.getElementById('searchBy').value;
        let searchKeyIndex=keys.indexOf(searchBy);
        let searchValue=document.getElementById('searchValue').value;

        let container = document.getElementById('table');
        tableRows=container.childNodes;
  
        searchKeyIndex++;
        for(let i=2; i<tableRows.length; i++){
            let actualValue=tableRows[i].querySelector('td:nth-child('+searchKeyIndex+')').innerHTML;
            if(actualValue !==searchValue){
                tableRows[i].remove();
                i--;
            }
         }
    })

    let filterButton=document.getElementById('filterButton');
    filterButton.addEventListener('click',(event)=> {
        event.preventDefault();

        let gender=document.getElementById('filterGenderOptions').value;
        let employed=document.getElementById('filterEmployedOptions').value;

        let container = document.getElementById('table');
        let tableRows=container.childNodes;

         for(let i=2; i<tableRows.length; i++){
            let actualGender=tableRows[i].querySelector('td:nth-child(4)').innerHTML;
            let actualEmplyed=tableRows[i].querySelector('td:nth-child(9)').innerHTML;
            if((gender!=='any' && actualGender !==gender) || 
                (employed!='any' && actualEmplyed!==employed)){
                tableRows[i].remove();
                i--;
            }
         }
    })
}


