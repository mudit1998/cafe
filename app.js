
const cafelist = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc)
{
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross =document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafelist.appendChild(li);

    //deleting 
    cross.addEventListener('click',(e) =>{
      let id= e.target.parentElement.getAttribute('data-id');
      db.collection('cafe').doc(id).delete();
    });

}
//getting from firebase
//db.collection('cafe').orderBy('name').get().then((snapshot) => {
  //  snapshot.docs.forEach(doc => {
    //     renderCafe(doc);
    //});
//});

//saving to database
form.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('cafe').add({
       name: form.name.value,
       city: form.city.value,
    });
    form.name.value='';
    form.city.value='';
});

//realtime listner

db.collection('cafe').onSnapshot(snapshot =>{
 let changes = snapshot.docChanges();
 changes.forEach(change =>{
     if(change.type=="added"){
         renderCafe(change.doc);
     } else if(change.type=="removed"){
         let li = cafelist.querySelector('[data-id=' + change.doc.id + ']' );
         cafelist.removeChild(li);
     }
 });
});

//set will completely overwrite things while update will update certain things in it.