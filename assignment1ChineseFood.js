const Order = require("./assignment1Order");

//set prices for food
const DumplingsLarge = 20;
const DumplingsMedium = 14;
const DumplingsSmall = 10;
const WontonsLarge = 17;
const WontonsMedium = 12;
const WontonsSmall = 9;
const Sauce = 9;

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  FOOD1: Symbol("Dumplings"),
  SIZE1: Symbol("size1"),
  MEAT1: Symbol("meat1"),
  FOOD2: Symbol("Wontons"),
  SIZE2: Symbol("size2"),
  MEAT2: Symbol("meat2"),
  SAUCE: Symbol("sauce"),
});

module.exports = class ChineseFoodOrder extends (
  Order
) {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sFood1 = "dumplings";
    this.sFood2 = "wontons";
    this.sSize1 = "";
    this.sSize2 = "";
    this.sMeat1 = "";
    this.sMeat2 = "";
    this.sSauce = "special sauce";
    this.sCost1 = 0;
    this.sCost2 = 0;
    this.sCost3 = 0;
    this.sCost = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.FOOD1;
        aReturn.push("Welcome to Cong's Chinese Food.");
        aReturn.push(
          "Now we have Dumplings and Wontons. Would you like Dumplings?"
        );
        break;
      case OrderState.FOOD1:
        if (sInput.toLowerCase() == "no") {
          this.stateCur = OrderState.FOOD2;
          this.sFood1 = "";
          aReturn.push("Would you like Wontons?");
        } else {
          this.stateCur = OrderState.SIZE1;
          aReturn.push("What size would you like? Large, medium, or small?");
        }
        break;
      case OrderState.SIZE1:
        this.stateCur = OrderState.MEAT1;
        this.sSize1 = sInput;
        aReturn.push("What meat fillings do you want for Dumplings?");
        break;
      case OrderState.MEAT1:
        this.stateCur = OrderState.FOOD2;
        this.sMeat1 = sInput;
        aReturn.push("Would you like Wontons?");
        break;
      case OrderState.FOOD2:
        if (sInput.toLowerCase() == "no") {
          if (!this.sFood1) {
            this.isDone(true);
            aReturn.push("You have ordered nothing, see you next time.");
          } else {
            this.stateCur = OrderState.SAUCE;
            this.sFood2 = "";
            aReturn.push("Would you like add some sauce?");
          }
        } else {
          this.stateCur = OrderState.SIZE2;
          aReturn.push("What size would you like? Large, medium, or small?");
        }
        break;
      case OrderState.SIZE2:
        this.stateCur = OrderState.MEAT2;
        this.sSize2 = sInput;
        aReturn.push("What meat fillings do you want for Wontons?");
        break;
      case OrderState.MEAT2:
        this.stateCur = OrderState.SAUCE;
        this.sMeat2 = sInput;
        aReturn.push("Would you like add some sauce?");
        break;
      case OrderState.SAUCE:
        this.isDone(true);
        if (sInput.toLowerCase() == "no") {
          this.sSauce = "";
        }
        aReturn.push("Thank-you for your order of");
        if (this.sFood1) {
          switch (this.sSize1.toLowerCase()) {
            case "small":
              this.sCost1 = DumplingsSmall;
            case "medium":
              this.sCost1 = DumplingsMedium;
            case "large":
              this.sCost1 = DumplingsLarge;
          }
          aReturn.push(`${this.sSize1} ${this.sFood1} of ${this.sMeat1}`);
        }
        if (this.sFood2) {
          switch (this.sSize2.toLowerCase()) {
            case "small":
              this.sCost2 = WontonsSmall;
            case "medium":
              this.sCost2 = WontonsMedium;
            case "large":
              this.sCost2 = WontonsLarge;
          }
          aReturn.push(`${this.sSize2} ${this.sFood2} of ${this.sMeat2}`);
        }
        if (this.sSauce) {
          this.sCost3 = Sauce;
          aReturn.push(` with ${this.sSauce}`);
        }

        // calculate sum of cost
        this.sCost = this.sCost1 + this.sCost2 + this.sCost3;
        aReturn.push(`The total cost is $${this.sCost}`);

        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
