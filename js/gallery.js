let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

//Get the gallery images
if (galleryImages) {
    galleryImages.forEach(function (image, index) {
        image.onclick = function () {
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

            newImg.onload = function () {
                //Get the width of the image
                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

                //Creating next button
                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode(">")
                //Appending previous button
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                //Set attribute and on click for the button
                newNextBtn.setAttribute("class", "img-btn-next")
                newNextBtn.setAttribute("onclick", "changeImg()")
                newNextBtn.style.cssText = "right: " + calcImgToEdge + "px";

                //Creating previous button
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("<")
                //Appending previous button
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                //Set attribute and on click for the button
                newPrevBtn.setAttribute("class", "img-btn-prev")
                newPrevBtn.setAttribute("onclick", "changeImg()")
                newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px";
            }
        }
    });
}

function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-prev").remove();
    document.querySelector(".img-btn-next").remove();
}

function changeImg() {
    
}