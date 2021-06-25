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
            newImg.setAttribute("id", "current-img");

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
                newNextBtn.setAttribute("onclick", "changeImg(1)")
                newNextBtn.style.cssText = "right: " + calcImgToEdge + "px";

                //Creating previous button
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("<")
                //Appending previous button
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                //Set attribute and on click for the button
                newPrevBtn.setAttribute("class", "img-btn-prev")
                newPrevBtn.setAttribute("onclick", "changeImg(0)")
                newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px";
            }
        }
    });
}

//Close the image and buttons
function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-prev").remove();
    document.querySelector(".img-btn-next").remove();
}

function changeImg(changeDir) {
    //Remove the current image before moving to the next one
    document.querySelector("#current-img").remove();
    
    let getImgWindow = document.querySelector(".img-window")
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
        //If image opened is last, then go back to beginning
        if(calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    } else if(changeDir === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        //If image opened is first, then go to the end
        if(calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute("src", "img/img" + calcNewImg + ".jpg");
    newImg.setAttribute("id", "current-img");

    //Set latest opened image to the calcNewImg
    getLatestOpenedImg = calcNewImg;

    newImg.onload = function() {
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

        let nextBtn = document.querySelector(".img-btn-next")
        nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

        let prevBtn = document.querySelector(".img-btn-prev")
        prevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
    }
}