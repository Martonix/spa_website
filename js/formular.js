
const border = () => {

    let nameSpa = document.getElementById("nameLbl");
    let opinionSpa = document.getElementById("textArtLbl");

   

}
 


function displayOrHideMenu(){
    document.getElementById("menuIts").classList.toggle("mnShow");
}

function hideMenu() {
    let menuClElmCList=document.getElementById("menuIts").classList;
    if(menuClElmCList.contains("mnShow")) menuClElmCList.remove("mnShow");

}

document.addEventListener("click", function(event){

        if(!event.target.matches("#menuCl, #menuTitle")){

            hideMenu();
        } 
    }
);



//functions for transforming opinion(s) to Html code

const opinionHtml = (opinion) =>{

    //vytvoríme dátum 
    opinion.createdDate=(new Date(opinion.created)).toDateString();


    const template = document.getElementById("htmlFromScript").innerHTML;
    const htmlWOp = Mustache.render(template,opinion);
    
    delete(opinion.createdDate);
    return htmlWOp;
                    
}

const  opinionArrHtml = (sourceData) => {

    return sourceData.reduce((htmlOpinions,opn) => htmlOpinions+ opinionHtml(opn),"");

}



let commnt=[];

const opinionsElm=document.getElementById("opinionsContainer");

//rozloží mi to v localstorage údaje na zložky a zapíše ich do prázdneho poľa 
if(localStorage.myComments){
    commnt=JSON.parse(localStorage.myComments);
}


opinionsElm.innerHTML = opinionArrHtml(commnt);
console.log(commnt);

 
    let myForm=document.getElementById("forms");

 
    myForm.addEventListener("submit", openFormular);

    function openFormular(e){

       
        e.preventDefault();

        //odstránime prípadné medzery 
        const name = document.getElementById("nameLbl").value.trim(),
              comm = document.getElementById("textArtLbl").value.trim(), 
              authr = document.getElementById("authorLbl").value.trim(),
              email = document.getElementById("emaliLbl").value.trim();
        
       
        //overíme či užívateľ zadal všetko správne 
        if( name=="" || comm == "" || authr == "" || email ==""){
             const confirmed = confirm("Vyplne všetky poľa");
            return;
        }

        //let tday = new Date()- new Date(commnt[0].created);

        //pridáme data do localstorage
             const newComment =
            {
                name,
                comm,
                authr,
                email,
                created:  new Date(),
            };

      
            console.log("New comment:\n "+JSON.stringify(newComment));
 
            let commnt=[];

        
        
            commnt.push(newComment);
    //premení údaje na string 
        localStorage.myComments = JSON.stringify(commnt);


 
            //5. Reset the form
       // myForm.reset(); //resets the form
      

    }
