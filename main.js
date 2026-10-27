let container = document.querySelector(".container");

// ! CRUD(Create(post), Read(get), Update(post), Delete(delete))
// ! READ(get)
async function getAllProducts() {
  try {
    let res = await fetch("http://localhost:8000/users");
    let data = await res.json();
    console.log(data);

    data.forEach((element) => {
      let box = document.createElement("div");
  let nameInp = document.createElement("input");
let surnameInp = document.createElement("input");
let ageInp = document.createElement("input");

nameInp.disabled = true;
surnameInp.disabled = true;
ageInp.disabled = true;

nameInput.value = element.name;
surnameInput.value = element.surname;
ageInput.value = element.age;
      let deleteBtn = document.createElement("button");
      let updateBtn = document.createElement("button");

updateBtn.textContent = "Edit";

      nameInp.value = element.name;
      surnameInp.value = element.surname;
      ageInp.value = element.age;
      deleteBtn.textContent = "Delete";

      deleteBtn.addEventListener("click", () => {
        console.log(element.id);

        deleteUser(element.id);
      });

updateBtn.addEventListener("click", async () => {
  if (nameInp.disabled) {
    nameInp.disabled = false;
    surnameInp.disabled = false;
    ageInp.disabled = false;

    updateBtn.textContent = "Save";
  } else {
    let payload = {
      name: nameInp.value,
      surname: surnameInp.value,
      age: Number(ageInp.value),
    };

    try {
      let res = await fetch(`http://localhost:8000/users/${element.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = await res.json();
      console.log(data);

      nameInp.disabled = true;
      surnameInp.disabled = true;
      ageInp.disabled = true;

      updateBtn.textContent = "Edit";
    } catch {
      console.log("error");
    }
  }
});

      box.style.border = "2px solid red";
      box.style.width = "400px";

      box.append(nameInp, surnameInp, ageInp, deleteBtn, updateBtn);
      container.append(box);
    });
  } catch {
    console.log("error");
  }
}

getAllProducts();

let nameInput = document.querySelector("#nameInput");
let surnameInput = document.querySelector("#surnameInput");
let ageInput = document.querySelector("#ageInput");
let btn = document.querySelector("button");

// ! CREATE(post)
btn.addEventListener("click", () => {
  async function postAllProducts() {
    const payload = {
      name: nameInput.value,
      surname: surnameInput.value,
      age: Number(ageInput.value),
    };

    if (
      nameInput.value == "" ||
      surnameInput.value == "" ||
      ageInput.value == ""
    ) {
      return;
    }

    try {
      let res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      let data = await res.json();
      console.log(data);
    } catch {
      console.log("error");
    }
  }
  postAllProducts();
});

// ! DELETE(delete)

async function deleteUser(id) {
  try {
    let res = await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    // console.log(data);
  } catch {
    console.log("error");
  }
}

