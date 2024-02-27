let suggestions = [  
    "Azure Storage Account",  
    "Azure Service Bus",  
    "Azure Function App",  
    "Azure CosmosDB",  
    "Azure Container App",  
    "Azure Monitor"  
];  
  
const searchInput = document.querySelector(".searchInput");  
const input = searchInput.querySelector("input");  
const resultBox = searchInput.querySelector(".resultBox");  
  
input.onkeyup = (e)=>{  
    let userData = e.target.value;  
    let emptyArray = [];  
    if(userData){  
        emptyArray = suggestions.filter((data)=>{  
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());   
        });  
        emptyArray = emptyArray.map((data)=>{  
            return data = '<li>'+ data +'</li>';  
        });  
        searchInput.classList.add("active");   
        showSuggestions(emptyArray);  
        let allList = resultBox.querySelectorAll("li");  
        for (let i = 0; i < allList.length; i++) {  
            allList[i].setAttribute("onclick", "select(this)");  
        }  
    }else{  
        searchInput.classList.remove("active");   
    }  
}  
  
function showSuggestions(list){  
    let listData;  
    if(!list.length){  
        userValue = input.value;  
        listData = '<li>'+ userValue +'</li>';  
    }else{  
        listData = list.join('');  
    }  
    resultBox.innerHTML = listData;  
}  
  
function select(element){  
    let selectData = element.textContent;  
    input.value = selectData;  
    searchInput.classList.remove("active");  
}  
