// SPDX-License-Identifier: MTI
pragma solidity ^0.8.0;

contract Transactions {
  uint txCount;
  address owner;

  event Transfer(address _from, address _to, uint _amount, string _msg, uint _timestamp, string _keyword);

  struct TransferStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint timestamp;
    string keyword;
  }

  constructor() {
    owner = msg.sender;
  }
  
  modifier onlyOwner {
    require(msg.sender == owner, "not an owner!!!");
    _;
  }

  TransferStruct[] public transactions;

  function addToBlockchain(address payable _receiver, uint _amount, string memory _message, string memory _keyword) public onlyOwner {
    txCount++;
    transactions.push(TransferStruct({
      sender: msg.sender,
      receiver: _receiver,
      amount: _amount,
      message: _message,
      timestamp: block.timestamp,
      keyword: _keyword
    }));

    emit Transfer(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword);
  }

  function getAllTransactions() public view returns(TransferStruct[] memory) {
    return transactions;
  }

  function getAllTransactionCount() public view returns(uint) {
    return txCount;
  }
}