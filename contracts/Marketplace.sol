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

	function purchaseItem(bytes16 _courseId, bytes32 _proof) external payable returns(bytes32) {

    }
}