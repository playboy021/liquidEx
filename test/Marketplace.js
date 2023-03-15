const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
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

    return { marketplace, owner, otherAccount, tx };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { owner, marketplace } = await loadFixture(deployMarketplaceFixture);

      expect(await marketplace.getContractOwner()).to.equal(owner.address);
    });
  });    

  describe('Item Functionality', function () {

    it('Can get item hash at index', async function () {
      const { marketplace, owner } = await loadFixture(deployMarketplaceFixture);
      const { tx } = await loadFixture(deployMarketplaceFixtureWithItem);

      await tx.wait()

      const index = 0
      const itemHash = await marketplace.connect(owner).getItemHashAtIndex(index)

      expect(itemHash).to.equal('0xa4ec86bd63bb4d384e5032e115b5efbb60c32c67cc766ef19924c58ae2c6a23b')
    })
  })
  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployMarketplaceFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployMarketplaceFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployMarketplaceFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployMarketplaceFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployMarketplaceFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //  });
});
