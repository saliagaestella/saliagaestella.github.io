//INDICE:
  //1. Fx para no dejar pasar primer menu, si no login wallet
  //2. Fx para validar input form
  //3. Fx para cambiar de pagina
  document.getElementById('maxWhale').style.display="none"


/*Cambio de pagina*/
const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");

const prevBtnFourth = document.querySelector(".prev-3");

//const nextBtnFourth = document.querySelector(".next-3");

const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function(event){
  event.preventDefault();
  if (access === false){
    $prompt = 'Please connect wallet to use the app';
        snackbar($prompt);
        return
    }
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});

nextBtnSec.addEventListener("click", function(event){
  event.preventDefault();
    /* 5.2 ...Declarar los parametros del contrato... */
    document.getElementById('decimals-error-msg').innerHTML = '';
  document.getElementById('numberTokens-error-msg').innerHTML = '';
  document.getElementById('symbol-error-msg').innerHTML = '';
  document.getElementById('name-error-msg').innerHTML = ''; 
          let $numberTokens = document.getElementById('numberTokens').value; 
          let $name_ = document.getElementById('name').value;
          let $decimalUnits = document.getElementById('decimals').value;
          let $symbol_ = document.getElementById('symbol').value;
         
          
    /* 5.3. ...Validar input form...*/
          if ($name_ === '') {
              document.getElementById('name-error-msg').innerHTML = "Input can't be blank"
          } else if ($symbol_ === '') {
              document.getElementById('symbol-error-msg').innerHTML = "Input can't be blank"
          } else if ($decimalUnits === '') {
              document.getElementById('decimals-error-msg').innerHTML = "Input can't be blank"
          } else if ($numberTokens === '') {
              document.getElementById('numberTokens-error-msg').innerHTML = "Input can't be blank"
          } else if (isNaN($decimalUnits)){
              document.getElementById('decimals-error-msg').innerHTML = "Numeric values only"
          }else if ($decimalUnits<1 || $decimalUnits>18){
            document.getElementById('decimals-error-msg').innerHTML = "Number between 1-18"
		      }else if (isNaN($numberTokens)) {
              document.getElementById('numberTokens-error-msg').innerHTML = "Numeric values only"
          } else {
            let $initialSupply_= BigInt($numberTokens*Math.pow(10, document.getElementById('decimals').value));
            document.getElementById('decimals-error-msg').innerHTML = '';
  document.getElementById('numberTokens-error-msg').innerHTML = '';
  document.getElementById('symbol-error-msg').innerHTML = '';
  document.getElementById('name-error-msg').innerHTML = '';
            slidePage.style.marginLeft = "-50%";
            bullet[current - 1].classList.add("active");
            progressCheck[current - 1].classList.add("active");
            progressText[current - 1].classList.add("active");
            current += 1;}
});


nextBtnThird.addEventListener("click", function(event){
  event.preventDefault();
  let $maxWhale = document.getElementById('maxWhale').value;
  /* 5.3. ...Validar input form...*/
  if(nExtra.whale === 1){

      if ($maxWhale=== ''){
        document.getElementById('maxWhale-error-msg').innerHTML = "Please insert maximum amount"}
        else if(isNaN($maxWhale)){
        document.getElementById('maxWhale-error-msg').innerHTML = "Numeric Values only"
        } else {
      document.getElementById('maxWhale-error-msg').innerHTML = '';
      slidePage.style.marginLeft = "-75%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
    } 
  } else {
      document.getElementById('maxWhale-error-msg').innerHTML = '';
      slidePage.style.marginLeft = "-75%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
  }
});

/*
nextBtnFourth.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
*/

/*
submitBtn.addEventListener("click", function(){
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function(){
    alert("Your Form Successfully Signed up");
    location.reload();
  },800);
});  */

prevBtnSec.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
