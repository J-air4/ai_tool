export enum SelfCareCategory {
  toileting = "toileting",
  upperBodyDressing = "upperBodyDressing",
  lowerBodyDressing = "lowerBodyDressing",
  bathing = "bathing",
  grooming = "grooming",
}

// Update the Activity type to include the new categories
type Activity = {
  title: string
  categories: {
    [key: string]: {
      title: string
      activities: string[]
    }
  }
  analysis: string[]
  positioning: string[]
  adaptations: string[]
  compensatoryTechniques: string[]
}

// Update the selfCareActivities object to include the new categories for each activity
const selfCareActivities: { [key in SelfCareCategory]: Activity } = {
  toileting: {
    title: "Toileting",
    categories: {
      movementComponents: {
        title: "Movement Components",
        activities: [
          "Toileting task training with focus on facilitated sit-to-stand transfer sequence",
          "Guided weight shifting during transfers during toileting",
          "Toileting task training with focus on promoted stability during clothing management",
          "Facilitated reaching patterns for hygiene during toileting",
          "Toileting task training with focus on guided positional changes for cleaning",
          "Promoted balance during standing tasks during toileting",
          "Toileting task training with focus on facilitated trunk control during reaching",
          "Guided bilateral coordination for clothing during toileting",
        ],
      },
      positioningSetup: {
        title: "Positioning & Setup",
        activities: [
          "Toileting task training with focus on modified toilet height accessibility",
          "Arranged supplies within safe reach during toileting",
          "Toileting task training with focus on positioned grab bars optimally",
          "Setup clothing for easy management during toileting",
          "Toileting task training with focus on organized cleaning supplies accessibly",
          "Modified space for mobility device during toileting",
          "Toileting task training with focus on arranged lighting for task visibility",
          "Positioned stability supports strategically during toileting",
        ],
      },
      taskAdaptationsStrategies: {
        title: "Task Adaptations & Strategies",
        activities: [
          "Toileting task training with focus on modified clothing management methods",
          "Segmented hygiene sequence during toileting",
          "Toileting task training with focus on adapted cleaning techniques",
          "Modified fastener management during toileting",
          "Toileting task training with focus on structured transfer sequence",
          "Adapted tool use methods during toileting",
          "Toileting task training with focus on modified cleaning supply access",
          "Adapted positioning strategies during toileting",
        ],
      },
      problemSolvingLearning: {
        title: "Problem-Solving & Learning",
        activities: [
          "Toileting task training with focus on identified efficient transfer methods",
          "Analyzed challenging task components during toileting",
          "Toileting task training with focus on developed strategies for clothing",
          "Problem-solved cleaning access during toileting",
          "Toileting task training with focus on practiced techniques for safety",
          "Identiated optimal sequences during toileting",
          "Toileting task training with focus on developed methods for hygiene",
          "Problem-solved space management during toileting",
        ],
      },
      functionalIntegration: {
        title: "Functional Integration",
        activities: [
          "Toileting task training with focus on combined transfer techniques smoothly",
          "Applied safety strategies consistently during toileting",
          "Toileting task training with focus on integrated clothing management",
          "Combined positional changes efficiently during toileting",
          "Toileting task training with focus on applied energy conservation throughout",
          "Integrated tool use effectively during toileting",
          "Toileting task training with focus on applied learned sequences independently",
          "Combined multiple tasks safely during toileting",
        ],
      },
      compensatoryTechniques: {
        title: "Compensatory Techniques",
        activities: [
          "Toileting task training with focus on used grab bar techniques",
          "Implemented adapted clothing management during toileting",
          "Toileting task training with focus on applied modified cleaning methods",
          "Used stabilization strategies during toileting",
          "Toileting task training with focus on implemented alternative fastener techniques",
          "Modified task sequence as needed during toileting",
          "Toileting task training with focus on used guide patterns for cleaning",
          "Applied energy conservation principles during toileting",
        ],
      },
    },
    analysis: [
      "Analyzed patient's current toileting routine",
      "Assessed environmental barriers in bathroom",
      "Evaluated patient's balance during toileting tasks",
      "Identified areas of difficulty in clothing management",
      "Assessed patient's ability to perform hygiene tasks",
    ],
    positioning: [
      "Optimized toilet height for ease of transfers",
      "Adjusted grab bar placement for maximum support",
      "Positioned hygiene supplies within easy reach",
      "Modified toilet paper dispenser location",
      "Arranged clothing for efficient management",
    ],
    adaptations: [
      "Introduced raised toilet seat for easier transfers",
      "Implemented use of long-handled wiping aid",
      "Adapted clothing for easier management (e.g., elastic waistbands)",
      "Modified toilet flush mechanism for easier operation",
      "Introduced bedside commode for nighttime use",
    ],
    compensatoryTechniques: [
      "Taught one-handed fastener management techniques",
      "Instructed in safe transfer methods using grab bars",
      "Demonstrated energy conservation techniques during toileting",
      "Practiced alternative wiping methods for improved hygiene",
      "Introduced seated position for clothing management tasks",
    ],
  },
  upperBodyDressing: {
    title: "Upper Body Dressing",
    categories: {
      shirtDonning: {
        title: "Shirt Donning",
        activities: [
          "Upper body dressing task training with focus on facilitated weight shift during sleeve threading with tactile cues at scapula",
          "During upper body dressing, promoted scapular mobility with manual cues during arm elevation",
          "Upper body dressing task training with focus on facilitated shoulder flexion during overhead threading with trunk stabilization",
          "During upper body dressing, guided trunk rotation during arm threading with postural support",
          "Upper body dressing task training with focus on facilitated arm elevation with manual cues at scapula for proper glenohumeral rhythm",
          "During upper body dressing, promoted bilateral UE coordination during simultaneous sleeve threading",
          "Upper body dressing task training with focus on facilitated anterior weight shift with tactile cues at shoulders during forward lean",
          "During upper body dressing, guided cross-body reaching during garment adjustment with tactile cues for trunk control",
        ],
      },
    },
    analysis: [
      "Assessed patient's current upper body dressing routine",
      "Evaluated range of motion limitations affecting dressing",
      "Identified areas of difficulty in garment management",
      "Analyzed patient's ability to manipulate fasteners",
      "Assessed energy expenditure during upper body dressing tasks",
    ],
    positioning: [
      "Optimized seating position for upper body dressing tasks",
      "Arranged clothing for efficient access and manipulation",
      "Positioned mirror for visual feedback during dressing",
      "Modified environment to support balance during standing dressing tasks",
      "Arranged adaptive equipment within functional reach",
    ],
    adaptations: [
      "Introduced button hook for easier fastener management",
      "Implemented use of dressing stick for hard-to-reach areas",
      "Adapted clothing choices for easier donning (e.g., front-opening garments)",
      "Modified existing clothing with velcro closures",
      "Introduced sock aid for independent sock application",
    ],
    compensatoryTechniques: [
      "Taught one-handed dressing techniques for affected side",
      "Instructed in energy conservation principles during dressing",
      "Demonstrated alternative methods for bra fastening",
      "Practiced seated dressing techniques for improved stability",
      "Introduced visual scanning strategies for garment orientation",
    ],
  },
  lowerBodyDressing: {
    title: "Lower Body Dressing",
    categories: {
      movementComponents: {
        title: "Movement Components",
        activities: [
          "Lower body dressing task training with focus on facilitated hip flexion during foot entry with pelvic stabilization",
          "During lower body dressing, guided ankle positioning during foot threading with manual cues",
          "Lower body dressing task training with focus on promoted weight shifting during seated leg lifting",
          "During lower body dressing, facilitated trunk rotation for garment management at lower extremities",
          "Lower body dressing task training with focus on guided dynamic sitting balance during forward reach to feet",
          "During lower body dressing, promoted bilateral leg movement during pants management",
          "Lower body dressing task training with focus on facilitated single leg control during foot entry",
          "During lower body dressing, guided weight shifting patterns during standing balance for dressing",
        ],
      },
      positioningSetup: {
        title: "Positioning & Setup",
        activities: [
          "Lower body dressing task training with focus on modified seat height to optimize hip positioning for leg management",
          "During lower body dressing, arranged clothing for efficient reach patterns",
          "Lower body dressing task training with focus on positioned adaptive equipment within functional reach",
          "During lower body dressing, modified surface friction for sliding techniques",
          "Lower body dressing task training with focus on setup visual markers for foot placement",
          "During lower body dressing, structured environment to support balance during standing tasks",
          "Lower body dressing task training with focus on optimized lighting for visual feedback at feet",
          "During lower body dressing, arranged stability supports for standing balance",
        ],
      },
      taskAdaptationsStrategies: {
        title: "Task Adaptations & Strategies",
        activities: [
          "Lower body dressing task training with focus on modified garment position for easier foot entry",
          "During lower body dressing, segmented donning sequence into manageable components",
          "Lower body dressing task training with focus on structured sock application sequence",
          "During lower body dressing, adapted shoe closure methods",
          "Lower body dressing task training with focus on modified garment selection for easier manipulation",
          "During lower body dressing, implemented energy conservation during multi-step tasks",
          "Lower body dressing task training with focus on adapted fastener management techniques",
          "During lower body dressing, modified donning sequence based on balance requirements",
        ],
      },
      problemSolvingLearning: {
        title: "Problem-Solving & Learning",
        activities: [
          "Lower body dressing task training with focus on identified barriers to efficient leg lifting",
          "During lower body dressing, analyzed challenging steps in fastener management",
          "Lower body dressing task training with focus on developed strategies for maintaining seated balance",
          "During lower body dressing, problem-solved methods for shoe management",
          "Lower body dressing task training with focus on practiced techniques for untangling garments",
          "During lower body dressing, identified optimal starting positions",
          "Lower body dressing task training with focus on developed methods to confirm proper alignment",
          "During lower body dressing, problem-solved strategies for loss of balance",
        ],
      },
      functionalIntegration: {
        title: "Functional Integration",
        activities: [
          "Lower body dressing task training with focus on applied techniques to various clothing types",
          "During lower body dressing, combined positional strategies during full dressing sequence",
          "Lower body dressing task training with focus on integrated balance strategies throughout task",
          "During lower body dressing, applied learned techniques to different footwear",
          "Lower body dressing task training with focus on combined sitting and standing techniques as appropriate",
          "During lower body dressing, integrated energy conservation principles",
          "Lower body dressing task training with focus on applied visual scanning throughout sequence",
          "During lower body dressing, combined learned strategies across multiple trials",
        ],
      },
      compensatoryTechniques: {
        title: "Compensatory Techniques",
        activities: [
          "Lower body dressing task training with focus on used seated position for stability during foot care",
          "During lower body dressing, implemented alternative fastener management",
          "Lower body dressing task training with focus on applied one-handed techniques when needed",
          "During lower body dressing, used wall support for standing balance",
          "Lower body dressing task training with focus on implemented preparatory weight shifting",
          "During lower body dressing, used visual guides for alignment",
          "Lower body dressing task training with focus on applied energy conservation principles",
          "During lower body dressing, modified sequence based on endurance",
        ],
      },
    },
    analysis: [
      "Assessed patient's current lower body dressing routine",
      "Evaluated lower extremity range of motion and strength",
      "Identified challenges in managing socks and shoes",
      "Analyzed patient's seated and standing balance during dressing",
      "Assessed energy expenditure during lower body dressing tasks",
    ],
    positioning: [
      "Optimized bed or chair height for lower body dressing",
      "Arranged clothing and adaptive equipment within reach",
      "Positioned footwear for easy access and manipulation",
      "Modified environment to support safe standing balance",
      "Arranged visual cues for proper foot placement",
    ],
    adaptations: [
      "Introduced long-handled shoe horn for independent shoe donning",
      "Implemented use of sock aid for easier sock application",
      "Adapted clothing choices for easier management (e.g., elastic waistbands)",
      "Modified existing clothing with larger pulls or loops",
      "Introduced reacher for retrieving dropped items during dressing",
    ],
    compensatoryTechniques: [
      "Taught seated dressing techniques for improved stability",
      "Instructed in energy conservation principles during lower body dressing",
      "Demonstrated alternative methods for managing zippers and buttons",
      "Practiced one-handed techniques for affected lower extremity",
      "Introduced visual scanning strategies for proper garment orientation",
    ],
  },
  bathing: {
    title: "Bathing/Showering",
    categories: {
      movementComponents: {
        title: "Movement Components",
        activities: [
          "Bathing/showering task training with focus on facilitated upper body washing patterns",
          "During bathing/showering, guided lower extremity washing sequence",
          "Bathing/showering task training with focus on promoted balance during standing tasks",
          "During bathing/showering, facilitated reaching patterns for all body parts",
          "Bathing/showering task training with focus on guided weight shifting during washing tasks",
          "During bathing/showering, promoted bilateral arm use during hair washing",
          "Bathing/showering task training with focus on facilitated trunk rotation for back access",
        ],
      },
      positioningSetup: {
        title: "Positioning & Setup",
        activities: [
          "Bathing/showering task training with focus on modified shower chair position",
          "During bathing/showering, arranged supplies within safe reach",
          "Bathing/showering task training with focus on positioned grab bars for optimal use",
          "During bathing/showering, setup non-slip surfaces strategically",
          "Bathing/showering task training with focus on organized supplies in use sequence",
          "During bathing/showering, modified water controls for access",
          "Bathing/showering task training with focus on arranged long-handled tool placement",
          "During bathing/showering, positioned visual cues for task sequence",
        ],
      },
      taskAdaptationsStrategies: {
        title: "Task Adaptations & Strategies",
        activities: [
          "Bathing/showering task training with focus on modified washing patterns for efficiency",
          "During bathing/showering, segmented bathing tasks by position",
          "Bathing/showering task training with focus on adapted tool use techniques",
          "During bathing/showering, modified product access methods",
          "Bathing/showering task training with focus on structured task sequence for safety",
          "During bathing/showering, adapted water management techniques",
          "Bathing/showering task training with focus on modified drying techniques",
          "During bathing/showering, adapted hair care methods",
        ],
      },
      problemSolvingLearning: {
        title: "Problem-Solving & Learning",
        activities: [
          "Bathing/showering task training with focus on identified safe reaching patterns",
          "During bathing/showering, analyzed energy conservation needs",
          "Bathing/showering task training with focus on developed strategies for tool use",
          "During bathing/showering, problem-solved methods for back care",
          "Bathing/showering task training with focus on practiced techniques for safe transfers",
          "During bathing/showering, identified optimal task sequencing",
          "Bathing/showering task training with focus on developed methods for water management",
          "During bathing/showering, problem-solved safety strategies",
        ],
      },
      functionalIntegration: {
        title: "Functional Integration",
        activities: [
          "Bathing/showering task training with focus on combined seated/standing tasks appropriately",
          "During bathing/showering, applied safety strategies throughout",
          "Bathing/showering task training with focus on integrated tool use efficiently",
          "During bathing/showering, combined positional changes safely",
          "Bathing/showering task training with focus on applied energy conservation principles",
          "During bathing/showering, integrated balance strategies throughout",
          "Bathing/showering task training with focus on applied learned sequences consistently",
          "During bathing/showering, combined multiple tasks safely",
        ],
      },
      compensatoryTechniques: {
        title: "Compensatory Techniques",
        activities: [
          "Bathing/showering task training with focus on used long-handled tool adaptations",
          "During bathing/showering, implemented seated washing techniques",
          "Bathing/showering task training with focus on applied stabilization methods",
          "During bathing/showering, used guide patterns for thorough cleaning",
          "Bathing/showering task training with focus on implemented alternative product access",
          "During bathing/showering, modified task sequence for efficiency",
          "Bathing/showering task training with focus on used sensory compensation strategies",
          "During bathing/showering, applied energy conservation methods",
        ],
      },
    },
    analysis: [
      "Assessed patient's current bathing/showering routine",
      "Evaluated bathroom environment for safety and accessibility",
      "Identified areas of difficulty in reaching and self-care tasks",
      "Analyzed patient's balance and endurance during bathing activities",
      "Assessed ability to manage water controls and bathing products",
    ],
    positioning: [
      "Optimized shower chair or tub bench placement for safety and efficiency",
      "Arranged bathing supplies within safe and easy reach",
      "Positioned grab bars for optimal support during transfers and standing tasks",
      "Modified shower head height and angle for improved access",
      "Arranged visual cues for task sequencing and safety reminders",
    ],
    adaptations: [
      "Introduced long-handled sponge or brush for extended reach",
      "Implemented use of handheld shower head for directed water flow",
      "Adapted product containers for easier opening and dispensing",
      "Modified existing fixtures with lever handles for easier operation",
      "Introduced non-slip mats for improved safety on wet surfaces",
    ],
    compensatoryTechniques: [
      "Taught seated bathing techniques for energy conservation",
      "Instructed in safe transfer methods for tub or shower entry/exit",
      "Demonstrated alternative washing techniques for hard-to-reach areas",
      "Practiced one-handed hair washing and rinsing methods",
      "Introduced systematic washing routine to ensure thorough cleaning",
    ],
  },
  grooming: {
    title: "Grooming/Hygiene",
    categories: {
      movementComponents: {
        title: "Movement Components",
        activities: [
          "Grooming/hygiene task training with focus on facilitated shoulder flexion during hair care",
          "During grooming/hygiene, guided elbow positioning during teeth brushing",
          "Grooming/hygiene task training with focus on promoted wrist control during tool manipulation",
          "During grooming/hygiene, facilitated head/neck positioning during face washing",
          "Grooming/hygiene task training with focus on guided weight shifting during sink tasks",
          "During grooming/hygiene, promoted bilateral hand coordination",
          "Grooming/hygiene task training with focus on facilitated reaching patterns at mirror",
          "During grooming/hygiene, guided fine motor control during tool use",
        ],
      },
      positioningSetup: {
        title: "Positioning & Setup",
        activities: [
          "Grooming/hygiene task training with focus on modified sink height accessibility",
          "During grooming/hygiene, arranged tools in optimal reach pattern",
          "Grooming/hygiene task training with focus on positioned mirror for visual feedback",
          "During grooming/hygiene, setup supported standing position",
          "Grooming/hygiene task training with focus on organized supplies in use sequence",
          "During grooming/hygiene, modified counter height for task support",
          "Grooming/hygiene task training with focus on arranged lighting for optimal visibility",
          "During grooming/hygiene, positioned stability supports as needed",
        ],
      },
      taskAdaptationsStrategies: {
        title: "Task Adaptations & Strategies",
        activities: [
          "Grooming/hygiene task training with focus on modified tool grips for easier manipulation",
          "During grooming/hygiene, segmented grooming sequence",
          "Grooming/hygiene task training with focus on adapted technique for one-handed completion",
          "During grooming/hygiene, modified products for easier dispensing",
          "Grooming/hygiene task training with focus on structured task sequence for energy conservation",
          "During grooming/hygiene, adapted mirror position for limited neck ROM",
          "Grooming/hygiene task training with focus on modified water control methods",
          "During grooming/hygiene, adapted hair care techniques",
        ],
      },
      problemSolvingLearning: {
        title: "Problem-Solving & Learning",
        activities: [
          "Grooming/hygiene task training with focus on identified efficient tool use methods",
          "During grooming/hygiene, analyzed challenging steps in sequence",
          "Grooming/hygiene task training with focus on developed strategies for product management",
          "During grooming/hygiene, problem-solved methods for tool grip",
          "Grooming/hygiene task training with focus on practiced techniques for water control",
          "During grooming/hygiene, identified optimal task positioning",
          "Grooming/hygiene task training with focus on developed methods for supply organization",
          "During grooming/hygiene, problem-solved vision compensation",
        ],
      },
      functionalIntegration: {
        title: "Functional Integration",
        activities: [
          "Grooming/hygiene task training with focus on combined techniques for morning routine",
          "During grooming/hygiene, applied strategies across varied tools",
          "Grooming/hygiene task training with focus on integrated compensatory methods",
          "During grooming/hygiene, combined standing/seated methods as needed",
          "Grooming/hygiene task training with focus on applied organization strategies to home setup",
          "During grooming/hygiene, integrated energy conservation throughout",
          "Grooming/hygiene task training with focus on applied safety awareness consistently",
          "During grooming/hygiene, combined multiple tasks efficiently",
        ],
      },
    },
    analysis: [
      "Assessed patient's current grooming and hygiene routine",
      "Evaluated fine motor skills required for various grooming tasks",
      "Identified areas of difficulty in tool manipulation and product use",
      "Analyzed patient's posture and endurance during extended grooming activities",
      "Assessed ability to perform grooming tasks with limited vision or sensation",
    ],
    positioning: [
      "Optimized counter or sink height for comfortable access",
      "Arranged grooming tools and products for efficient use",
      "Positioned mirrors at appropriate heights for seated or standing use",
      "Modified lighting to enhance visibility during detailed tasks",
      "Arranged seating or support structures for prolonged grooming activities",
    ],
    adaptations: [
      "Introduced built-up handles on grooming tools for improved grip",
      "Implemented use of electric toothbrush or razor for easier manipulation",
      "Adapted product containers with pump dispensers for one-handed use",
      "Modified existing fixtures with lever handles for easier operation",
      "Introduced magnifying mirror for detailed grooming tasks",
    ],
    compensatoryTechniques: [
      "Taught one-handed hair brushing and styling techniques",
      "Instructed in energy conservation principles during grooming routine",
      "Demonstrated alternative methods for applying makeup or shaving",
      "Practiced seated grooming techniques for improved stability and endurance",
      "Introduced systematic grooming routine to ensure comprehensive care",
    ],
  },
}

// Export types and functions
export type SelfCareCategoryType = keyof typeof selfCareActivities
// Update the type definition
export type SelfCareSubCategory<T extends SelfCareCategoryType> =
  | keyof (typeof selfCareActivities)[T]["categories"]
  | "analysis"
  | "positioning"
  | "adaptations"
  | "compensatoryTechniques"

export const getAllSelfCareCategories = () => {
  return Object.entries(selfCareActivities).map(([key, value]) => ({
    id: key,
    title: value.title,
  }))
}

export const getSelfCareSubcategories = (category: SelfCareCategoryType) => {
  if (!selfCareActivities[category]) {
    console.error(`Invalid category: ${category}`)
    return []
  }
  const categorySubcategories = Object.entries(selfCareActivities[category].categories).map(([key, value]) => ({
    id: key,
    title: value.title,
  }))
  const additionalCategories = ["analysis", "positioning", "adaptations", "compensatoryTechniques"]
  return [
    ...categorySubcategories,
    ...additionalCategories.map((cat) => ({ id: cat, title: cat.charAt(0).toUpperCase() + cat.slice(1) })),
  ]
}

// Update the utility functions to include the new categories
export const getSelfCareInterventions = (
  category: SelfCareCategoryType,
  subcategory: SelfCareSubCategory<SelfCareCategoryType>,
): string[] => {
  if (category in selfCareActivities) {
    if (subcategory in selfCareActivities[category].categories) {
      return selfCareActivities[category].categories[subcategory].activities
    } else if (subcategory in selfCareActivities[category]) {
      return selfCareActivities[category][subcategory as keyof Activity] || []
    }
  }
  console.error(`Invalid category or subcategory: ${category}, ${subcategory}`)
  return []
}

export { selfCareActivities }
export { selfCareActivities as selfCareInterventions }

