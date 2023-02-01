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
const abi = [
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

const bytecode =
    '60806040526040516200123a3803806200123a833981810160405260a08110156200002957600080fd5b81019080805160405193929190846401000000008211156200004a57600080fd5b9083019060208201858111156200006057600080fd5b82516401000000008111828201881017156200007b57600080fd5b82525081516020918201929091019080838360005b83811015620000aa57818101518382015260200162000090565b50505050905090810190601f168015620000d85780820380516001836020036101000a031916815260200191505b5060405260200180516040519392919084640100000000821115620000fc57600080fd5b9083019060208201858111156200011257600080fd5b82516401000000008111828201881017156200012d57600080fd5b82525081516020918201929091019080838360005b838110156200015c57818101518382015260200162000142565b50505050905090810190601f1680156200018a5780820380516001836020036101000a031916815260200191505b5060409081526020820151908201516060909201519093509091506000620001ba6001600160e01b03620002ec16565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350845162000219906006906020880190620002f1565b5083516200022f906005906020870190620002f1565b506004805460ff191660ff85161790556003829055600780546001600160a01b0319166001600160a01b038316179055336000818152600160209081526040808320869055805186815290517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a36007546040516001600160a01b03909116903480156108fc02916000818181858888f19350505050158015620002e0573d6000803e3d6000fd5b50505050505062000393565b335b90565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200033457805160ff191683800117855562000364565b8280016001018555821562000364579182015b828111156200036457825182559160200191906001019062000347565b506200037292915062000376565b5090565b620002ee91905b808211156200037257600081556001016200037d565b610e9780620003a36000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80638060156b116100a2578063a0712d6811610071578063a0712d68146102d3578063a457c2d7146102f0578063a9059cbb1461031c578063dd62ed3e14610348578063f2fde38b146103765761010b565b80638060156b14610297578063893d20e81461029f5780638da5cb5b146102c357806395d89b41146102cb5761010b565b8063313ce567116100de578063313ce5671461021d578063395093511461023b57806370a0823114610267578063715018a61461028d5761010b565b806306fdde0314610110578063095ea7b31461018d57806318160ddd146101cd57806323b872dd146101e7575b600080fd5b61011861039c565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561015257818101518382015260200161013a565b50505050905090810190601f16801561017f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101b9600480360360408110156101a357600080fd5b506001600160a01b038135169060200135610432565b604080519115158252519081900360200190f35b6101d561044f565b60408051918252519081900360200190f35b6101b9600480360360608110156101fd57600080fd5b506001600160a01b03813581169160208101359091169060400135610455565b6102256104e2565b6040805160ff9092168252519081900360200190f35b6101b96004803603604081101561025157600080fd5b506001600160a01b0381351690602001356104eb565b6101d56004803603602081101561027d57600080fd5b50356001600160a01b031661053f565b61029561055a565b005b61011861060e565b6102a761063c565b604080516001600160a01b039092168252519081900360200190f35b6102a761064b565b61011861065a565b6101b9600480360360208110156102e957600080fd5b50356106bb565b6101b96004803603604081101561030657600080fd5b506001600160a01b038135169060200135610740565b6101b96004803603604081101561033257600080fd5b506001600160a01b0381351690602001356107ae565b6101d56004803603604081101561035e57600080fd5b506001600160a01b03813581169160200135166107c2565b6102956004803603602081101561038c57600080fd5b50356001600160a01b03166107ed565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104285780601f106103fd57610100808354040283529160200191610428565b820191906000526020600020905b81548152906001019060200180831161040b57829003601f168201915b5050505050905090565b600061044661043f610863565b8484610867565b50600192915050565b60035490565b6000610462848484610953565b6104d88461046e610863565b6104d385604051806060016040528060288152602001610dcd602891396001600160a01b038a166000908152600260205260408120906104ac610863565b6001600160a01b03168152602081019190915260400160002054919063ffffffff610ab116565b610867565b5060019392505050565b60045460ff1690565b60006104466104f8610863565b846104d38560026000610509610863565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610b4816565b6001600160a01b031660009081526001602052604090205490565b610562610863565b6000546001600160a01b039081169116146105c4576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6040518060400160405280601281526020017168747470733a2f2f776576656c6f702e696f60701b81525081565b600061064661064b565b905090565b6000546001600160a01b031690565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104285780601f106103fd57610100808354040283529160200191610428565b60006106c5610863565b6000546001600160a01b03908116911614610727576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b610738610732610863565b83610ba9565b506001919050565b600061044661074d610863565b846104d385604051806060016040528060258152602001610e3e6025913960026000610777610863565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610ab116565b60006104466107bb610863565b8484610953565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b6107f5610863565b6000546001600160a01b03908116911614610857576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61086081610c9b565b50565b3390565b6001600160a01b0383166108ac5760405162461bcd60e51b8152600401808060200182810382526024815260200180610e1a6024913960400191505060405180910390fd5b6001600160a01b0382166108f15760405162461bcd60e51b8152600401808060200182810382526022815260200180610d856022913960400191505060405180910390fd5b6001600160a01b03808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0383166109985760405162461bcd60e51b8152600401808060200182810382526025815260200180610df56025913960400191505060405180910390fd5b6001600160a01b0382166109dd5760405162461bcd60e51b8152600401808060200182810382526023815260200180610d3c6023913960400191505060405180910390fd5b610a2081604051806060016040528060268152602001610da7602691396001600160a01b038616600090815260016020526040902054919063ffffffff610ab116565b6001600160a01b038085166000908152600160205260408082209390935590841681522054610a55908263ffffffff610b4816565b6001600160a01b0380841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008184841115610b405760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b05578181015183820152602001610aed565b50505050905090810190601f168015610b325780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610ba2576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b038216610c04576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b600354610c17908263ffffffff610b4816565b6003556001600160a01b038216600090815260016020526040902054610c43908263ffffffff610b4816565b6001600160a01b03831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b038116610ce05760405162461bcd60e51b8152600401808060200182810382526026815260200180610d5f6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b039290921691909117905556fe45524332303a207472616e7366657220746f20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa265627a7a723158200106cb5f966587342056a753b1a3e2e8d6545fe4547980fb317c4400e7d6baa764736f6c63430005100032';

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
value = '119.44';
} else if (chainId2 === 96){
chainIdname = 'BSC Mainnet';
isBscmain = true;
networkBtnId = 'btn-bscMain';
isMainnet = true;
value = '0.37';
} else if (chainId2 === 1){
chainIdname = 'ETH Mainnet';
isEthmain = true;
networkBtnId = 'btn-eth';
isMainnet = true;
value = '0.00074';
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
	contactUs.style.marginTop = "120px";
	document.getElementById('intento').innerHTML= '';
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

/*3. --- Set value according to chain --- */

let value2;
function setValue(chainId2){
    //1,2,3 -> free (mumbai,bsctest,goerli)
    //4,5,6 -> $$ (polygon,bscmain,eth  )
    value2 = (chainId2 === 80001) ? web3.utils.toWei('0') : (chainId2 === 97) ? web3.utils.toWei('0') : (chainId2 === 5) ? web3.utils.toWei('0') : 
    (chainId2 === 137) ? web3.utils.toWei('119.44') : (chainId2 === 56) ? web3.utils.toWei('0.0037') : (chainId2 === 1) ? web3.utils.toWei('0.00074') : 'other';
    console.log(value2);
    return value2;
}


/* ----4. CONTRACT---- */  


  /*4.1 ...Declarar el form... */ 

$assetForm.addEventListener("submit", async function (e,value) { 
  //prevent the form from actually submitting.
  e.preventDefault();
  //clean text
  contactUs.style.marginTop = "120px";
  document.getElementById('intento').innerHTML = '';
  statusText.innerHTML ='';
  totalSupply.innerHTML = '';
  buyTokens.innerHTML = '';
  document.getElementById('decimals-error-msg').innerHTML = '';
  document.getElementById('numberTokens-error-msg').innerHTML = '';
  document.getElementById('symbol-error-msg').innerHTML = '';
  document.getElementById('name-error-msg').innerHTML = '';
  if (access === false){
   $prompt = 'Please connect wallet to use the app';
   snackbar($prompt);
} else { 
  /* 4.2 ...Declarar los parametros del contrato... */

        let $numberTokens = document.getElementById('numberTokens').value; 
        let $name_ = document.getElementById('name').value;
        let $decimalUnits = document.getElementById('decimals').value;
        let $symbol_ = document.getElementById('symbol').value;
        let $initialSupply_= BigInt($numberTokens*Math.pow(10, document.getElementById('decimals').value));
  /* 4.3. ...Validar input form...*/
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
  /*4.4 ...Deploy Contract...*/
			contactUs.style.marginTop = "50px";
			document.getElementById('intento').innerHTML = "Transaction details";
            buyTokens.innerHTML = ('<span class="chain-emoji">⛓</span> If not enough funds for transaction you can buy them here:');
            statusText.innerHTML = '<span class="chain-emoji">⛓</span> Waiting for contract to be deployed...';
			totalSupply.innerHTML = (`<span class="chain-emoji">⛓</span> Total Supply taking into account decimals: ${$initialSupply_}`);
            setValue(chainId2);
            const standardtokenContract = new web3.eth.Contract(abi);
            standardtokenContract.
                deploy({
                    data: '0x' + bytecode,
                    arguments: [
                        $name_,
                        $symbol_,
                        $decimalUnits,
                        $initialSupply_,
                        feeReceiver_],
                    })
                .send({
                    from: userAddress,
                    value: value2,
    
  /* 4.5 ...Transaction Hash Message...*/ //=>    IMPORTANTE dar soluciones si tarda tiempo en hacerse el deploy (contactarnos o algo asi)
            },function (error, transactionHash) {
                if (error){
                        if(error.code === 4001) {
                            $prompt = 'User denied transaction';
							contactUs.style.marginTop = "120px";
                            document.getElementById("totalSupply").innerHTML = "";
                            document.getElementById("buyTokens").innerHTML = "";
                            document.getElementById("statusText").innerHTML = "";
							document.getElementById('intento').innerHTML= '';
                            snackbar($prompt);
                        } else if(error.code === -32603){
							contactUs.style.marginTop = "50px";
                            statusText.innerHTML ='<span class="chain-emoji">⛓</span> Maximum gas fee limit is too low. Edit Transaction fees limit on Metamask: <a href="https://metamask.zendesk.com/hc/en-us/articles/360022895972" " target="_blank">' + 'Gas Control Guide' + '</a> ';
                        } else {
							contactUs.style.marginTop = "50px";
                            statusText.innerHTML ='<span class="chain-emoji">⛓</span> An error occured, check the console (Windows: Ctrl+Shift+J or Mac: Ctrl+Option+J) for more info and try again. If the error persists, contact us at: support@wevelop.io';
                            console.error(error);
                        }
                        return;}
            console.log('Transaction Hash :', transactionHash); //console
            //Mensajes en frontend mientras se realiza la transaction=> 
            if (isMumbai) { 
                statusText.innerHTML = '<span class="chain-emoji">⛓</span> Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <strong>Transaction hash: </strong> <a class= addressLink href="https://mumbai.polygonscan.com/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
            } else if (isBsctest) {
                statusText.innerHTML = '<span class="chain-emoji">⛓</span> Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <strong>Transaction hash: </strong> <a class= addressLink href="https://testnet.bscscan.com/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
            } else if (isGoerli) {
                statusText.innerHTML = '<span class="chain-emoji">⛓</span> Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <strong>Transaction hash: </strong> <a class= addressLink  href="https://goerli.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
            } else if (isPolygon) {
                statusText.innerHTML = '<span class="chain-emoji">⛓</span> Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <strong>Transaction hash: </strong> <a class= addressLink href="https://polygonscan.com/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
            } else if (isBscmain) {
                statusText.innerHTML = '<span class="chain-emoji">⛓</span> Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <strong>Transaction hash: </strong> <a class= addressLink href="https://bscscan.com/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
            } else if (isEthmain) {
                statusText.innerHTML = '<span class="chain-emoji">⛓</span> Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <strong>Transaction hash: </strong> <a class= addressLink href="https://etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
            } else {
                statusText.innerHTML = '<span class="chain-emoji">⛓</span> Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). Transaction hash: ' + transactionHash
            }
        }).on('confirmation',async function () {
          return; //si se confirma la transaccion return como argumento a la sig fx

  /*4.6 ...Contract Address Message... */
        }).then(function (newContractInstance) { 
            if (!newContractInstance.options.address) { //si no existe el addres muestrame el valor en console
              console.log(newContractInstance);       
              return;
            }
            console.log('Deployed Contract Address : ', newContractInstance.options.address); //mostrar el contract address en console
            var newContractAddress = newContractInstance.options.address;
            //Se muestra el enlace al address segun la chain en web
            if (isMumbai) { 
            statusText.innerHTML = '<span class="chain-emoji">⛓</span>Transaction  mined! Contract address: <a class= addressLink href="https://mumbai.polygonscan.com/address/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isBsctest) {
            statusText.innerHTML = '<span class="chain-emoji">⛓</span>Transaction  mined! Contract address: <a class= addressLink href="https://testnet.bscscan.com/address/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isGoerli) {
            statusText.innerHTML = '<span class="chain-emoji">⛓</span>Transaction  mined! Contract address: <a class= addressLink href="https://goerli.etherscan.io/address/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isPolygon) {
            statusText.innerHTML = '<span class="chain-emoji">⛓</span>Transaction  mined! Contract address: <a class= addressLink  href="https://polygonscan.com/address/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isBscmain) {
            statusText.innerHTML = '<span class="chain-emoji">⛓</span>Transaction  mined! Contract address: <a class= addressLink  href="https://bscscan.com/address/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isEthmain) {
            statusText.innerHTML = '<span class="chain-emoji">⛓</span>Transaction  mined! Contract address: <a class= addressLink href="https://etherscan.io/adress/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else
              statusText.innerHTML = '<span class="chain-emoji">⛓</span>Contract deployed at address <b>' + newContractAddress + '</b> - keep a record of this.'              
      }).catch(function (error) {
          console.error(error);
      })
  }
}
});














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