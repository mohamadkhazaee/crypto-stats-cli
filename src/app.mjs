#! /usr/bin/env node
import { Command } from "commander";
import { getAssets } from "./api/assets.mjs";

const program = new Command();
const data = await getAssets().then((res) => res.data);

program
  .name("crypto-stats")
  .description("a simple cli for cryptocurrency stats")
  .usage("command [options]")
  .version("1.0.0");

program
  .command("symbol")
  .description("accepts the symbol of currency")
  .argument("<string>", " name of the symbol")
  .option("-p, --price", "just shows the price")
  .action((str, options) => {
    const item = data.find((i) => i.asset_id === str.toUpperCase());
    if (!item) {
      program.error("symbol not found!");
    } else {
      if (options.price) {
        console.log(
          `${item.name.toUpperCase()} PRICE IS: ${item.price_usd} USD`
        );
      } else {
        console.table(item);
      }
    }
  });

program
  .command("search")
  .description("accept string and search for it in currencies")
  .argument("<string>", "substring of name of the symbol")
  .action((str) => {
    const items = data.filter((i) => i.asset_id.includes(str.toUpperCase()));
    if (items.length === 0) {
      program.error("symbol not found!");
    } else {
      items.forEach((i) => console.table(i));
    }
  });

program.showHelpAfterError();
program.parse();
