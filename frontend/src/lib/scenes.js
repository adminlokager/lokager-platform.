import { SCENE_COUNT } from "@/lib/site";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=1200&q=60`;

export const IMAGES = {
  landAerial: img("photo-1747854805840-9be7d5e360e6"),
  skylineIndia: img("photo-1710582308582-55cc0c461c4e"),
  landGreen: img("photo-1769258958976-8852440011b8"),
  villa: img("photo-1544984243-ec57ea16fe25"),
  apartments: img("photo-1545324418-cc1a3fa10c00"),
  interiorLiving: img("photo-1564078516393-cf04bd966897"),
  interiorRental: img("photo-1771219491795-3b4dafc1cdf3"),
  skylineGlobal: img("photo-1768463852019-4881a17a1c0e"),
  office: img("photo-1532888277436-2286814f0ee1"),
  community: img("photo-1580587771525-78b9dba3b914"),
  financeAbstract: img("photo-1486406146926-c627a92ad1ab"),
  architectureLines: img("photo-1513694203232-719a280e022f"),
  architectureIdentity: img("photo-1596716999716-544f09b06743"),
  homesFamily: img("photo-1568605117036-5fe5e7bab0b7"),
};

const image = (src) => ({ type: "image", src });
const art = (name) => ({ type: "art", art: name });
const none = { type: "none" };
const I = IMAGES;

export const SCENE_VISUALS = [
  { side: "left", visual: art("globe"), secondary: image(I.skylineGlobal) },
  { side: "right", visual: image(I.landAerial), secondary: image(I.landGreen) },
  { side: "left", visual: art("merge"), secondary: image(I.architectureIdentity) },
  { side: "right", visual: image(I.skylineIndia), secondary: image(I.homesFamily) },
  { side: "left", visual: image(I.landGreen), secondary: image(I.landAerial) },
  { side: "right", visual: image(I.villa), secondary: image(I.interiorLiving) },
  { side: "left", visual: image(I.apartments), secondary: image(I.skylineIndia) },
  { side: "right", visual: image(I.interiorLiving), secondary: image(I.villa) },
  { side: "left", visual: image(I.interiorRental), secondary: image(I.apartments) },
  { side: "right", visual: image(I.skylineGlobal), secondary: image(I.architectureLines) },
  { side: "left", visual: image(I.office), secondary: image(I.financeAbstract) },
  { side: "right", visual: image(I.community), secondary: image(I.landGreen) },
  { side: "left", visual: image(I.financeAbstract), secondary: image(I.office) },
  { side: "right", visual: { type: "collage", srcs: [I.villa, I.office, I.landGreen, I.homesFamily] }, secondary: image(I.homesFamily) },
  { side: "left", visual: art("world"), secondary: image(I.skylineIndia) },
  { side: "right", visual: image(I.architectureLines), secondary: image(I.architectureIdentity) },
  { side: "left", visual: art("network"), secondary: image(I.community) },
  { side: "right", visual: art("identity"), secondary: image(I.architectureLines) },
  { side: "none", visual: none, secondary: none },
  { side: "none", visual: none, secondary: none },
];

export const sceneIndexAt = (progress) => Math.min(SCENE_COUNT - 1, Math.floor(progress * SCENE_COUNT));

const srcsOf = (visual) => (visual.type === "image" ? [visual.src] : visual.type === "collage" ? visual.srcs : []);

const loaded = new Set();
export const preloadScenes = (from, count) => {
  SCENE_VISUALS.slice(from, from + count).forEach(({ visual, secondary }) =>
    [...srcsOf(visual), ...srcsOf(secondary)].forEach((src) => {
      if (loaded.has(src)) return;
      loaded.add(src);
      const im = new Image();
      im.decoding = "async";
      im.src = src;
    }),
  );
};
