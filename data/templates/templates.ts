import type { FolderTemplate } from "@/types/folder"

export const folderTemplates: FolderTemplate[] = [
  {
    id: "music-producer",
    name: "Music Producer",
    category: "music",
    description:
      "A clean folder structure for samples, loops, drums, FX, and melodic sounds.",
    folders: [
      "Drums/Kicks",
      "Drums/Snares",
      "Drums/Claps",
      "Drums/Percussion",
      "Drums/Cymbals",
      "Bass/808s",
      "Bass/Bass Shots",
      "Bass/Bass Loops",
      "FX/Risers",
      "FX/Downlifters",
      "FX/Impacts",
      "FX/Atmospheres",
      "Melodics/Pianos",
      "Melodics/Keys",
      "Melodics/Synths",
      "Melodics/Strings",
    ],
  },
  {
    id: "photographer",
    name: "Photographer",
    category: "photo",
    description:
      "Organize photo work by year, client, exports, RAW files, and final deliveries.",
    folders: [
      "Photos/2026/January",
      "Photos/2026/February",
      "Clients/Weddings",
      "Clients/Portraits",
      "Clients/Family Shoots",
      "RAW",
      "Edited",
      "Exports/Instagram",
      "Exports/Print",
      "Exports/Portfolio",
    ],
  },
  {
    id: "video-editor",
    name: "Video Editor",
    category: "video",
    description:
      "A project-based structure for footage, audio, graphics, project files, and exports.",
    folders: [
      "Projects/Client Name/Footage",
      "Projects/Client Name/Audio",
      "Projects/Client Name/Graphics",
      "Projects/Client Name/Project Files",
      "Projects/Client Name/Exports",
      "Assets/Music",
      "Assets/Sound Effects",
      "Assets/Stock Footage",
    ],
  },
  {
    id: "general-computer",
    name: "General Computer",
    category: "general",
    description:
      "A simple structure for everyday files, downloads, documents, photos, and archives.",
    folders: [
      "Documents",
      "Downloads",
      "Photos",
      "Videos",
      "Projects",
      "Receipts",
      "Important",
      "Archives",
    ],
  },
]
