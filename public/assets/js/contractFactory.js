/*INDEX

    /**  ---- 0.Initializing ---- **/
        /*0.1 ...Initializing Moralis Server...*/
        /*0.2 ...Provider... */
        /*0.3 ...Variable Declaration... */
        /*0.4 ...Chain menu function... */
        /*0.5 Snackbar function*/
    /**---- 1. MORALIS LOGIN ---- **/
        /*1.1 ...Current Chain f(x)... */
            /*1.1.1 Colors Network Buttons*/
        /*1.2 ...LOGIN... */
        /*1.3 ...LOGOUT...*/ 
    /** ----2.CHOOSE NETWORK---- **/
        /*2.1 ...Lista chains...*/ 
        /*2.2 ...Choose testnet or mainnet... */
        /*2.3 ...Switch network function...*/
    /**  ---- 3.CHOOSE CONTRACT ---- **/   
        /*3.1 ...Declarar el form... */ 
        /*3.2 ...Declarar los parametros del contrato... */
        /*3.3. ...Validar input form...*/
        /*3.4 ... Deploy Contract...*/
        /*3.5 ...Transaction Hash Message...*/
        /*3.6 ...Contract Address Message...*/
/*
COSAS PENDIENTES JS:

            - Meter mas smart-contracts
            - Añadir opción comprar cryptos (onramp)
            - Otras wallets(Trustwallet)

			USANDO ahora mismo wevelop-web.sol (con abi y bytecode de remix: import dentro de remix seleccionar el contrato en concreto)
			 --> al meter value, precio muy alto. Da igual si como variable o como valor fijo.
			 --> con value precio en eth 800$(da igual variable o fijo), sin el 70$
			 --> en remix poniendo value alto el contrato no pasa de 100$: culpa del js
			 -->

			RESTO SOL:
			--> contract factory+eattheblocks = pruebas con extra
			--> wevelop.sol + v1.5.sol = tienen ya extras metidos pero dan errores: "{"code": -32000,"message": "execution reverted"}"
			--> creo que v1.5.sol es la ult versión, pero no debería dar ese error, funciono el dia antes de comer en casa adri
            
  */ 

/*Provider*/

const web3 = new Web3(window.ethereum); 

    /*0.3 ...Variable Declaration... */

//Bool Chain Variables
var isMumbai, 
    isBsctest,
    isGoerli,
    isPolygon,
    isBscmain,
    isEthmain;

//Form declaration
const $assetForm = document.getElementById('asset-form');

//Bytecode and ABi --> wevelop contract
/*const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "decimals_",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "totalSupply_",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "target_",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_generator",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
*/
/*const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "decimals_",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "totalSupply_",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "target_",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_generator",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];*/

//ABI contract factory
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "decimals",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "supply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenType",
				"type": "uint256"
			}
		],
		"name": "deployPaidBNB",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			}
		],
		"name": "updateDeployPriceBNB",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "account",
				"type": "address"
			}
		],
		"name": "withdrawBNB",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "getDeployPriceBNB",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

//value variables

let cryptoAmountNum;
let currentPrice;
let crypto2;
//User variables
let user; 
let address; //user address
let access = false; 
let chainId;
let chainIdname;
let ethers_instance;
let networkBtnId;
let isMainnet = false;
let feeReceiver_ =  '0xa08507A54C972998a8601D7b67c6bf23236F1212'; //address where the value will be sent 
                        //0x883DAef3D5797A5dfA6Cada663fA4dba67A52390
let $prompt;
var $snackbar = document.getElementById("snackbar");
/*
var $currentChainText = document.getElementById("currentChainText");
var $loginText =  document.getElementById("loginText"); */

 /*0.4 ...Chain menu function... */
function chainMenu(isMainnet){
    console.log(isMainnet);
    if (!isMainnet) {
        toggleText.innerHTML ='Mainnets';
        document.getElementById('btn-mumbai').style.display = "none";
        document.getElementById('btn-bscTest').style.display = "none";
        document.getElementById('btn-goerli').style.display = "none";
        document.getElementById('btn-polygon').style.display = "block";
        document.getElementById('btn-bscMain').style.display = "block";
        document.getElementById('btn-eth').style.display = "block";
    } else {
        toggleText.innerHTML ='Testnets';
        document.getElementById('btn-mumbai').style.display = "block";
        document.getElementById('btn-bscTest').style.display = "block";
        document.getElementById('btn-goerli').style.display = "block";
        document.getElementById('btn-polygon').style.display = "none";
        document.getElementById('btn-bscMain').style.display = "none";
        document.getElementById('btn-eth').style.display = "none";
    }
}

/*0.5 Snackbar function*/
function snackbar($prompt){

    $snackbar.innerHTML = (`${$prompt}`);
    // Add the "show" class to DIV
      $snackbar.className = "show";
  
    // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ $snackbar.className = $snackbar.className.replace("show", ""); }, 3000);
      var barColor = $('.barColor');
      return $prompt = '';}  //barColor.css('color','white')
/*0.5 Snackbar function ends*/

/*0.6 CurrentChainText function*/


/* ----1. MORALIS LOGIN---- */    

/* 1.1 ...Current Chain f(x)... */
async function currentChain(chainId2,networkBtnId,isMainnet,value){ //tarda unos 2segs en cargar, meter un loading o algo asi??
    //currentChainText.innerHTML = `Current chain: LOADING EMOJI'; ???

if (chainId2 === 80001){
chainIdname = 'Mumbai (Polygon Testnet)';
networkBtnId = 'btn-mumbai';
isMumbai = true;
isMainnet = false;
value='0';
} else if (chainId2 === 97){
chainIdname = 'BSC (Testnet)';
isBsctest = true;
networkBtnId = 'btn-bscTest';
isMainnet = false;
value='0';
} else if (chainId2 === 5){
chainIdname = 'Goerli (ETH Testnet)';
isGoerli = true;
networkBtnId = 'btn-goerli';
isMainnet = false;
value='0';
} else if (chainId2 === 137){
chainIdname = 'Polygon Mainnet';
isPolygon = true;
networkBtnId = 'btn-polygon';
isMainnet = true;
//getPrice('matic');

} else if (chainId2 === 56){
chainIdname = 'BSC Mainnet';
isBscmain = true;
networkBtnId = 'btn-bscMain';
isMainnet = true;
//getPrice('bnb');
} else if (chainId2 === 1){
chainIdname = 'ETH Mainnet';
isEthmain = true;
networkBtnId = 'btn-eth';
isMainnet = true;
//getPrice('eth');
}
//$currentChainText.className = "show";
//currentChainText.innerHTML = `Current chain: ${chainIdname}`; //añadir logo chain
console.log(networkBtnId);
const property = document.getElementById(networkBtnId);
property.style.backgroundColor = "#427AA1 ";
property.style.color = "white";
return networkBtnId, isMainnet,value;
}
/*1.1.1 Colors Network Buttons*/
var links = $('.networkButtons');
links.click(function() {
links.css('background-color', 'white');
$(this).css('background-color', 'grey');
links.css('color', 'black');
});

/*Variables DOM*/
const connectButton = document.getElementById('btn-login-menu');
const connectButton2 = document.getElementById('btn-login');
const contactUs =  document.getElementById('contact-us');


/* LOGIN */
let userAdress;

[connectButton,connectButton2].forEach(async(element) => {
	element.addEventListener('click', async (e) => {
		await window.ethereum.enable();
		const accounts = await web3.eth.getAccounts();
		userAddress = accounts[0];
		const displayedAddress = userAddress.substring(0, 5).toLowerCase() + "....." + userAddress.substring(userAddress.length - 4).toLowerCase();
		connectButton.style.textTransform = "lowercase";
		connectButton2.style.textTransform = "lowercase";
		access = 'true';
		// ACCESS BOOL
		console.log(userAddress)
		if (access === 'true'){ 
		  document.getElementById("btn-login-menu").innerHTML = displayedAddress;
		 // document.getElementById('profile-pic').style.display = "block";
		  document.getElementById("btn-login-menu").style.color = "#39FF14";
		  document.getElementById("btn-login").innerHTML = displayedAddress;
		  chainId2 = await web3.eth.getChainId();
		  currentChain(chainId2);
		  console.log(chainId2);
		  console.log('hola');
		} 
		return userAddress, access;
})
})


    /** ----2.CHOOSE NETWORK---- */

/*2.1 ...Choose testnet o mainnet... */

document.getElementById('btn-polygon').style.display = "none";
document.getElementById('btn-bscMain').style.display = "none";
document.getElementById('btn-eth').style.display = "none"; 

var allBtns = document.querySelectorAll('.btn-holder');
for (i = 0; i < allBtns.length; i++) {
    var btn = allBtns[i];
    btn.addEventListener('click', function () {
        console.log(isMainnet);
        var allNodes = btn.children;
        // find all childern and check them for add class and change checkbox state
        for (j = 0; j < allNodes.length; j++) {
            var node = allNodes[j];
            // check for btn circle and change it's css class
            if (node.classList.contains('btn-circle')) {
                if (!node.classList.contains('active')) {
                //if (!isMainnet) {
                    node.classList.add('active');
                    //isMainnet = true;
                    toggleText.innerHTML ='Mainnets';
                    document.getElementById('btn-mumbai').style.display = "none";
                    document.getElementById('btn-bscTest').style.display = "none";
                    document.getElementById('btn-goerli').style.display = "none";
                    document.getElementById('btn-polygon').style.display = "block";
                    document.getElementById('btn-bscMain').style.display = "block";
                    document.getElementById('btn-eth').style.display = "block";
                } else {
                    node.classList.remove('active');
                    //isMainnet = false;
                    toggleText.innerHTML ='Testnets';
                    document.getElementById('btn-mumbai').style.display = "block";
                    document.getElementById('btn-bscTest').style.display = "block";
                    document.getElementById('btn-goerli').style.display = "block";
                    document.getElementById('btn-polygon').style.display = "none";
                    document.getElementById('btn-bscMain').style.display = "none";
                    document.getElementById('btn-eth').style.display = "none";
                }
            }
            // check for check box and change it's state
            if (node.classList.contains('checkbox')) {
                if (isMainnet) {
                    node.checked = true;
                } else {
                    node.checked = false;
                }
            }
        }
    })
} 
/*2.1 Choose testnet o mainnet ends */



/*2.2 ...Lista chains...*/ 
    /* ISSUES:
              -mumbai me va un poco lento , ver si cambiar rpc */
const networks = {
  mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Matic Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },                                                //INFURA:
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"], //https://polygon-mainnet.infura.io/v3/2Bps1j7yCHBWlSZzdWw0pXvwi6L
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"] 
  },
  bsctest: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "Smart Chain-Testnet",
    nativeCurrency: {
      name: "Binance Testnet Coin",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    ],
    blockExplorerUrls: ["https://testnet.bscscan.com"]
  },
  goerli: {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: "Goerli Test Network",
    nativeCurrency: {
      name: "GoerliETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: [
      "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ],
    blockExplorerUrls: ["https://goerli.etherscan.io"]
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Matic Mainnet",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: [
      "https://polygon-rpc.com"
    ],
    blockExplorerUrls: ["https://explorer.matic.network/"]
  },
  bscmain: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed.binance.org/"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  },
  ethmain: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: [
      "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    ],
    blockExplorerUrls: ["https://etherscan.io"]
  }
};
/*2.2 Lista chains ends*/

/*2.3 ...Switch network function...*/
async function switchNetwork(element, networkName) {
    let error = false;
    statusText.innerHTML ='';
    totalSupply.innerHTML = '';
    //currentChainText.innerHTML = '';
    if (access === false){
        $prompt = 'Please connect wallet to use the app';
        snackbar($prompt);
    } else {
        try {
            await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId: networks[networkName]["chainId"]}], 
            })    
            //por fin funciona!! PROBLEMA=>> la fx chain getchainID tarda tiempo en cargar (+ rapida con goerli y mas lenta con mumbai)
     } catch (error) {
            if (error.code === 4902) { /*si la chain no añadida*/
            try {
                await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                    ...networks[networkName] /*los tres puntos son para pegar el elemento del object entero con sus keys y values*/
                    },
                ],
                });
            } catch (error) {
                alert(error.message);
            }
         } else if(error.code === 4001) {
            $prompt = 'User denied transaction';
            snackbar($prompt); 
            /*El color de los botones vuelve a su estado*/
             var links = $('.networkButtons');
            links.css('background-color', 'white');
            error = true; 
        }
        else {
            console.log(error);
            error = true;
        }
  } 

  if (error === false) {
    chainId2 = await web3.eth.getChainId();
    currentChain(chainId2);
    }
}}
  /*2.3 Switch network function ends*/

/*3. Add extra function */
document.getElementById('extraMarkA').style.display = "none";
document.getElementById('extraMarkF').style.display = "none";
document.getElementById('extraTreasA').style.display = "none";
document.getElementById('extraTreasF').style.display = "none";
document.getElementById('extraLiqA').style.display = "none";
document.getElementById('extraLiqF').style.display = "none";

var nExtra = 0;
function addExtra(type,displayA,displayF) {
	// Get the checkbox
	var checkBox = document.getElementById(type);
	// If the checkbox is checked, display the output text
	
	if (checkBox.checked == true){
		nExtra += 1;
		document.getElementById(displayA).style.display = "block";
		document.getElementById(displayF).style.display = "block";
	} else {
		nExtra -= 1;
		document.getElementById(displayA).style.display = "none";
		document.getElementById(displayF).style.display = "none";
	}
	return nExtra;
}
let dollars = 50;
function dollarAmount(nExtra){
	if (nExtra ===0){
		dollars = 50;
	} else if (nExtra ===1){
		dollars = 75;
	} else if (nExtra ===2){
		dollars = 100;
	} else if (nExtra ===3){
		dollars = 125;
	} else{
		console.log('An error occured when selecting the extras');
	}
	return dollars;
}
/*4. --- Real time crypto value --- */
//Hacer una fx que sirva para todas las chain, cambiando params, segun  chainID*/

/*
function getPrice(crypto) {
  let endpoint;
  let params;
  dollarAmount(nExtra);
  // Define the endpoint and parameters for different crypto
  switch(crypto.toUpperCase()) {
    case 'ETH':
      endpoint = 'https://min-api.cryptocompare.com/data/price';
      params = { fsym: 'ETH', tsyms: 'USD' };
      break;
    case 'MATIC':
      endpoint = 'https://min-api.cryptocompare.com/data/price';
      params = { fsym: 'MATIC', tsyms: 'USD' };
      break;
	case 'BNB':
		endpoint = 'https://min-api.cryptocompare.com/data/price';
		params = { fsym: 'BNB', tsyms: 'USD' };
		break;
    default:
      console.log(`Invalid crypto symbol ${crypto}. Please use 'ETH' or 'MATIC'.`);
      return;
  }
  // Make the GET request
  axios.get(endpoint, { params })
    .then(response => {
      // Extract the current price
      switch(crypto.toUpperCase()) {
        case 'ETH':
          currentPrice = response.data.USD;
          break;
        case 'MATIC':
          currentPrice = response.data.USD;
          break;
		case 'BNB':
			currentPrice = response.data.USD;
			break;
      }

	 // Calculate the number of crypto that is equal to $
	 cryptoAmountNum = 50 / currentPrice;
	 cryptoAmount= cryptoAmountNum.toString();
	 console.log(cryptoAmount);
	 // Print the result
	 console.log(`${cryptoAmount} ${crypto} is equal to $${dollars} at a price of $${currentPrice} per ${crypto}`);
   })
   .catch(error => {
	 console.log(error);
   });
   return cryptoAmount
} */


let cryptoAmount;
function getPrice(crypto) {
			let endpoint;
			let params;
			// Define the endpoint and parameters for different crypto
			switch(crypto.toUpperCase()) {
				case 'ETH':
				endpoint = 'https://min-api.cryptocompare.com/data/price';
				params = { fsym: 'ETH', tsyms: 'USD' };
				break;
				case 'MATIC':
				endpoint = 'https://min-api.cryptocompare.com/data/price';
				params = { fsym: 'MATIC', tsyms: 'USD' };
				break;
				case 'BNB':
					endpoint = 'https://min-api.cryptocompare.com/data/price';
					params = { fsym: 'BNB', tsyms: 'USD' };
					break;
				default:
				console.log(`Invalid crypto symbol ${crypto}. Please use 'ETH' or 'MATIC'.`);
				return;
			}

			// Make the GET request
			axios.get(endpoint, { params })
				.then(response => {
				// Extract the current price
				dollarAmount(nExtra);
				let currentPrice;
				switch(crypto.toUpperCase()) {
					case 'ETH':
					currentPrice = response.data.USD;
					break;
					case 'MATIC':
					currentPrice = response.data.USD;
					break;
					case 'BNB':
						currentPrice = response.data.USD;
						break;
				}
				// Calculate the number of crypto that is equal to $50
				cryptoAmountNum = dollars / currentPrice;
				cryptoAmount1= cryptoAmountNum.toString();
				cryptoAmount = web3.utils.toWei(cryptoAmount1)
				console.log(cryptoAmount);
				// Print the result
				console.log(`${cryptoAmount} ${crypto} is equal to ${dollars} at a price of $${currentPrice} per ${crypto}`);
				})
				.catch(error => {
				console.log(error);
				});
				return cryptoAmount
            }

let value2;
/*
async function setValue(chainId2,cryptoamount){
    //1,2,3 -> free (mumbai,bsctest,goerli)
    //4,5,6 -> $$ (polygon,bscmain,eth  )
	setTimeout(() => { getPrice('matic');}, 6000)

    setTimeout(() => {
			value2 = (chainId2 === 80001) ? web3.utils.toWei('0') : (chainId2 === 97) ? web3.utils.toWei('0') : (chainId2 === 5) ? web3.utils.toWei('0') : 
			(chainId2 === 137) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 56) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 1) ? web3.utils.toWei(cryptoAmount) : 'other';
			console.log('hola');
			console.log(value2);
			return value2;  
		}, 8000)
} */
async function setValue() {
	if (chainId2===137){
		let cryptoAmount = await getPrice('matic');
	}else if(chainId2===56){
		let cryptoAmount = await getPrice('bnb');
	} else if (chainId2===1){
		let cryptoAmount = await getPrice('eth');
	} else if (chainId2 === 80001){
		let cryptoAmount = await getPrice('matic');//web3.utils.toWei('0') 
	}else if (chainId2 === 97){
		let cryptoAmount = web3.utils.toWei('0');
	}else if (chainId2 === 5){
		let cryptoAmount = web3.utils.toWei('0'); //await getPrice('eth');//
	}else{console.log('Error, not in the right chain')}

}
	  /*
	  setTimeout(() => {value2 = (chainId2 === 80001) ? web3.utils.toWei('0') : (chainId2 === 97) ? web3.utils.toWei('0') : (chainId2 === 5) ? web3.utils.toWei('0') : 
			(chainId2 === 137) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 56) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 1) ? web3.utils.toWei(cryptoAmount) : 'other';
			console.log('hola');
			console.log(value2);
			return value2;  },2000)*/



 
/*4.2 --- Set value according to chain --- */
/*
let value2;
function setValue(chainId2,cryptoamount){
    //1,2,3 -> free (mumbai,bsctest,goerli)
    //4,5,6 -> $$ (polygon,bscmain,eth  )
	//dollarsToCrypto(currentPrice, dollars);
	
		//if (chainId2 === 137){
			getPrice('matic')
		setTimeout(() => {
			value2 = (chainId2 === 80001) ? web3.utils.toWei('0') : (chainId2 === 97) ? web3.utils.toWei('0') : (chainId2 === 5) ? web3.utils.toWei('0') : 
			(chainId2 === 137) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 56) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 1) ? web3.utils.toWei(cryptoAmount) : 'other';
			console.log('hola');
			console.log(value2);
			return value2;  
		}, 1000) */


		/*
		} else if(chainId2 === 56){
			getPrice('bnb')
			value2 = (chainId2 === 80001) ? web3.utils.toWei('0') : (chainId2 === 97) ? web3.utils.toWei('0') : (chainId2 === 5) ? web3.utils.toWei('0') : 
			(chainId2 === 137) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 56) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 1) ? web3.utils.toWei(cryptoAmount) : 'other';
			console.log(value2);
			return value2; 
		} else if(chainId2 === 1){
			getPrice('eth')
			value2 = (chainId2 === 80001) ? web3.utils.toWei('0') : (chainId2 === 97) ? web3.utils.toWei('0') : (chainId2 === 5) ? web3.utils.toWei('0') : 
			(chainId2 === 137) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 56) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 1) ? web3.utils.toWei(cryptoAmount) : 'other';
			console.log(value2);
			return value2; 
		} else {
			value2=0;
		}
	  */
	
   //     }
	/*
	} else if (nExtra === 1) {
		value2 = (chainId2 === 80001) ? web3.utils.toWei('0') : (chainId2 === 97) ? web3.utils.toWei('0') : (chainId2 === 5) ? web3.utils.toWei('0') : 
    (chainId2 === 137) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 56) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 1) ? web3.utils.toWei(cryptoAmount) : 'other';
    console.log(value2);
    return value2; 
		
	}else if(nExtra === 2){
		value2 = (chainId2 === 80001) ? web3.utils.toWei('0') : (chainId2 === 97) ? web3.utils.toWei('0') : (chainId2 === 5) ? web3.utils.toWei('0') : 
		(chainId2 === 137) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 56) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 1) ? web3.utils.toWei(cryptoAmount) : 'other';
		console.log(value2);
		return value2; 
		
	}else if (nExtra === 3){
	value2 = (chainId2 === 80001) ? web3.utils.toWei('0') : (chainId2 === 97) ? web3.utils.toWei('0') : (chainId2 === 5) ? web3.utils.toWei('0') : 
    (chainId2 === 137) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 56) ? web3.utils.toWei(cryptoAmount) : (chainId2 === 1) ? web3.utils.toWei(cryptoAmount) : 'other';
    console.log(value2);
    return value2; 
		} */
		


/* ----5. CONTRACT---- */  


  /*5.1 ...Declarar el form... */ 

$assetForm.addEventListener("submit", async function (e,value) { 
  //prevent the form from actually submitting.
  e.preventDefault();
  //clean text
  statusText.innerHTML ='';
  totalSupply.innerHTML = '';
  document.getElementById('decimals-error-msg').innerHTML = '';
  document.getElementById('numberTokens-error-msg').innerHTML = '';
  document.getElementById('symbol-error-msg').innerHTML = '';
  document.getElementById('name-error-msg').innerHTML = '';
  if (access === false){
   $prompt = 'Please connect wallet to use the app';
   snackbar($prompt);
} else { 
  /* 5.2 ...Declarar los parametros del contrato... */

        let $numberTokens = document.getElementById('numberTokens').value; 
        let $name_ = document.getElementById('name').value;
        let $decimalUnits = document.getElementById('decimals').value;
        let $symbol_ = document.getElementById('symbol').value;
        let $initialSupply_= BigInt($numberTokens*Math.pow(10, document.getElementById('decimals').value));
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
            document.getElementById('decimals-error-msg').innerHTML = "Please insert numeric values only"
        }else if (isNaN($numberTokens)) {
            document.getElementById('numberTokens-error-msg').innerHTML = "Please insert numeric values only"
        } else {
  /*5.4 ...Deploy Contract...*/
			/*contactUs.style.marginTop = "50px";*/
            statusText.innerHTML = 'Waiting for contract to be deployed...';
			totalSupply.innerHTML = (`${$initialSupply_}`);
			const from = '0x2c33B91Bf6B2Fe009EcB132269013F007E9C72C7';
			const tokenType = '3';
            await setValue(chainId2);
			
			console.log(cryptoAmount);
			var standardtokenContract;
			var price;
			async function createInstance(){
			 standardtokenContract = new web3.eth.Contract(abi,'0x2c33B91Bf6B2Fe009EcB132269013F007E9C72C7');
				console.log(standardtokenContract);
				return standardtokenContract;
			}
			async function createPrice(){
				price =  standardtokenContract.methods.getDeployPriceBNB();
				console.log(price);
				return price;
			}
			async function createContract(){
				standardtokenContract.methods.deployPaidBNB($name_,
					$symbol_,
					$decimalUnits,
					$initialSupply_,
					tokenType,)
					.send({
						from: userAddress,})
						//value: web3.utils.toWei('0'), // cryptoAmount, //web3.utils.toWei('3', 'ether'), //web3.utils.toHex(web3.utils.toWei('1')) //cryptoAmount,
			}
			await createInstance();
			
			await createPrice();
		
			await createContract();
		
	}}})
            
			
		












/*----GETBalance----*/
/*
function getBalance(address) { //enseña en wei el balance, aunq parece q n vd es al rreves y lo transforma de wei a normal
    return sendSync({ method: 'eth_getBalance', params: [address] })
        .then(function (result) {
            return web3.utils.fromWei(result['result']);
        })
        .fail(function (err) {
            return err;
        })
}
*/
/* 3.4. ...Validar input form../
function numberValidation(e, id,numberBoolean) {
    if (numberBoolean === 'false'){return numberBoolean;}
    else{
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            document.getElementById(id).innerHTML = "Please enter Numeric values only";
            console.log(numberBoolean);
            numberBoolean = false;
            console.log(numberBoolean);
            return numberBoolean;
        } else{
            document.getElementById(id).innerHTML = ''
            return numberBoolean;
        }
    }
}
let numberBoolean = true;
//Decimals
document.getElementById('decimals').addEventListener('keyup',function (e) {
  numberValidation(e,"decimals-error-msg",numberBoolean);
});
//Total Supply
document.getElementById('numberTokens').addEventListener('keyup',function (e) {
    numberValidation(e,'numberTokens-error-msg',numberBoolean);
}); 
*/
/*
<p>
<button id="number-tokens" onclick="numberTokens(this,decimals,total-supply)">Get number of tokens</button>
<div id="number-tokensText"></div>
</p>

*/ 

/* ----4.1 PARAMS FIRST CONTRACT---- */
 
 //COBRAR con Moralis SDK
                    /*
                    const transactionData = {
                        type: "native",
                        amount: Moralis.Units.ETH("0.00001"),
                        receiver: "0x883DAef3D5797A5dfA6Cada663fA4dba67A52390",
                    };
                    let result = await Moralis.transfer(transactionData);
                    /*PROBLEMA==>> salen como 20 transacciones para firmar en metamask
                            ==>> ahora mismo te pide firmar desps del deploy del contrato
                            , puedes elegir rechazar tx y sale gratis
                    SOLUCION==>> meterlo en el contrato, que a la vez que se crea el token nos mande eth/matic/bnb a una address fija (to address)
                            ==>> pra esto añadir parametro extra al contrato: user address (from address)
                    */