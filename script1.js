const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = []; //using let as our value of photosarray will change with every request

//Unsplash API
const ApiKey = "ehz38a0bgKxB_fwl3uNB8gIpBuwe8-WsDsH43aaXExk";
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${count}`;


//check if all image were loaded
function imageLoaded(){
    console.log('image loaded');
}
//Helper function to set Attributes on DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}
//create elements for links & photos ,Add to DOM
 function displayPhotos(){
    //Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //create <a> link to unsplash
     const item = document.createElement('a');
     item.setAttribute('href',photo.links.html);//---->commenting out for DRY code we will use helper func iinstead
     item.setAttribute('target','_blank');
    // setAttributes(item,{
    //    href: photo.links.html,
    //    target:'_blank',
    //});
      //create <img> for photo
      const img = document.createElement('img');
    //   setAttributes(img,{
    //     src:photo.urls.regular,
    //     alt:photo.alt_description,
    //     title:photo.alt_description,
     // });
     img.setAttribute('src',photo.urls.regular);
     img.setAttribute('alt',photo.alt_description);
     img.setAttribute('title',photo.alt_description);

    //Event listener .check when each is finished loading
    img.addEventListener('load'.imageLoaded);
  //put <img> inside <a> , then put both inside imagecontainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}
//get photos from unsplash api
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray= await response.json();
        displayPhotos();
    } catch(error) {
        // action if error...
    }
}

//check to see if scrolling near bottom of page,load more phots
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY >= document.body.offHeight-1000){
        getPhotos();
        // console.log('window.innerHeight:',window.innerHeight);
        // console.log('window.scrollY:',window.scrollY);
        // console.log('window.innerHeight+scrollY:',window.innerHeight+window.scrollY);
        // console.log('document.body.offsetHeight-1000:', document.body.offsetHeight-1000);
        console.log('load more');
    }
});

//onload
getPhotos();

