window.onload = ()=>{
    let editBtns = document.querySelectorAll(".edit");
    let saveBtns = document.querySelectorAll(".save");
    let deleteBtns = document.querySelectorAll(".delete");
    let tableBodyRows = document.querySelectorAll("tbody tr");
    let addButton = document.querySelector(".add");
    let tbody = document.querySelector("tbody");
    const hamMenu = document.querySelector(".ham-menu");
    const mobileMenu = document.querySelector(".mobile-menu");

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
           tableBodyRows[index].querySelectorAll("select").forEach(select =>{
            select.disabled = false;
           });

         } else {
             tableBodyRows[index].querySelectorAll("td input").forEach(cell => {
               cell.disabled = true;
             }); 
             tableBodyRows[index].querySelectorAll("select").forEach(select => {
               select.disabled = true;
             });

         }

    }

    function addNewRow(){
      if(addButton){
        addButton.addEventListener("click", ()=>{
          let newRow = document.createElement("tr");

          let newCells = ``;
          if(addButton.classList.contains("dentist-btn")){
            newCells = ` 
              <td> <input type="text" name="lastName" value="no asignado" maxlength="30" disabled></td>
              <td><input type="text" name="fisrtName" value="no asignado" maxlength="30" disabled></td>
              <td><input type="text" name="cardNumber" value="no asignado" maxlength="6" disabled></td>
              <td><img src="../static/img/save.svg" class="save hide" alt=""><img class ="edit" src="../static/img/edit.svg" alt="editar"><img class="delete" src="../static/img/delete.svg" alt="eliminar"></td>
          `;   
          } else if (addButton.classList.contains("patient-btn")) {
            newCells = `   
              <td><input type="text" name="lastName" value="no asignado" maxlength="30" disabled></td>
              <td><input type="text" name="fisrtName" value="no asignado" maxlength="30" disabled></td>
              <td><input type="text" name="document" value="no asignado" maxlength="6" disabled></td>
              <td><input type="text" name="address" value="no asignado" maxlength="6" disabled></td>
              <td><input type="date" name="date-discharge" value="" maxlength="6" disabled></td>
              <td><img src="../static/img/save.svg" class="save hide" alt=""><img class ="edit" src="../static/img/edit.svg" alt="editar"><img class="delete" src="../static/img/delete.svg" alt="eliminar"></td>
             `;
          }else if (addButton.classList.contains("booking-btn")){
            newCells = `
            <td>
              <select name="patient-select" id="patient-select" disabled>
              <option value="seleccione el paciente" selected disabled>Elija un paciente</option>
              <option value="James Rodríguez">James Rodríguez</option>
              </select>
            </td>
            <td>
              <select name="dentist-select" id="dentist-select" disabled>
              <option value="seleccione el odontólogo" selected disabled>Elija un odontólogo</option>
              <option value="James Rodríguez">Cristiano Ronaldo</option>
              </select>
            </td>
            <td><input type="datetime-local" name="booking-date" value="" maxlength="20" disabled></td>
            <td><img src="../static/img/save.svg" class="save hide" alt=""><img class ="edit" src="../static/img/edit.svg" alt="editar"><img class="delete" src="../static/img/delete.svg" alt="eliminar"></td> 
            `;
          }
          newRow.innerHTML = newCells;
          tbody.appendChild(newRow);
          editBtns = document.querySelectorAll(".edit");
          saveBtns = document.querySelectorAll(".save");
          deleteBtns = document.querySelectorAll(".delete");
          tableBodyRows = document.querySelectorAll("tbody tr");
          changeButtons(editBtns, saveBtns);
          changeButtons(saveBtns, editBtns);
          deleteRow();
        })
      }
    }

    function deleteRow(){
      for(let index = 0; index < deleteBtns.length; index++){
        deleteBtns[index].addEventListener("click", ()=>{
          console.log("deltete btn pressed")
          swal({
            title: "¿Está seguro de eliminar este registro?",
            text: "Una vez eliminado, se borrará de la base datos.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then(willDelete => {

            if (willDelete) {
              // borrar fila
               tableBodyRows[index].remove();
              swal("El registro ha sido eliminado exitosamente.", {
                icon: "success",
              });
            } else {
              swal("El registro se mantendrá en la base de datos.");
            }
          });
          
        })
      }
    }

     document.addEventListener("click", evt => {
       let targetEl = evt.target; // clicked element
       do {
         if (targetEl == hamMenu) {
           // This is a click inside, shows menu
           mobileMenu.classList.remove("hide");
           return;
         }
         // Go up the DOM
         targetEl = targetEl.parentNode;
       } while (targetEl);
       // This is a click outside.
       mobileMenu.classList.add("hide");
     });
     
    deleteRow()
    addNewRow();
    changeButtons(editBtns, saveBtns);
    changeButtons(saveBtns, editBtns);
    
}