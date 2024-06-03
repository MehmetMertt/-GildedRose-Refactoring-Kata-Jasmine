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
    let days = 30;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    items.forEach((item) => {
      expect(item.quality).toBeGreaterThanOrEqual(0);
    });
  });

  it("quality should be smaller than 50 for every item in store after 30 days", function () {
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
    let days = 30;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    items.forEach((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        expect(item.quality).toBe(80);
      } else {
        expect(item.quality).toBeLessThanOrEqual(50);
      }
    });
  });

  it("Quality of Aged Brie should equal to 18 after 10 days", function () {
    const items = [new Item("Aged Brie", 2, 0)];

    const gildedRose = new Shop(items);

    // Simulate passing 30 days
    let days = 10;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    items.forEach((item) => {
      expect(item.quality).toEqual(18);
    });
  });

  it("Sulfuras never decreases in Quality and SellIn", function () {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80), new Item("Sulfuras, Hand of Ragnaros", -1, 80)];

    const gildedRose = new Shop(items);

    // Simulate passing 10 days
    let days = 10;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(80);
    expect(items[0].sellIn).toEqual(0);
    expect(items[1].quality).toEqual(80);
    expect(items[1].sellIn).toEqual(-1);
  });

  it("Quality of Backstage Pass with 15 SellIn and 20 Quality should equal to 5 SellIn and Quality 35 in 10 days", function () {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      // new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      //new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ];

    const gildedRose = new Shop(items);

    // Simulate passing 10 days
    let days = 10;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(35);
    expect(items[0].sellIn).toEqual(5);
  });

  it("Quality of Backstage Pass with 10 SellIn and 49 Quality should equal to 1 SellIn and Quality 50 in 9 days", function () {
    const items = [
      //new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      //new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ];

    const gildedRose = new Shop(items);

    // Simulate passing 10 days
    let days = 9;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(50);
    expect(items[0].sellIn).toEqual(1);
  });

  it("Quality check of passes after 4 days", function () {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20), new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49), new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)];

    const gildedRose = new Shop(items);

    // Simulate passing 4 days
    let days = 4;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(24); // Quality increases by 1 for 4 days
    expect(items[0].sellIn).toEqual(11); // SellIn decreases by 4

    expect(items[1].quality).toEqual(50); // Quality increases by 2 for 4 days but maxes out at 50
    expect(items[1].sellIn).toEqual(6); // SellIn decreases by 4

    expect(items[2].quality).toEqual(50); // Quality increases by 3 for 4 days but maxes out at 50
    expect(items[2].sellIn).toEqual(1); // SellIn decreases by 4
  });

  it("Quality of Elixir of the Mongoose should should decrease by 3 and sellin also by 3 after 3 days ", function () {
    const items = [new Item("Elixir of the Mongoose", 5, 7)];

    const gildedRose = new Shop(items);

    let days = 3;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(4);
    expect(items[0].sellIn).toEqual(2);
  });

  it("Quality of Elixir of the Mongoose should be 0 and sellin < 0 after 10 days", function () {
    const items = [new Item("Elixir of the Mongoose", 5, 7)];

    const gildedRose = new Shop(items);

    let days = 10;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    expect(items[0].quality).toEqual(0);
    expect(items[0].sellIn).toBeLessThanOrEqual(0);
  });

  it("Quality of Backstage Pass with 5 SellIn and 49 Quality should equal to 0 SellIn and Quality 0 in 6 days", function () {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)];

    const gildedRose = new Shop(items);

    // Simulate passing 5 days
    let days = 6;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(0);
    expect(items[0].sellIn).toBeLessThanOrEqual(0);
  });
  it("Check for decrease of sellin of sulfuras when sellIn is positve", function () {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 4, 80)];

    const gildedRose = new Shop(items);

    // Simulate passing 5 days
    let days = 6;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(80);
    expect(items[0].sellIn).toEqual(4);
  });

  it("Conjured Item Quality decrease by 6 in 3 days", function () {
    const items = [new Item("Conjured Mana Cake", 6, 10)];

    const gildedRose = new Shop(items);

    // Simulate passing 5 days
    let days = 3;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(4);
    expect(items[0].sellIn).toEqual(3);
  });

  it("Conjured Item never negativ", function () {
    const items = [new Item("Conjured Mana Cake", 6, 10)];

    const gildedRose = new Shop(items);

    // Simulate passing 10 days
    let days = 6;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(0);
    expect(items[0].sellIn).toBeLessThanOrEqual(0);
  });

  it("Conjured Item quality decrease 4x after sellin < 0 in 5 days by 12 points", function () {
    const items = [new Item("Conjured Mana Cake", 3, 40)];

    const gildedRose = new Shop(items);

    // Simulate passing 5 days
    let days = 5;
    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
    }

    // Assert the updated item properties
    expect(items[0].quality).toEqual(26);
    expect(items[0].sellIn).toBeLessThanOrEqual(0);
  });
});
