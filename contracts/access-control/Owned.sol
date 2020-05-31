// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Owned {
    address _owner;

    constructor() public {
        _owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == _owner, "Should be the owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        _owner = newOwner;
    }
}
