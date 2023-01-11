const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
//Unsplash API
const count=10;
const apiKey = 'ehz38a0bgKxB_fwl3uNB8gIpBuwe8-WsDsH43aaXExk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//create elements for links & photos ,Add to DOM
function displayPhotos(){
    //Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //create <a> link to unsplash
     const item = document.createElement('a');
     item.setAttribute('href',photo.links.html);//---->commenting out for DRY code we will use helper func instead
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
   // img.addEventListener('load'.imageLoaded);
  //put <img> inside <a> , then put both inside imagecontainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}


//Get photos from unsplash api
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray= await response.json();
        displayPhotos();
    } catch(error) {
        // action if error...
    }
}


//on Load
getPhotos();