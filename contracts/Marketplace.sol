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
		bytes32 proof; 
		address owner;
		State state;
	}

	// mapping itemHash to Item data
	mapping(bytes32 => Item) public ownedItems;

	// mapping of itemId to ItemHash			
	mapping(uint => bytes32) public ownedItemsHash;

	// number of all items + id of the items
	uint private totalOwnedItems;

	function purchaseItem(
		bytes16 _itemId, // 0x00000000000000000000000000003130 hex value so it fits the bytes16 format of the itemId
		bytes32 _proof // 0x0000000000000000000000000000313000000000000000000000000000003130 placeholder 
	) external payable {
		bytes32 itemHash = keccak256(abi.encodePacked(_itemId, msg.sender));
		// keccak256 hash of the item id and the msg.sender
			// site - 0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
			// function itemHash - 0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
		// WORKS!!!
		uint _id = totalOwnedItems++;
		ownedItemsHash[_id] = itemHash;
		ownedItems[itemHash] = Item(
			_id, 
			msg.value, 
			_proof, 
			msg.sender, 
			State.Purchased
		);
	
	}
}