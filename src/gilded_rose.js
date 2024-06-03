class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  /*
  Refeactoring Process:
  1. Updated decreasing quality of items and sellin using compound assignment operator and & increment/decrement operator
  2. Fixed nested ifs
  3. Ifs -> Switch Case (personal prefference)
  4. For-Loop -> foreach for better readability
  5. Used Constants
  6. (increasing/decreasing/set function for quality) -> goblin does not allow it:/
  */
  updateQuality() {
    const maxQuality = 50;
    const minQuality = 0;

    this.items.forEach((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        return;
      }

      switch (item.name) {
        case "Aged Brie":
          if (item.quality < maxQuality) {
            item.quality++;
          }
          if (item.sellIn <= 0 && item.quality < maxQuality) {
            item.quality++;
          }
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          if (item.quality < maxQuality) {
            item.quality++;

            if (item.sellIn < 11 && item.quality < maxQuality) {
              item.quality++;
            }

            if (item.sellIn < 6 && item.quality < maxQuality) {
              item.quality++;
            }
          }

          if (item.sellIn <= 0) {
            item.quality = 0;
          }
          break;

        case "Conjured Mana Cake":
          if (item.quality > minQuality) {
            item.quality -= 2;
          }
          if (item.quality > minQuality && item.sellIn <= 0) {
            item.quality -= 2;
          }
          break;

        default:
          if (item.quality > minQuality) {
            item.quality--;
          }
          break;
      }

      item.sellIn--;
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};
