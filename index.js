// const wrapper = document.querySelector(".wrapper");

// const blackLike = (id) => ( `
// <svg fill="#000000" height="20px" width="20px" version="1.1" id="${id}" class="like" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
// 	 viewBox="0 0 217.408 217.408" xml:space="preserve">
// <path id="${id}" class="like" d="M194.078,22.682c-10.747-8.193-22.606-12.348-35.248-12.348c-15.951,0-33.181,6.808-50.126,19.754
// 	C91.759,17.142,74.529,10.334,58.578,10.334c-12.642,0-24.501,4.155-35.248,12.348C7.606,34.671-0.24,49.8,0.006,67.648
// 	c0.846,61.117,100.093,133.233,104.317,136.273l4.381,3.153l4.381-3.153c4.225-3.04,103.472-75.156,104.317-136.273
// 	C217.648,49.8,209.802,34.671,194.078,22.682z M153.833,149.017c-18.374,18.48-36.915,33.188-45.129,39.453
// 	c-8.214-6.265-26.755-20.972-45.129-39.453c-31.479-31.661-48.274-59.873-48.57-81.585c-0.178-13.013,5.521-23.749,17.421-32.822
// 	c8.073-6.156,16.872-9.277,26.152-9.277c17.563,0,34.338,10.936,45.317,20.11l4.809,4.018l4.809-4.018
// 	c10.979-9.174,27.754-20.11,45.317-20.11c9.28,0,18.079,3.121,26.152,9.277c11.9,9.073,17.599,19.809,17.421,32.822
// 	C202.107,89.145,185.311,117.356,153.833,149.017z"/>
// </svg>
// `);

// const redLike = (id) => ( `
// <svg height="20px" width="20px" version="1.1" id="${id}" class="like" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
// 	 viewBox="0 0 512.001 512.001" xml:space="preserve">
// <path id="${id}" class="like" style="fill:#E21B1B;" d="M0,150.84c0.56,145.8,198.032,235.56,256,350.952C313.968,386.4,511.432,296.641,512,150.84
// 	c0.272-68.856-57.304-140.632-128-140.632S256,49.984,256,118.84c0-68.856-57.296-108.632-128-108.632S0,81.984,0,150.84z"/>
// <path id="${id}" class="like" style="fill:#F91E1E;" d="M256,501.792C198.032,386.4,0.56,296.641,0,150.84C0,81.984,57.296,10.208,128,10.208
// 	S256,49.984,256,118.84V501.792z"/>
// </svg>
// `);



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

//  const svgDiv = document.createElement('div');
//  svgDiv.innerHTML = skin.like ? redLike(`${skin.id} 1`) : blackLike(`${skin.id} 0`)

 const p = document.createElement('p');
 p.textContent =trancate(skin.description);
 parentDiv.append(img);
 parentDiv.append(innerDiv);
 innerDiv.append(titleDiv);
 titleDiv.append(h4);
//  titleDiv.append(svgDiv);
titleDiv.append(h4);
innerDiv.append(h5);
 innerDiv.append(p);
 return parentDiv;
}
const beginning = (skincareProducts) => {

 const mainDiv = document.createElement('div');
 mainDiv.className = 'main';

document.body.appendChild(mainDiv);

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

//    function clickCallback(e) {
//     console.log(e.target);
//     // console.log();
//     if (e.target.getAttribute('class') === 'like') {
//     const combinedIdlike = e.target.getAttribute('id');
//     const id = combinedIdlike?.split(" ")[0];
//     const likeBolean = combinedIdlike?.split(" ")[1] === '1' ? true : false;
   
//     console.log(combinedIdlike);
//     console.log(id);
//     console.log(likeBolean);
   
//        e.preventDefault();
   
   
//      fetch(` http://localhost:3000/skincareProducts/${Number(id)}`, {
//     method: 'PATCH',
//     headers: {
//      "Content-Type": "application/json"
//     },
//     body: JSON.stringify(
//      {
//       id: Number(id),
//       like: !likeBolean
//      }
//     )
//    })
//    .then((result) => result.json())
//    .then((result2) => console.log(result2))
//    .catch((error) => console.log(error));
//    e.preventDefault();
   
//     }
//    }
   
//    document.addEventListener('click', clickCallback);
   
   
   
   
   
