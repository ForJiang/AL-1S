import type { Dictionary } from "./types";

/* en 词典：Worker W3 译自 zh-CN 基准，元素按位置一一对应，禁止增删或调序。
   技能栏位与技能名为游戏内英文官方术语，保持原文。 */
export const en: Dictionary = {
  meta: {
    title: "Tendou Aris - Blue Archive Fan Site",
    description:
      "Blue Archive fan site: Tendou Aris (AL-1S), the Apprentice Hero of the Game Development Department at Millennium Science School.",
  },
  hero: {
    titleLines: ["Tendou", "Aris"],
    subtitle: "天童アリス",
    tagline: "Apprentice Hero · AL-1S",
    imageAlt: "A surprised Aris (maid outfit character art)",
  },
  story: {
    title: "Backstory",
    paragraphs: [
      "Tendou Aris is a mysterious girl discovered deep within ruins. She lay dormant while the three members of the Game Development Department — Momoi, Midori, and Yuzu — explored the ruins beneath an abandoned factory. After being awakened, she became the department's fourth member.",
      "Everything about her is unknown, including her age, origins, and true identity. However, Volume 2 of the main story later revealed that she is in fact AL-1S, a humanoid weapon built by the unnamed priest, originally intended to destroy the world.",
      "Aris learned to speak by playing retro games, and most of her lines are borrowed from them. She describes everyday life as quests, level-ups, and party play. She calls herself an “Apprentice Hero” — a hero who advances together with her companions.",
      "Although another AI once existed within her body — Key — in Chapter 2 of Volume 2 of the story, when Key attempted to take over her body, Aris rejected Key, declaring herself a hero rather than the princess of the unnamed god.",
      "Now, together with her Game Development Department companions, she enjoys the fun of games and has become a devoted gamer. Although her speech is somewhat halting, that is precisely because most of her lines come from retro games.",
    ],
    imageAlt: "Aris looking slightly nervous (maid outfit character art)",
  },
  profile: {
    title: "Character Profile",
    intro:
      "A core member of the Game Development Department at Millennium Science School, with outstanding game development and programming skills. Serious and responsible by nature, and deeply loyal to her friends, she shows extraordinary talent in game development.",
    basicsHeading: "Basic Information",
    combatHeading: "Combat Abilities",
    personalityHeading: "Personality",
    basics: [
      ["Full Name", "Tendou Aris (天童アリス)"],
      ["English Name", "Tendou Aris"],
      ["Code Name", "AL-1S"],
      ["School", "Millennium Science School"],
      ["Club", "Game Development Department"],
      ["Age", "Unknown"],
      ["Birthday", "March 25"],
      ["Height", "152cm"],
      ["Hobby", "Games (especially RPGs)"],
    ],
    combat: [
      ["Role", "Striker"],
      ["Position", "Attacker/Back"],
      ["Weapon", "AR (Assault Rifle)"],
      ["Attack Type", "Mystic"],
      ["Defense Type", "Special (Special Armor)"],
      ["Rarity", "⭐⭐⭐ (3-star)"],
      ["Combat Style", "Burst Damage"],
    ],
    personality: [
      "Aris has a unique and endearing way of speaking; most of her lines come from retro games, so her conversations often sound somewhat halting and unnatural. She sees real life as an adventure game, describing everyday events in gaming terms.",
      "She calls herself an “Apprentice Hero,” believing she is on a grand adventure with her companions. Although her true identity is that of a being created as a weapon, she chose to become a hero rather than a destroyer.",
    ],
  },
  skills: {
    title: "Skill System",
    intro:
      "As a Striker attacker, Aris possesses powerful damage output and a unique skill set.",
    items: [
      {
        type: "EX Skill",
        name: "Full Burst Time",
        desc: "Aris's ultimate attack, capable of dealing massive Mystic damage to enemies. Guided by gaming terms, she focuses all of her power into a single point, like an ultimate skill in an RPG.",
      },
      {
        type: "Normal Skill",
        name: "Continuous Attack",
        desc: "A sustained attack that deals multiple hits to a single target. This skill reflects her combat style as an assault rifle user.",
      },
      {
        type: "Passive Skill",
        name: "Experience Points",
        desc: "A passive skill that gradually boosts her own abilities as the battle goes on. Just like an experience point system in a game, she keeps growing stronger through combat.",
      },
      {
        type: "Sub Skill",
        name: "Critical Hit",
        desc: "A support skill that raises critical hit rate and critical damage. It makes her attacks more threatening, capable of delivering a decisive blow at a crucial moment.",
      },
    ],
  },
  relationships: {
    title: "Relationships",
    intro:
      "Over the course of her adventures in Kivotos, Aris has formed deep bonds with many characters.",
    items: [
      {
        name: "Momoi, Midori, Yuzu",
        role: "Game Development Department companions",
        desc: "The three of them discovered the dormant Aris, gave her a name, and brought her into the Game Development Department as its fourth member. When the AI inside Aris tried to take over, they entered her mental space and told her she could choose her own class — and she chose to become a hero.",
      },
      {
        name: "Key",
        role: "The other AI within her",
        desc: "The AI known as Key in the main story is another consciousness living inside Aris. In Chapter 2 of Volume 2, when Key tried to take over Aris's body, Aris rejected her, declaring herself a hero rather than the princess of the unnamed god. Later, in the EX volume, at Aris's request, Key was given a body of her own.",
      },
      {
        name: "Rio",
        role: "President of Seminar",
        desc: "The president of Seminar, she identified Aris as a weapon intended to destroy the world and tried to destroy her halo. Later, at Aris's request, she helped bring Key back.",
      },
      {
        name: "Sensei",
        role: "A trusted companion",
        desc: "When Aris was discovered in the ruins, Sensei was with the Game Development Department. Aris sees Sensei as a member of her party and hopes Sensei will keep adventuring alongside her. She gives Sensei the credit for saving the world together with her.",
      },
    ],
  },
  gallery: {
    title: "Character Gallery",
    intro:
      "A collection of beautiful official character illustrations and artwork.",
    alts: [
      "Aris in battle with her gun",
      "Aris wearing cat ears while getting a head pat",
      "Close-up of Aris at the moment of her awakening",
      "Aris shyly looking down",
      "Aris riding a bicycle by the sea at dusk",
      "Aris in winter clothes by the lakeside",
    ],
  },
  quote: {
    text: "“I am an Apprentice Hero — a hero who advances together with her companions.”",
    attribution: "Tendou Aris · AL-1S",
  },
  footer: {
    copyright: "© 2026 Blue Archive Fan Site | Tendou Aris (天童アリス)",
    disclaimer: "This is a fan site. All character rights belong to NEXON Games.",
    sources: "Sources: Blue Archive Wiki, Kivo Wiki, Moegirl",
  },
};
