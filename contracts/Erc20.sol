// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./access-control/Owned.sol";

contract Erc20 is Owned {
    uint256 private _totalSupply;
    string public _name;
    string public _symbol;
    uint8 public _decimals = 18;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowed;

    event Transfer(address indexed _from, address indexed _to, uint256 tokens);
    event Approval(
        address indexed _tokenOwner,
        address indexed _spender,
        uint256 tokens
    );
    event Burn(address indexed _from, uint256 value);

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public {
        _name = name;
        _symbol = symbol;
        _totalSupply = initialSupply * 10**uint256(_decimals);
        _balances[msg.sender] = _totalSupply;
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _value
    ) internal {
        require(_to != address(0), "Cannot transfer to empty address");
        require(
            _balances[_from] >= _value,
            "Should have enough funds to transfer"
        );
        require(_balances[_to] + _value >= _balances[_to], "");

        _balances[_from] -= _value;
        _balances[_to] += _value;

        emit Transfer(_from, _to, _value);
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        _transfer(msg.sender, _to, _value);

        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(
            _value <= _allowed[_from][msg.sender],
            "Should have enough allowed money to transfer"
        );

        _allowed[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        _allowed[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function mintToken(address target, uint256 mintedAmount) public onlyOwner {
        _balances[target] += mintedAmount;
        _totalSupply += mintedAmount;

        emit Transfer(address(0), _owner, mintedAmount);
        emit Transfer(_owner, target, mintedAmount);
    }

    function burn(uint256 value) public onlyOwner returns (bool success) {
        require(
            _balances[msg.sender] >= value,
            "Should have enough balance to burn"
        );

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        emit Burn(msg.sender, value);
        return true;
    }
}
