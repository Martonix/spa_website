//an array, defining the routes
export default[

    {
        //the part after '#' in the url (so-called fragment):
        hash:"welcome",
        ///id of the target html element:
        target:"router-view",
        //the function that returns content to be rendered to the target html element:
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = 
                document.getElementById("template-welcome").innerHTML
    },

    {
        hash:"articles",
        target:"router-view",
        getTemplate: fetchAndDisplayArticles
    },
    
    {
        hash:"opinions",
        target:"router-view",
        getTemplate: createHtml4opinions
    },

    {
        hash:"addOpinion",
        target:"router-view",
        getTemplate: (targetElm) =>
            document.getElementById(targetElm).innerHTML = 
              document.getElementById("template-addOpinion").innerHTML
    },     

]



function createHtml4opinions(targetElm){
    const opinionsFromStorage = localStorage.myCommentsSpa;
    let opinions=[];

    if(opinionsFromStorage){
        opinions=JSON.parse(opinionsFromStorage);
    }
    /*
        opinions.forEach(opinion => {
            opinion.created = (new Date(opinion.created)).toDateString();
            opinion.willReturn = 
              opinion.willReturn?"I will return to this page.":"Sorry, one visit was enough.";
        });
        
    }
*/
    document.getElementById(targetElm).innerHTML = Mustache.render(
        document.getElementById("template-opinions").innerHTML,
        opinions
        );
}                    


function fetchAndDisplayArticles(targetElm, current, totalCount){

    const urlList = "https://wt.kpi.fei.tuke.sk/api/article";
  // const url = "https://wt.kpi.fei.tuke.sk/api/article";

    current=parseInt(current);
    totalCount=parseInt(totalCount);

    
if(!isNaN(parseInt(localStorage.getItem("lastviewed"))) && parseInt(current) === 1){
    if(parseInt(localStorage.getItem("lastviewed")) !==2){
       current = localStorage.getItem("lastviewed");
    }
}

    localStorage.setItem("lastviewed", current);
   

     let listSpa = [];

     let data4rendering = {
         
       currPage:current,
        pageCount:totalCount
    };

    const articlesElm = document.getElementById("router-view");

 

    if(current>1){
        data4rendering.prevPage = current - 1;
    }

    if(current<totalCount){
        data4rendering.nextPage = parseInt(current + 1);
    }

    fetch(`${urlList}/?max=20&offset=`+((current-1)*20))
    .then(response =>{
        if(response.ok){
            return response.json();
        }else{ //if we get server error
            return Promise.reject( new Error(`Server answered with ${response.status}: ${response.statusText}.`));
        }
    })
    .then(responseJSON => {

        listSpa = responseJSON.articles;
        return Promise.resolve();
    })
    .then(()=> {
        let cntRequests = listSpa.map(article => fetch(`${urlList}/${article.id}`)
        );
        return Promise.all(cntRequests);
    })
    .then(responses =>{
        let failed="";
        for(let response of responses) {
            if(!response.ok) failed+=response.url+" ";
        }
        if(failed===""){
            return responses;
        }else{
            return Promise.reject(new Error(`Failed to access the content of the articles with urls ${failed}.`));
        }
    })
    .then(responses => Promise.all(responses.map(resp => resp.json())))
    .then(articles => {
        articles.forEach((article,index) =>{
            listSpa[index].content=article.content;
        });
        return Promise.resolve();
    })
    
    .then( () => {
        let commRequests = listSpa.map(
            article => fetch(`${urlList}/${article.id}/comment`)
        );
        return Promise.all(commRequests)
    })
    .then( () =>{
        data4rendering.articles=listSpa;
        renderArticles(data4rendering);
    })
    .catch (error => { ////here we process all the failed promises
        const errMsgObj = {errMessage:error};
        document.getElementById(targetElm).innerHTML =
            Mustache.render(
                document.getElementById("template-articles-error").innerHTML,
                errMsgObj
            );
    });




function renderArticles(articles) {
    articlesElm.innerHTML=Mustache.render(document.getElementById("template-articles").innerHTML, articles); //write some of the response object content to the page using Mustache
}

                
}
                 
