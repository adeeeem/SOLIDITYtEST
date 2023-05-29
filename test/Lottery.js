const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery Contract", function () {
  let lotteryContract;
  let owner;
  let players;

  beforeEach(async function () {
    [owner, ...players] = await ethers.getSigners();

    const Lottery = await ethers.getContractFactory("Lottery");
    lotteryContract = await Lottery.deploy();
    await lotteryContract.deployed();
  });

  it("should allow players to purchase tickets", async function () {
    const ticketPrice = ethers.utils.parseEther("0.1");
    const numOfTickets = 2;
    const expectedTicketNo = players.length * numOfTickets;

    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < numOfTickets; j++) {
        await lotteryContract.Ticket_Purchase({ value: ticketPrice });
      }
    }

    const ticketNo = await lotteryContract.TicketNo();

    expect(ticketNo).to.equal(expectedTicketNo);
  });

  it("should select a winner and transfer the prize ", async function () {
    const ticketPrice = ethers.utils.parseEther("0.1");
    const numOfTickets = 2;
    const prizePool = ethers.utils.parseEther("2");

    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < numOfTickets; j++) {
        await lotteryContract.Ticket_Purchase({ value: ticketPrice });
      }
    }

    await lotteryContract.SelectWinner();
  });
});
