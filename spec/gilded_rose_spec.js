var { Shop, Item } = require("../src/gilded_rose.js");
describe("Gilded Rose", function () {
  it("Quality never negativ", function () {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const gildedRose = new Shop(items);

    // Simulate passing 30 days
    days = 30;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    items.forEach((item) => {
      expect(item.quality).toBeGreaterThanOrEqual(0);
    });
  });

  it("quality should be smaller than 50 for every item in store", function () {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const gildedRose = new Shop(items);

    // Simulate passing 30 days
    days = 30;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    items.forEach((item) => {
      console.log(`Item: ${item.name}, Quality: ${item.quality}`);
      if (item.name == "Sulfuras, Hand of Ragnaros") {
        expect(item.quality).toBe(80);
      } else {
        expect(item.quality).toBeLessThanOrEqual(50);
      }
    });
  });

  it("Quality of Aged Brie should equal to 10 after 10 days", function () {
    const items = [new Item("Aged Brie", 2, 0)];

    const gildedRose = new Shop(items);

    // Simulate passing 30 days
    days = 10;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    items.forEach((item) => {
      expect(item.quality).toEqual(18);
    });
  });

  it("Sulfuras never decreases in Quality and SellIn", function () {
    const items = [
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    ];

    const gildedRose = new Shop(items);

    // Simulate passing 10 days
    days = 10;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(80);
    expect(items[0].sellIn).toEqual(0);
    expect(items[1].quality).toEqual(80);
    expect(items[1].sellIn).toEqual(-1);
  });
});
