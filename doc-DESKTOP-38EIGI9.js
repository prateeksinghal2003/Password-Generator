// Finds and stores the first HTML element that has the class "slider" in the variable inputslider.
const inputslider=document.querySelector('.slider');

const lengthdisplay=document.querySelector('.password-length');
const pssdisplay=document.querySelector('.password_display');
const copytext=document.querySelector('.copytext');
const copyBtn=document.querySelector('.cpybtn');

const uppercase=document.querySelector('#uppercase');
const lowercase=document.querySelector('#lowercase');
const symbols=document.querySelector('#symbols');
const numbers=document.querySelector('#numbers');

const circle=document.querySelector('.circle');
const pssgen=document.querySelector('.password-generator');

const allcheckbox=document.querySelectorAll('input[type=checkbox]');
// Selects all <input> elements of type="checkbox".
// const allcheckbox = ... → Stores the NodeList (a collection of elements) in allcheckbox.

const symbol='!@#$%^&*()<>?/\|-=_`';


let pssword="";  //on reloading the page password field is empty
let psswordlen=10; //on reloading the page length field is 10

//set password length
handleslider();


// #ccc is shorthand for #cccccc.
// Since all three values are equal, #ccc is a shade of gray.

setIndicator("#ccc");

function handleslider()
{
    //slider uss value pe set hoga jo attribute "value" ke kender jo number define hain
    inputslider.value=psswordlen;

    // Updates the innerText of lengthdisplay (a span, div, or paragraph) to show the current password length.
    lengthdisplay.innerText=psswordlen;

    const min=inputslider.min;
    const max=inputslider.max;

    inputslider.style.backgroundSize=((psswordlen-min)*100/(max-min)) + "% 100%";
    // This dynamically updates the slider's background fill based on the current slider value (psswordlen).


    //determinig the width ,to see how much the slider has filled .
    //height is set to 100%

}



function setIndicator(color)

{
      circle.style.backgroundColor=color;
      //add shadow -hw
}


//random number should be generated between min and max
// if you multiply any no within the range of (0 to 1) then that range becomes (0 to that number),
// => if the number = (max-min)  then range becomes  (0 to (max-min))
// => to get the range (max-min),simply add min  

function getRandomInteger(min,max)
{
        return Math.floor( Math.random()*(max-min))+min;
}

function getRandomNumber()
{
    return getRandomInteger(0,9);
}


//generating random lower case letters
function getLowerCase()
{
    return String.fromCharCode(getRandomInteger(97,122));
}

function getUppererCase()
{
    return String.fromCharCode(getRandomInteger(65,90));
}


//generating random symbol
function getSymbol()
{
         const random=getRandomInteger(0,symbol.length);
         return symbol.charAt(random);
}


function calStrength()
{
    let hasNum=false;
    let hasUC=false;
    let hasLC=false;
    let hasSym=false;

    //retreived uppercase checkbox and checked whether it is ticked or not
    //checked is a predefined property of the <input type="checkbox"> element in JavaScript.
    if(uppercase.checked)
    {
        hasUC=true;
    }

    if(lowercase.checked)
    {
        hasLC=true;
    }

    if(numbers.checked)
    {
      hasNum=true;
    }

    if(symbols.checked)
    {
      hasSym=true;
    }

    if(hasSym && hasNum && hasUC && hasLC )
    {
        //shorthand notation for #00ff00
        //red and blue is set to zero,
        setIndicator('#0f0');
    }

    else
    {
        setIndicator('#f00');
    }
}  


// JavaScript normally doesn’t wait for tasks like fetching data or copying text.
//  async/await makes JavaScript pause and wait until the task is finished.
//  This makes the code easier to read and less complicated.



    async function copycontent()//set async because i want copying on clipboard to complete first then "copied" mssg should be displayed
    {

        try
        {
          //to copy on clipboard
         await navigator.clipboard.writeText(pssdisplay.value); //value attribute would be the content inside the text field which i want to copy
                                                                 //in clipboard
        
          copytext.innerText="copied"; 
          copytext.classList.add("active");
          console.log(copytext.innerText);                                               
                                                                 
         }                                                      
          catch(e)     
          {
                 copytext.innerText='failed';
          } 

            setTimeout(()=>
            {
                 copytext.classList.remove("active");

            },2000);



            
          

         

    }    

    copyBtn.addEventListener("click", () => {
        //JavaScript automatically converts the string into a boolean (truthy or falsy).
        //empty string would be treated as falsy
        if (pssdisplay.value)
            copycontent();
    });
    


        //type =input which means whenever we change the slider left or right

        // e (event object) stores information about the event.
        //  e.target points to the exact element that triggered the event.
        //  e.target.value gets the updated value when the slider moves.
        inputslider.addEventListener('input',(e)=>
        {
             
            psswordlen = e.target.value;//e.target gives the element where event has been applied
            handleslider();
        });


        //muje iska use kuch lagaa nahi

    //     copytext.addEventListener("click",() =>
    //     {
    //              if(pssdisplay.value)
    //                 copycontent();
    //     }
    // );

   



//-------------------for Each loop
// arrayname.forEach(function(currentValue, index, arr), thisValue)

//-------------------Parameters
// function()-----	Required.
// A function to run for each array element.
// currentValue	Required.
// The value of the current element.

//-----------------------Code

// let sum = 0;
// const numbers = [65, 44, 12, 4];
// numbers.forEach(myFunction(elem));

// function myFunction(item) 
// {
//   sum += item;
// }


//the function inside the "forEach" parameter has a parameter which each time represents array elements
allcheckbox.forEach((checkbox)=>
{
    checkbox.addEventListener('change',handlecheckBoxchange);
});



function handlecheckBoxchange()
{
      checkboxcount=0;

     //here i am counting the number of tick checkboxes 
    allcheckbox.forEach((checkbox)=>
    {
        if(checkbox.checked==true)
        {
            checkboxcount+=1;
        }
    })


    //one case  if password length is less than number of ticked boxes make it equal to no of checkboxes.
    if(psswordlen<checkboxcount)
    {
        psswordlen=checkboxcount;
        handleslider();
    }
}


 pssgen.addEventListener('click',()=>
     {
        
        copytext.innerText=""; 
        //ye isiliye kiya because  everytime i am clicking on generate password "copied" vala text should disappear

         if(checkboxcount<=0)
            {
                 return;
             }


         
        //iski need nahi lag rahi hai muje     
            
        //    if(psswordlen<checkboxcount)
        //      {
        //            psswordlen=checkboxcount;
        //            handleslider();
        //      }
            
            

//             //now generate new password
            pssword="";//delete older one

            

//             //jin jin checkboxes par tick mark hoga vo toh call karna hi hai
//            if(uppercase.checked)
//            {
//             pssword+=getUppererCase();
//            }

//            if(lowercase.checked)
//             {
//              pssword+=getLowerCase();
//             }

//             if(symbols.checked)
//                 {
//                  pssword+=getSymbol();
//                 }

//                 if(numbers.checked)
//                     {
//                      pssword+=getRandomNumber();
//                     }
  

       //in doing this the main problem is ,if password length is 15 how i goona randomly call these four functions
       
       let funarr=[];

        //jin jin checkboxes par tick mark hoga vo toh call karna hi hai
       
        if(lowercase.checked)
       {
         funarr.push(getLowerCase);
       }
 
        if(symbols.checked)
         {
            funarr.push(getSymbol);
         }

         if(uppercase.checked)
            {
             funarr.push(getUppererCase);
            }
 
 
        if(numbers.checked)
        {
          funarr.push(getRandomNumber);
        }

        for(let i=0;i<funarr.length;i++)
        {
            pssword+=funarr[i]();    
        }


        for(let i=0;i<psswordlen-funarr.length;i++)
        {
                let randindx=getRandomInteger(0,funarr.length);
                pssword+=funarr[randindx]();
        }
     
 
//shuffle the password

//converting string(pssword) to array 
//where each element would be a character
 pssword=shuffle(Array.from(pssword));
pssdisplay.value=pssword;
calStrength();


       

              
}
);    


 function shuffle(arr)
 {
    
      for(let i=arr.length-1;i>0;i--)
      {

        // Generates a random index j between 0 and i (inclusive).
        // Math.random() gives a number between 0 and 1.
        // Math.random() * (i + 1) scales it to a valid index range (from 0 to i).
        // Math.floor() ensures we get a whole number.
        
        // Example: If i = 4, j could be 0, 1, 2, 3, or 4.  

        let j=Math.floor(Math.random()*(i+1));

        let temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
      }
      let str="";
      arr.forEach((el)=>
    {
        str+=el;
    });

    return str;
 }
