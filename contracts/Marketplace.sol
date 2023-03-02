pragma solidity 0.8.4;

contract Marketplace {

	enum State {
		Purchased,
		Activated,
		Deactivated
	}

	struct Item {
		uint id;
		uint price;
		bytes32 proof; // 0x0000000000000000000000000000313000000000000000000000000000003130 placeholder 
		address owner;
		State state;
	}

	function purchaseItem(bytes16 _itemId, bytes32 _proof) external payable returns(bytes32) {
		// item id - 10
		// 0x00000000000000000000000000003130 hex value so it fits the bytes16 format of the itemId

		// 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 msg.sender
		// 0x00000000000000000000000000031305B38Da6a701c568545dCfcB03FcB875f56beddC4 
		// keccak256 hash of the item id and the msg.sender
			// site - c4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
			// function itemHash - c4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
		// WORKS!!!

		bytes32 itemHash = keccak256(abi.encodePacked(_itemId, msg.sender));
		return itemHash;
	}
}