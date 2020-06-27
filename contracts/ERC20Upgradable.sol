// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/presets/ERC20PresetMinterPauser.sol";

contract RushCoin is Initializable, ERC20PresetMinterPauserUpgradeSafe {
    function initialize() public initializer {
        ERC20PresetMinterPauserUpgradeSafe.initialize("RushCoin", "RUSH");
    }
}
