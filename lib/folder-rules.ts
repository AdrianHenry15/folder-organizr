export type FolderRule = {
  category: string
  targetPath: string
  keywords: string[]
}

export const folderRules: FolderRule[] = [
  {
    category: "Kicks",
    targetPath: "Drums/Kicks",
    keywords: ["kick", "kicks", "kickz", "kick drum", "bd"],
  },
  {
    category: "Snares",
    targetPath: "Drums/Snares",
    keywords: ["snare", "snares", "snr"],
  },
  {
    category: "Claps",
    targetPath: "Drums/Claps",
    keywords: ["clap", "claps"],
  },
  {
    category: "Percussion",
    targetPath: "Drums/Percussion",
    keywords: ["perc", "percussion", "tops", "top loops"],
  },
  {
    category: "Cymbals",
    targetPath: "Drums/Cymbals",
    keywords: ["hat", "hats", "hi hat", "hihat", "cymbal", "crash", "ride"],
  },
  {
    category: "808s",
    targetPath: "Bass/808s",
    keywords: ["808", "808s"],
  },
  {
    category: "Bass",
    targetPath: "Bass/Bass Shots",
    keywords: ["bass", "sub", "sub bass", "reece"],
  },
  {
    category: "Risers",
    targetPath: "FX/Risers",
    keywords: ["riser", "risers", "sweep up", "uplifter"],
  },
  {
    category: "Impacts",
    targetPath: "FX/Impacts",
    keywords: ["impact", "impacts", "hit", "hits"],
  },
  {
    category: "Atmospheres",
    targetPath: "FX/Atmospheres",
    keywords: ["atmo", "atmos", "atmosphere", "texture", "textures", "ambient"],
  },
]
