window.onload = ()=>{
    let editBtns = document.querySelectorAll(".edit");
    let saveBtns = document.querySelectorAll(".save");
    let tableBodyRows = document.querySelectorAll("tbody tr");


    function changeButtons(arrBtnsA, arrBtnsB){
          for (let index = 0; index < arrBtnsA.length; index++) {
            arrBtnsA[index].addEventListener("click", (e) => {
              if (!arrBtnsA[index].classList.contains("hide")) {
                arrBtnsB[index].classList.remove("hide");
                arrBtnsA[index].classList.add("hide");
                    enableInputs(index);
              }
            });
    
        
          }

    }

    function enableInputs(index){
         if (editBtns[index].classList.contains("hide")) {
           tableBodyRows[index].querySelectorAll("td input").forEach(cell => {
             cell.disabled = false;
           });
         } else {
             tableBodyRows[index].querySelectorAll("td input").forEach(cell => {
               cell.disabled = true;
             }); 
         }

    }

    changeButtons(editBtns, saveBtns);
    changeButtons(saveBtns, editBtns);
  
}