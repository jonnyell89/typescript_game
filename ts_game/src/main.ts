import "./style.scss";

// Grid
const container = document.querySelector<HTMLDivElement>(".container");

// Block collections
const allBlocks =
  document.querySelectorAll<HTMLDivElement>(".container__block");
const lgBlocks = document.querySelectorAll<HTMLDivElement>(
  ".container__block--lg"
);
const mdBlocks = document.querySelectorAll<HTMLDivElement>(
  ".container__block--md"
);
const smBlocks = document.querySelectorAll<HTMLDivElement>(
  ".container__block--sm"
);
const emBlocks = document.querySelectorAll<HTMLDivElement>(
  ".container__block--em"
);

// Individual blocks
const lgBlock1 = document.querySelector<HTMLDivElement>("#lg");
const mdBlockH1 = document.querySelector<HTMLDivElement>("#md-1-h");
const mdBlockV1 = document.querySelector<HTMLDivElement>("#md-1-v");
const mdBlockV2 = document.querySelector<HTMLDivElement>("#md-2-v");
const mdBlockV3 = document.querySelector<HTMLDivElement>("#md-3-v");
const mdBlockV4 = document.querySelector<HTMLDivElement>("#md-4-v");
const smBlock1 = document.querySelector<HTMLDivElement>("#sm-1");
const smBlock2 = document.querySelector<HTMLDivElement>("#sm-2");
const smBlock3 = document.querySelector<HTMLDivElement>("#sm-3");
const smBlock4 = document.querySelector<HTMLDivElement>("#sm-4");
const emBlock1 = document.querySelector<HTMLDivElement>("#em-1");
const emBlock2 = document.querySelector<HTMLDivElement>("#em-2");
