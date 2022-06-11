
    const URL = 'http://localhost:8080/api/dentists'
    let tbody = document.querySelector("tbody");
    let tableBodyRows = document.querySelectorAll("tbody tr");
    let editBtns = document.querySelectorAll(".edit");
    let saveBtns = document.querySelectorAll(".save");
    let deleteBtns = document.querySelectorAll(".delete");


    async function fetchDentists(URL) {
      try {
        const res = await fetch(URL);
        let data = await res.json();
        renderDentist(data);
        console.log("Datos de bd renderizados")
      } catch (e) {
        console.log(e);
      }   
    }

    function renderDentist(list){
        tbody.innerHTML= "";
        if (list.length > 0) {
          for (let index = 0; index < list.length; index++) {
            let newRow = document.createElement("tr");
            let newCell = ` 
              <td> <input type="text" name="lastName" value=${list[index].lastName} maxlength="30" disabled></td>
              <td><input type="text" name="fisrtName" value=${list[index].firstName} maxlength="30" disabled></td>
              <td><input type="text" name="cardNumber" value=${list[index].numCard} maxlength="6" disabled></td>
              <td><img src="../static/img/save.svg" class="save hide" alt=""><img class ="edit" src="../static/img/edit.svg" alt="editar"><img class="delete" src="../static/img/delete.svg" alt="eliminar"></td>
          `;
            newRow.innerHTML = newCell;
            tbody.appendChild(newRow);
          }
         
        }

       
    }

     function changeButtons(arrBtnsA, arrBtnsB) {
       for (let index = 0; index < arrBtnsA.length; index++) {
         arrBtnsA[index].addEventListener("click", e => {
           if (!arrBtnsA[index].classList.contains("hide")) {
             arrBtnsB[index].classList.remove("hide");
             arrBtnsA[index].classList.add("hide");
             editBtns = document.querySelectorAll(".edit");
            enableInputs(index);
           }
         });
       }
     }

     function enableInputs(index) {
       if (editBtns[index].classList.contains("hide")) {
         tableBodyRows[index].querySelectorAll("td input").forEach(cell => {
           cell.disabled = false;
         });
         tableBodyRows[index].querySelectorAll("select").forEach(select => {
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

function deleteRow() {
  for (let index = 0; index < deleteBtns.length; index++) {
    deleteBtns[index].addEventListener("click", () => {
      swal({
        title: "¿Está seguro de eliminar este odontólogo?",
        text: "Una vez eliminado, se borrará de la base datos.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          // borrar fila
          tableBodyRows[index].remove();
          swal("El odontólogo ha sido eliminado exitosamente de la base de datos.", {
            icon: "success",
          });
        } else {
          swal("El odontólogo se mantendrá en la base de datos.");
        }
      });
    });
  }
}


async function showDentists() {
await fetchDentists(URL).then(() => {
    tableBodyRows = document.querySelectorAll("tbody tr");
    editBtns = document.querySelectorAll(".edit");
    saveBtns = document.querySelectorAll(".save");
    deleteBtns = document.querySelectorAll(".delete");
    changeButtons(editBtns, saveBtns);
    changeButtons(saveBtns, editBtns);
    deleteRow();
})

}


showDentists();