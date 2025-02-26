import { selfCareInterventions as adlSnippets, SelfCareCategory, SelfCareSubCategory } from "./self-care-activities"

// General snippets (moved from snippets.ts)
export const generalActivitySnippets = [
  {
    id: "ga_01",
    text: "Implemented task segmentation strategies to improve activity tolerance",
    tags: ["task segmentation", "activity tolerance"],
  },
  {
    id: "ga_02",
    text: "Practiced environmental modification techniques for improved safety and efficiency",
    tags: ["environmental modification", "safety", "efficiency"],
  },
  {
    id: "ga_03",
    text: "Facilitated problem-solving skills during novel task performance",
    tags: ["problem-solving", "novel tasks"],
  },
  {
    id: "ga_04",
    text: "Training in energy conservation principles across various daily activities",
    tags: ["energy conservation", "daily activities"],
  },
  {
    id: "ga_05",
    text: "Incorporated dual-task activities to challenge cognitive-motor integration",
    tags: ["dual-task", "cognitive-motor integration"],
  },
]

export const selfCareInterventionSnippets = [
  {
    id: "sc_01",
    text: "Modified grooming routine to incorporate one-handed techniques",
    tags: ["grooming", "one-handed techniques"],
  },
  {
    id: "sc_02",
    text: "Training in use of adaptive equipment for meal preparation tasks",
    tags: ["meal preparation", "adaptive equipment"],
  },
  {
    id: "sc_03",
    text: "Practiced safe transfer techniques for bathroom activities",
    tags: ["transfers", "bathroom safety"],
  },
  {
    id: "sc_04",
    text: "Implemented compensatory strategies for managing fasteners during dressing",
    tags: ["dressing", "fasteners", "compensatory strategies"],
  },
  {
    id: "sc_05",
    text: "Facilitated proper body mechanics during lower body hygiene tasks",
    tags: ["body mechanics", "hygiene"],
  },
]

export function isSelfCareSubCategory<T extends SelfCareCategory>(
  category: T,
  subcategory: string,
): subcategory is SelfCareSubCategory<T> {
  return category in adlSnippets && subcategory in adlSnippets[category]
}

export const getSelfCareActivities = <T extends SelfCareCategory>(
  category: T,
  subcategory: SelfCareSubCategory<T>,
): string[] => {
  if (category in adlSnippets && subcategory in adlSnippets[category]) {
    return adlSnippets[category][subcategory] || []
  }
  console.error(`Invalid category or subcategory: ${category}, ${subcategory}`)
  return []
}

export const selfCareActivities = adlSnippets

export const transferSnippets = {
  title: "Transfer Training",
  categories: {
    // ... (add transfer snippet categories and activities)
  },
}

export const transferModifiers = {
  // ... (add transfer modifiers)
}

export function getSelfCareSubcategories(category: SelfCareCategory): { id: string; title: string }[] {
  if (category in adlSnippets) {
    return Object.keys(adlSnippets[category]).map((subCategory) => ({
      id: subCategory,
      title: subCategory.charAt(0).toUpperCase() + subCategory.slice(1),
    }))
  }
  return []
}

export function isSelfCareCategory(category: string): category is SelfCareCategory {
  return Object.values(SelfCareCategory).includes(category as SelfCareCategory)
}

export { adlSnippets, SelfCareCategory, SelfCareSubCategory }

import { plans } from "./plans"
export { plans }

