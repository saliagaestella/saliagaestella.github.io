$(document).ready(function () {
    const textArray = textString.split("");
    const textElem = $(".hacking-animation__text");
  
    let count = 0;
  
    setInterval(() => {
      if (textArray[count] === "\n") {
        textElem.append("<br>");
      } else {
        textElem.append(
          `<span class="hacking-animation__character">${textArray[count]}</span>`
        );
      }
  
      count++;
      if (count === textArray.length) {
        count = 0;
      }
    }, 20);
  });
  
  var textString = `
░██╗░░░░░░░██╗███████╗██╗░░░██╗███████╗██╗░░░░░░█████╗░██████╗░
░██║░░██╗░░██║██╔════╝██║░░░██║██╔════╝██║░░░░░██╔══██╗██╔══██╗
░╚██╗████╗██╔╝█████╗░░╚██╗░██╔╝█████╗░░██║░░░░░██║░░██║██████╔╝
░░████╔═████║░██╔══╝░░░╚████╔╝░██╔══╝░░██║░░░░░██║░░██║██╔═══╝░
░░╚██╔╝░╚██╔╝░███████╗░░╚██╔╝░░███████╗███████╗╚█████╔╝██║░░░░░
░░░╚═╝░░░╚═╝░░╚══════╝░░░╚═╝░░░╚══════╝╚══════╝░╚════╝░╚═╝░░░░░

  contract ERC20Token is Context, IERC20, Ownable {
    using SafeMath for uint256;
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;
  
    constructor() public {
      _name = "wevelop";
      _symbol = "WE";
      _decimals = 18;
      _totalSupply = 696969 * 10 ** 18;
      _balances[msg.sender] = _totalSupply;
  
      emit Transfer(address(0), msg.sender, _totalSupply);
    }
`;
