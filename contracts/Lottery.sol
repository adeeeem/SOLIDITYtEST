//SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
contract Lottery is Ownable{
    //manager is in charge of the contract 
   
    //new player in the contract using array[] to unlimit number 
    mapping (uint256=> address)public players;
    int256 totalplayers=0;
    uint256 public TicketNo=0;
    uint256 prizePool=0;
    function lottery() public {
        
    }
    
    //to call the enter function we add them to players
    function Ticket_Purchase() public payable{
        //each player is compelled to add a certain ETH to join
        require(msg.value > 100 ,"Amount is less then 0.001ETH");
        totalplayers++;
        TicketNo++;
        players[TicketNo]=msg.sender;
        prizePool+=msg.value;

        
    }
    //creates a random hash that will become our winner
    function Gneraterandom() public view returns(uint){
        uint Size = TicketNo;
    require(Size!=0,"Lottery didnot started yet");

    uint randomIndex = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    randomIndex %= Size;

    return randomIndex;
    }
    function SelectWinner() public onlyOwner{
   
        uint Winner = Gneraterandom() ;
        payable (players[Winner]).transfer(address(this).balance);
        DeletePlayers();
        prizePool=0;
        TicketNo=0;
        totalplayers=0;
        
      
       
    }
  function DeletePlayers() private {
    uint i = 0;
    while (i < TicketNo) {
        delete players[i];
        i++;
    }
}


}