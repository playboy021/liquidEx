const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");


describe("Marketplace", function () {

  async function deployMarketplaceFixture() {

    const [owner, otherAccount] = await ethers.getSigners();

    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();

    // for value use this { value: lockedAmount }

    return { marketplace, owner, otherAccount };
  }

  async function deployMarketplaceFixtureWithItem() {
    const { marketplace, owner, otherAccount } = await loadFixture(deployMarketplaceFixture);
  
    const itemId = '0x00000000000000000000000000003130'
    const proof = '0x0000000000000000000000000000313000000000000000000000000000003130'
    const value = '1000000000000000000'

    const tx = await marketplace.connect(otherAccount).purchaseItem(itemId, proof, { value: value })
    await tx.wait()

    const item = await marketplace.connect(owner).getItemByHash('0xa4ec86bd63bb4d384e5032e115b5efbb60c32c67cc766ef19924c58ae2c6a23b')

    await marketplace.connect(owner).activateItem('0xa4ec86bd63bb4d384e5032e115b5efbb60c32c67cc766ef19924c58ae2c6a23b')

    return { marketplace, owner, otherAccount, tx, proof, value, item };
  }

  describe("Deployment", function () {
    it("should set the right owner", async function () {
      const { owner, marketplace } = await loadFixture(deployMarketplaceFixture);

      expect(await marketplace.getContractOwner()).to.equal(owner.address);
    });
  });    

  describe('Item Functionality', function () {

    it('can get item hash at index', async function () {
      const { marketplace, owner } = await loadFixture(deployMarketplaceFixture);
      const { tx } = await loadFixture(deployMarketplaceFixtureWithItem);

      await tx.wait()

      const index = 0
      const itemHash = await marketplace.connect(owner).getItemHashAtIndex(index)

      expect(itemHash).to.equal('0xa4ec86bd63bb4d384e5032e115b5efbb60c32c67cc766ef19924c58ae2c6a23b')
    })

    it('purchased item should have correct info', async function () {
      const { marketplace, owner, otherAccount } = await loadFixture(deployMarketplaceFixture);
      const { tx, proof, value } = await loadFixture(deployMarketplaceFixtureWithItem);

      await tx.wait()

      const item = await marketplace.connect(owner).getItemByHash('0xa4ec86bd63bb4d384e5032e115b5efbb60c32c67cc766ef19924c58ae2c6a23b')

      const id = item[0]
      const price = item[1]
      const isValid = item[2]
      const itemOwner = item[3]
      const itemState = item[4]

      expect(id).to.equal(0)
      expect(price).to.equal(value)
      expect(isValid).to.equal(proof)
      expect(itemOwner).to.equal(otherAccount.address)
      expect(itemState).to.equal(1)
    })
  })

  describe('Activate Item', function () {
    it('can activate item', async function () {
      const { marketplace, owner, otherAccount } = await loadFixture(deployMarketplaceFixture);

      const itemId = '0x00000000000000000000000000003131'
      const proof = '0x0000000000000000000000000000313100000000000000000000000000003131'
      const value = '1000000000000000000'

      const tx = await marketplace.connect(otherAccount).purchaseItem(itemId, proof, { value: value })

      await tx.wait()

      const item = await marketplace.getItemByHash('0xb0925ffcbc1b2ae8da705260ef7c5701e71b3190f5477e0dd16f80551c4c1081')
      await marketplace.connect(owner).activateItem('0xb0925ffcbc1b2ae8da705260ef7c5701e71b3190f5477e0dd16f80551c4c1081')
      console.log(item)
      
    })
  })
  
});
