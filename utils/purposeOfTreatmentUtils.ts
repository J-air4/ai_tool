import { purposeOfTreatment } from "../data/purposeOfTreatment"

export function generateDynamicPurposeOfTreatment(
  noteType: "self-care" | "therapeutic-activities",
  selectedInterventions: string[],
): Record<string, string[]> {
  const dynamicPurpose: Record<string, string[]> = {}

  // Always include these general categories
  dynamicPurpose["Pain Management"] = purposeOfTreatment["Pain Management"]
  dynamicPurpose["Cognitive Function"] = purposeOfTreatment["Cognitive Function"]

  if (selectedInterventions.length === 0) {
    // If no interventions are selected, include all relevant categories
    if (noteType === "self-care") {
      dynamicPurpose["Activities of Daily Living"] = purposeOfTreatment["Activities of Daily Living"]
    } else {
      dynamicPurpose["Functional Mobility"] = purposeOfTreatment["Functional Mobility"]
      dynamicPurpose["Strength and Endurance"] = purposeOfTreatment["Strength and Endurance"]
    }
    return dynamicPurpose
  }

  if (noteType === "self-care") {
    if (selectedInterventions.some((intervention) => intervention.toLowerCase().includes("dressing"))) {
      dynamicPurpose["Dressing"] = [
        "Improve independence in dressing tasks",
        "Enhance upper body dressing skills",
        "Improve lower body dressing techniques",
        "Increase efficiency in managing fasteners",
        "Enhance ability to select appropriate clothing",
      ]
    }

    if (selectedInterventions.some((intervention) => intervention.toLowerCase().includes("bathing"))) {
      dynamicPurpose["Bathing"] = [
        "Increase independence in bathing activities",
        "Improve safety during bathing tasks",
        "Enhance upper body washing techniques",
        "Improve lower body washing skills",
        "Increase efficiency in water and soap management",
      ]
    }

    if (selectedInterventions.some((intervention) => intervention.toLowerCase().includes("grooming"))) {
      dynamicPurpose["Grooming"] = [
        "Enhance independence in grooming tasks",
        "Improve fine motor skills for grooming activities",
        "Increase efficiency in oral hygiene routines",
        "Enhance hair care techniques",
        "Improve management of grooming tools",
      ]
    }

    // Always include the general ADL category for self-care
    dynamicPurpose["Activities of Daily Living"] = purposeOfTreatment["Activities of Daily Living"]
  } else if (noteType === "therapeutic-activities") {
    if (selectedInterventions.some((intervention) => intervention.toLowerCase().includes("balance"))) {
      dynamicPurpose["Balance"] = [
        "Improve static balance",
        "Enhance dynamic balance during functional tasks",
        "Increase confidence in balance-challenging situations",
        "Improve postural control",
        "Enhance ability to recover from balance perturbations",
      ]
    }

    if (selectedInterventions.some((intervention) => intervention.toLowerCase().includes("strength"))) {
      dynamicPurpose["Strength"] = purposeOfTreatment["Strength and Endurance"]
    }

    if (selectedInterventions.some((intervention) => intervention.toLowerCase().includes("coordination"))) {
      dynamicPurpose["Coordination"] = [
        "Improve bilateral coordination",
        "Enhance fine motor coordination",
        "Improve gross motor coordination",
        "Increase accuracy in targeted movements",
        "Enhance timing and sequencing of movements",
      ]
    }

    // Always include Functional Mobility for therapeutic activities
    dynamicPurpose["Functional Mobility"] = purposeOfTreatment["Functional Mobility"]
  }

  return dynamicPurpose
}

