import { SCENE_COUNT } from "@/lib/site";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=720&h=900&q=62`;

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

export const SCENE_VISUALS = [
  { side: "left", visual: art("globe") },
  { side: "right", visual: image(IMAGES.landAerial) },
  { side: "left", visual: art("merge") },
  { side: "right", visual: image(IMAGES.skylineIndia) },
  { side: "left", visual: image(IMAGES.landGreen) },
  { side: "right", visual: image(IMAGES.villa) },
  { side: "left", visual: image(IMAGES.apartments) },
  { side: "right", visual: image(IMAGES.interiorLiving) },
  { side: "left", visual: image(IMAGES.interiorRental) },
  { side: "right", visual: image(IMAGES.skylineGlobal) },
  { side: "left", visual: image(IMAGES.office) },
  { side: "right", visual: image(IMAGES.community) },
  { side: "left", visual: image(IMAGES.financeAbstract) },
  { side: "right", visual: { type: "collage", srcs: [IMAGES.villa, IMAGES.office, IMAGES.landGreen, IMAGES.homesFamily] } },
  { side: "left", visual: art("world") },
  { side: "right", visual: image(IMAGES.architectureLines) },
  { side: "left", visual: art("network") },
  { side: "right", visual: art("identity") },
  { side: "none", visual: { type: "none" } },
  { side: "none", visual: { type: "none" } },
];

export const sceneIndexAt = (progress) => Math.min(SCENE_COUNT - 1, Math.floor(progress * SCENE_COUNT));

const srcsOf = (visual) => (visual.type === "image" ? [visual.src] : visual.type === "collage" ? visual.srcs : []);

const loaded = new Set();
export const preloadScenes = (from, count) => {
  SCENE_VISUALS.slice(from, from + count).forEach(({ visual }) =>
    srcsOf(visual).forEach((src) => {
      if (loaded.has(src)) return;
      loaded.add(src);
      const im = new Image();
      im.decoding = "async";
      im.src = src;
    }),
  );
};
