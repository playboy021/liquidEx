// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {

  enum State {
    Purchased,
    Activated,
    Deactivated
  }

  struct Item {
    uint id; // 32
    uint price; // 32
    bytes32 proof; // 32
    address owner; // 20
    State state; // 1
  }

  bool public isStopped = false;

   
  mapping(bytes32 => Item) private ownedItems;

  mapping(uint => bytes32) private ownedItemHash;


  uint private totalOwnedItems;

  address payable private owner;

  constructor() {
    setContractOwner(msg.sender);
  }

  /// Item has invalid state!
  error InvalidState();

  /// Item is not created!
  error ItemIsNotCreated();

  /// Item has already a Owner!
  error ItemHasOwner();

  /// Sender is not Item owner!
  error ItemOwner();

  /// Only owner has an access!
  error OnlyOwner();

  /// Sender is not item owner!
  error SenderIsNotItemOwner();

  modifier onlyOwner() {
    if (msg.sender != getContractOwner()) {
      revert OnlyOwner();
    }
    _;
  }

  modifier onlyWhenNotStopped {
    require(!isStopped);
    _;
  }

  modifier onlyWhenStopped {
    require(isStopped);
    _;
  }

  receive() external payable {}

  function withdraw(uint _amount)
    external
    onlyOwner
  {
    (bool success, ) = owner.call{value: _amount}("");
    require(success, "Transfer failed.");
  }

  function emergencyWithdraw()
    external
    onlyWhenStopped
    onlyOwner
  {
    (bool success, ) = owner.call{value: address(this).balance}("");
    require(success, "Transfer failed.");
  }

  function selfDestruct()
    external
    onlyWhenStopped
    onlyOwner
  {
    selfdestruct(owner);
  }

  function stopContract()
    external
    onlyOwner
  {
    isStopped = true;
  }

  function resumeContract()
    external
    onlyOwner
  {
    isStopped = false;
  }

  function purchaseItem(
    bytes16 _itemId, // 0x00000000000000000000000000003130
    bytes32 _proof // 0x0000000000000000000000000000313000000000000000000000000000003130
  )
    external
    payable
    onlyWhenNotStopped
  {
    bytes32 itemHash = keccak256(abi.encodePacked(_itemId, msg.sender));

    if (hasItemOwnership(itemHash)) {
      revert ItemHasOwner();
    }

    uint id = totalOwnedItems++;

    ownedItemHash[id] = itemHash;
    ownedItems[itemHash] = Item({
      id: id,
      price: msg.value,
      proof: _proof,
      owner: msg.sender,
      state: State.Purchased
    });
  }

  function repurchaseItem(bytes32 _itemHash)
    external
    payable
    onlyWhenNotStopped
  {
    if (!isItemCreated(_itemHash)) {
      revert ItemIsNotCreated();
    }

    if (!hasItemOwnership(_itemHash)) {
      revert SenderIsNotItemOwner();
    }

    Item storage item = ownedItems[_itemHash];

    if (item.state != State.Deactivated) {
      revert InvalidState();
    }

    item.state = State.Purchased;
    item.price = msg.value;
  }

  function activateItem(bytes32 _itemHash)
    external
    onlyWhenNotStopped
    onlyOwner
  {
    if (!isItemCreated(_itemHash)) {
      revert ItemIsNotCreated();
    }

    Item storage item = ownedItems[_itemHash];

    if (item.state != State.Purchased) {
      revert InvalidState();
    }

    item.state = State.Activated;
  }

  function deactivateItem(bytes32 _itemHash)
    external
    onlyWhenNotStopped
    onlyOwner
  {
    if (!isItemCreated(_itemHash)) {
      revert ItemIsNotCreated();
    }

    Item storage item = ownedItems[_itemHash];

    if (item.state != State.Purchased) {
      revert InvalidState();
    }

    (bool success, ) = item.owner.call{value: item.price}("");
    require(success, "Transfer failed!");

    item.state = State.Deactivated;
    item.price = 0;
  }

  function transferOwnership(address _newOwner)
    external
    onlyOwner
  {
    setContractOwner(_newOwner);
  }

  function getItemCount()
    external
    view
    returns (uint)
  {
    return totalOwnedItems;
  }

  function getItemHashAtIndex(uint _index)
    external
    view
    returns (bytes32)
  {
    return ownedItemHash[_index];
  }

  function getItemByHash(bytes32 _itemHash)
    external
    view
    returns (Item memory)
  {
    return ownedItems[_itemHash];
  }

  function getContractOwner()
    public
    view
    returns (address)
  {
    return owner;
  }

  function setContractOwner(address _newOwner) private {
    owner = payable(_newOwner);
  }

  function isItemCreated(bytes32 _itemHash)
    private
    view
    returns (bool)
  {
    return ownedItems[_itemHash].owner != 0x0000000000000000000000000000000000000000;
  }

  function hasItemOwnership(bytes32 _itemHash)
    private
    view
    returns (bool)
  {
    return ownedItems[_itemHash].owner == msg.sender;
  }
}