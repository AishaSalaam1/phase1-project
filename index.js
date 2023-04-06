const wrapper = document.querySelector(".wrapper");
const form = document.querySelector(".submit");
const nameInput = document.querySelector(".name");
const commentInput = document.querySelector(".comment");
const ulReviews = document.querySelector(".ul-reviews");


const blackLike = (id) => ( `
<svg fill="#000000" height="20px" width="20px" version="1.1" id="${id}" class="like" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     viewBox="0 0 217.408 217.408" xml:space="preserve">
<path id="${id}" class="like" d="M194.078,22.682c-10.747-8.193-22.606-12.348-35.248-12.348c-15.951,0-33.181,6.808-50.126,19.754
    C91.759,17.142,74.529,10.334,58.578,10.334c-12.642,0-24.501,4.155-35.248,12.348C7.606,34.671-0.24,49.8,0.006,67.648
    c0.846,61.117,100.093,133.233,104.317,136.273l4.381,3.153l4.381-3.153c4.225-3.04,103.472-75.156,104.317-136.273
    C217.648,49.8,209.802,34.671,194.078,22.682z M153.833,149.017c-18.374,18.48-36.915,33.188-45.129,39.453
    c-8.214-6.265-26.755-20.972-45.129-39.453c-31.479-31.661-48.274-59.873-48.57-81.585c-0.178-13.013,5.521-23.749,17.421-32.822
    c8.073-6.156,16.872-9.277,26.152-9.277c17.563,0,34.338,10.936,45.317,20.11l4.809,4.018l4.809-4.018
    c10.979-9.174,27.754-20.11,45.317-20.11c9.28,0,18.079,3.121,26.152,9.277c11.9,9.073,17.599,19.809,17.421,32.822
    C202.107,89.145,185.311,117.356,153.833,149.017z"/>
</svg>
`);

const redLike = (id) => ( `
<svg height="20px" width="20px" version="1.1" id="${id}" class="like" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     viewBox="0 0 512.001 512.001" xml:space="preserve">
<path id="${id}" class="like" style="fill:#E21B1B;" d="M0,150.84c0.56,145.8,198.032,235.56,256,350.952C313.968,386.4,511.432,296.641,512,150.84
    c0.272-68.856-57.304-140.632-128-140.632S256,49.984,256,118.84c0-68.856-57.296-108.632-128-108.632S0,81.984,0,150.84z"/>
<path id="${id}" class="like" style="fill:#F91E1E;" d="M256,501.792C198.032,386.4,0.56,296.641,0,150.84C0,81.984,57.296,10.208,128,10.208
    S256,49.984,256,118.84V501.792z"/>
</svg>
`);
// // page
let fetchedData;
 fetch("http://localhost:3000/skincareProducts")
.then((result) => result.json())
.then((result2) => {
 fetchedData = result2;
 console.log('results --> ', result2);  
 beginning(result2);
 // wholeBody(result2);
})
.catch((error) => console.log(error));




function buildCard(skin) {
 const parentDiv = document.createElement('div');
 parentDiv.className = 'card';

 const img = document.createElement('img');
 img.src = skin.imageUrl;
 img.style = 'width:100%';

const innerDiv = document.createElement('div');
innerDiv.className = 'container';

const titleDiv = document.createElement('div');
titleDiv.className = 'titleDiv';

const h4 = document.createElement('h4');
h4.textContent = skin.brand;
const h5 = document.createElement('h5');
h5 .textContent = skin.name

const svgDiv = document.createElement('div');
svgDiv.innerHTML = skin.like ? redLike(`${skin.id} 1`) : blackLike(`${skin.id} 0`);



// const addButton = document.createElement('button');
// addButton.textContent = 'Add to Cart';

// const commentSection = document.createElement('div')
// commentSection.id = 'comments';
const price = document.createElement('p');
price.textContent = skin.price;

const btn = document.createElement('button');
btn.textContent = `Buy`;
btn.id = `${skin.id} ${skin.price} btn`;
//  btn.disabled = !availableTickets;

const button2 = document.createElement('button');
button2.textContent = `Delete`;
button2.className = `${skin.id} button-delete`;
//  button2.disabled = !availableTickets;

const updateButton = document.createElement('button');
updateButton.textContent = 'Update';
updateButton.className = `${skin.id} button-update`;

const p = document.createElement('p');
p.textContent =trancate(skin.description);
parentDiv.append(img);
parentDiv.append(innerDiv);
innerDiv.append(titleDiv);
titleDiv.append(h4);
//  innerDiv.append(commentSection);
innerDiv.append(titleDiv);
//  innerDiv.append(priceElement);

//  parentDiv.append(addButton);


titleDiv.append(h4);
titleDiv.append(svgDiv);
// titleDiv.append(h4);
innerDiv.append(h5);
innerDiv.append(p);
innerDiv.append(price);

innerDiv.append(btn);
innerDiv.append(updateButton);
innerDiv.append(button2);
return parentDiv;
}
const beginning = (skincareProducts) => {

const mainDiv = document.createElement('div');
mainDiv.className = 'main';

wrapper.appendChild(mainDiv);

skincareProducts.forEach(skincareProducts => {
const card = buildCard(skincareProducts);
mainDiv.append(card);
});
};
function trancate(str) {
   if (str.length > 200) {
    return `${str.slice(0, 90)} ...`
   }
   return str;
}

function clickCallback(e) {
console.log(e.target);
// console.log();
if (e.target.getAttribute('class') === 'like') {
const combinedIdlike = e.target.getAttribute('id');
const id = combinedIdlike?.split(" ")[0];
const likeBolean = combinedIdlike?.split(" ")[1] === '1' ? true : false;

console.log(combinedIdlike);
console.log(id);
console.log(likeBolean);

   e.preventDefault();


   fetch(`http://localhost:3000/skincareProducts/${Number(id)}`, {
method: 'PATCH',
headers: {
   "Content-Type": "application/json"
},
body: JSON.stringify(
   {
   id: Number(id),
   like: !likeBolean
   }
)
})
.then((result) => result.json())
.then((result2) => console.log(result2))
.catch((error) => console.log(error));
e.preventDefault();

}
}

document.addEventListener('click', clickCallback);
const comments = (e) => {
e.preventDefault();
fetch(`http://localhost:3000/reviews`, {
method: 'POST',
headers: {
    "Content-Type": "application/json"
},
body: JSON.stringify(
    {
    name: nameInput.value,
    message: commentInput.value,
    }
)
})
.then((result) => result.json())
.then((result2) => console.log(result2))
.catch((error) => console.log(error));
};

form.addEventListener('click', comments);

let reviewData;
fetch("http://localhost:3000/reviews")
.then((result) => result.json())
.then((result2) => {
reviewData = result2;
console.log('results --> ', result2);
    reviewList(result2);  
}).catch((e) => console.log(e))
   
function reviewList (reviews) {
reviews.forEach((r) => {
    const li = document.createElement("li")
li.className = "lis"
li.innerHTML = `
    <p>${r.name}</p>
    <p>${r.message}</p>
    `;
    ulReviews.append(li);
    })

}
   
   function deleteCallback(e) {
    console.log(e.target);
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Delete') {
        const id = e.target.className.split(" ")[0];
        console.log(id);
        e.preventDefault();
        fetch(`http://localhost:3000/skincareProducts/${Number(id)}`, {
            method: 'DELETE',
        })
        .then((result) => {
            console.log(result);
            e.target.parentNode.parentNode.parentNode.remove();
        })
        .catch((error) => console.log(error));
        e.preventDefault();
    }
}

document.addEventListener('click', deleteCallback);


function buyCallback(e) {
    console.log(e.target);
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Buy') {
        const combinedIdPrice = e.target.getAttribute('id');
        const id = combinedIdPrice?.split(" ")[0];
        const price = combinedIdPrice?.split(" ")[1];
        console.log(combinedIdPrice);
        console.log(id);
        console.log(price);
        e.preventDefault();
        fetch(`http://localhost:3000/purchases`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    productId: Number(id),
                    price: Number(price)
                }
            )
        })
        .then((result) => result.json())
        .then((result2) => {
            console.log(result2);
            alert('Purchase successful!');
        })
        .catch((error) => console.log(error));
        e.preventDefault();
    }
}

document.addEventListener('click', buyCallback);


const formUpdate = document.createElement('form');
form.className = `${skin.id} form-update`;
form.innerHTML = `
  <label for="brand">Brand:</label>
  <input type="text" name="brand" value="${skin.brand}">
  <label for="name">Name:</label>
  <input type="text" name="name" value="${skin.name}">
  <label for="description">Description:</label>
  <textarea name="description">${skin.description}</textarea>
  <label for="price">Price:</label>
  <input type="number" name="price" value="${skin.price}">
  <input type="submit" value="Update">
`;
innerDiv.append(formUpdate);

function toggleUpdateForm(e) {
    const id = e.target.className.split(' ')[0];
    const form = document.querySelector(`.${id}.form-update`);
    form.classList.toggle('hidden');
  }
  updateButton.addEventListener('click', toggleUpdateForm);
  function updateSkincareProduct(e) {
    e.preventDefault();
    const id = e.target.className.split(' ')[0];
    const brand = e.target.brand.value;
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = Number(e.target.price.value);
    fetch(`http://localhost:3000/skincareProducts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        brand,
        name,
        description,
        price
      })
    })
      .then((result) => result.json())
      .then((result2) => console.log(result2))
      .catch((error) => console.log(error));
  }
  form.addEventListener('submit', updateSkincareProduct);
  