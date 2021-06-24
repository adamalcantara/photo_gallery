let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

//Get the gallery images
if(galleryImages) {
    galleryImages.forEach(function(image, index) {
        image.onclick = function() {
            //Get the CSS for the image that is clicked on
            let getElementCss = window.getComputedStyle(image);
            //Get the background-image property from the CSS for the image that is clicked on
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            console.log(getFullImgUrl)
            //Split the image URL so you only get the end
            let getImgUrlPos = getFullImgUrl.split("/img/thumbs/");
            //Replace the end of the URL (which has a ") in it) with nothing
            let setNewImgUrl = getImgUrlPos[1].replace('")', '');
            console.log(setNewImgUrl)

            getLatestOpenedImg = index + 1;

            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            //Add a class so that styling can be applied
            newImgWindow.setAttribute("class", "img-window");
            //On click event so that image closes when container is clicked
            newImgWindow.setAttribute("onclick", "closeImg()");

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "img/" + setNewImgUrl);


        }
    });
}