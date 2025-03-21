import meta from "../../../pages/_meta.ts";
import building_with_passport_meta from "../../../pages/building-with-passport/_meta.ts";
import building_with_passport_major_concepts_meta from "../../../pages/building-with-passport/major-concepts/_meta.ts";
import building_with_passport_model_based_detection_meta from "../../../pages/building-with-passport/model-based-detection/_meta.ts";
import building_with_passport_passport_api_v1_meta from "../../../pages/building-with-passport/passport-api-v1/_meta.ts";
import building_with_passport_passport_api_v1_tutorials_meta from "../../../pages/building-with-passport/passport-api-v1/tutorials/_meta.ts";
import building_with_passport_passport_api_meta from "../../../pages/building-with-passport/passport-api/_meta.ts";
import building_with_passport_smart_contracts_meta from "../../../pages/building-with-passport/smart-contracts/_meta.ts";
import community_meta from "../../../pages/community/_meta.ts";
import overview_meta from "../../../pages/overview/_meta.ts";
import stamps_meta from "../../../pages/stamps/_meta.ts";
export const pageMap = [{
  data: meta
}, {
  name: "building-with-passport",
  route: "/building-with-passport",
  children: [{
    data: building_with_passport_meta
  }, {
    name: "composedb",
    route: "/building-with-passport/composedb",
    frontMatter: {
      "sidebarTitle": "Composedb"
    }
  }, {
    name: "custom-passport",
    route: "/building-with-passport/custom-passport",
    frontMatter: {
      "title": "Custom Passport",
      "description": "Build a custom Passport dashboard around your ecosystem's unique needs."
    }
  }, {
    name: "introduction",
    route: "/building-with-passport/introduction",
    frontMatter: {
      "title": "Human Passport Developer Platform",
      "description": "An overview of the developer tools made available by Human Passport."
    }
  }, {
    name: "major-concepts",
    route: "/building-with-passport/major-concepts",
    children: [{
      data: building_with_passport_major_concepts_meta
    }, {
      name: "api-pagination",
      route: "/building-with-passport/major-concepts/api-pagination",
      frontMatter: {
        "title": "API pagination",
        "description": "Learn how to paginate through API responses."
      }
    }, {
      name: "credential-map-and-weights",
      route: "/building-with-passport/major-concepts/credential-map-and-weights",
      frontMatter: {
        "title": "Credential Map and Weights",
        "description": "The Stamp-based verification system uses a set of Stamps and underlying weighted credentials to determine the score of a Passport."
      }
    }, {
      name: "deduplicating-stamps",
      route: "/building-with-passport/major-concepts/deduplicating-stamps",
      frontMatter: {
        "title": "Deduplicating Stamps",
        "description": "Stamp deduplication is important for preventing users from using the same Stamps across multiple Passports to influence some specific outcome."
      }
    }, {
      name: "educating-users",
      route: "/building-with-passport/major-concepts/educating-users",
      frontMatter: {
        "title": "Educating users",
        "description": "Best practices for educating users about Passport."
      }
    }, {
      name: "expirations",
      route: "/building-with-passport/major-concepts/expirations",
      frontMatter: {
        "sidebarTitle": "Expirations"
      }
    }, {
      name: "scoring-thresholds",
      route: "/building-with-passport/major-concepts/scoring-thresholds",
      frontMatter: {
        "title": "Scoring thresholds",
        "description": "Explanation of the thresholds used to asess Passports."
      }
    }]
  }, {
    name: "model-based-detection",
    route: "/building-with-passport/model-based-detection",
    children: [{
      data: building_with_passport_model_based_detection_meta
    }, {
      name: "api-reference",
      route: "/building-with-passport/model-based-detection/api-reference",
      frontMatter: {
        "title": "API reference",
        "description": "Reference documentation for the Model Based Detection API."
      }
    }, {
      name: "available-models",
      route: "/building-with-passport/model-based-detection/available-models",
      frontMatter: {
        "title": "Available models and recommended scores",
        "description": "This page describes which models are currently accessible via the Model Based Detection API, and which score thresholds should be used to identify likely Sybils or Humans."
      }
    }, {
      name: "getting-access",
      route: "/building-with-passport/model-based-detection/getting-access",
      frontMatter: {
        "title": "Getting access to the MBD API",
        "description": "Explainer for how to get access to the MBD API."
      }
    }, {
      name: "overview",
      route: "/building-with-passport/model-based-detection/overview",
      frontMatter: {
        "title": "Model Based Detection API [BETA]",
        "description": "The Model Based Detection API enables partners to utilize Passport-grade supervised machine learning models to identify Sybils vs humans."
      }
    }, {
      name: "tutorials",
      route: "/building-with-passport/model-based-detection/tutorials",
      children: [{
        name: "double-verification",
        route: "/building-with-passport/model-based-detection/tutorials/double-verification",
        frontMatter: {
          "title": "Double Verification with the Model Based Detection and Stamp-based APIs",
          "description": "This tutorial introduces the model-based detection and stamp-based double-verification method"
        }
      }]
    }]
  }, {
    name: "passport-api",
    route: "/building-with-passport/passport-api",
    children: [{
      data: building_with_passport_passport_api_meta
    }, {
      name: "api-reference",
      route: "/building-with-passport/passport-api/api-reference",
      frontMatter: {
        "title": "Passport API v2 -- API reference",
        "description": "Reference documentation for the Passport API v2"
      }
    }, {
      name: "data-dictionary",
      route: "/building-with-passport/passport-api/data-dictionary",
      frontMatter: {
        "title": "Data dictionary (v2)",
        "description": "A table for looking up definitions of data types used in the Passport API v2"
      }
    }, {
      name: "getting-access",
      route: "/building-with-passport/passport-api/getting-access",
      frontMatter: {
        "title": "Getting access to the Passport API v2",
        "description": "Explainer for how to get access to the Passport API v2."
      }
    }, {
      name: "migrate",
      route: "/building-with-passport/passport-api/migrate",
      frontMatter: {
        "title": "Passport API migration guide",
        "description": "This guide explains the differences between v1 and v2 of the Passport API"
      }
    }, {
      name: "overview",
      route: "/building-with-passport/passport-api/overview",
      frontMatter: {
        "title": "Passport API v2 overview",
        "description": "General overview of the Passport API v2"
      }
    }, {
      name: "quick-start-guide",
      route: "/building-with-passport/passport-api/quick-start-guide",
      frontMatter: {
        "title": "Passport API v2 quick start guide",
        "description": "Beginner guide covering the basics of the Passport API v2."
      }
    }, {
      name: "status-and-error-codes",
      route: "/building-with-passport/passport-api/status-and-error-codes",
      frontMatter: {
        "title": "Status and error codes",
        "description": "Reference documentation for the status and error codes returned from the Passport API."
      }
    }]
  }, {
    name: "passport-api-v1",
    route: "/building-with-passport/passport-api-v1",
    children: [{
      data: building_with_passport_passport_api_v1_meta
    }, {
      name: "api-reference",
      route: "/building-with-passport/passport-api-v1/api-reference",
      frontMatter: {
        "title": "Passport API v1 -- API reference",
        "description": "Reference documentation for the Passport API v1"
      }
    }, {
      name: "data-dictionary",
      route: "/building-with-passport/passport-api-v1/data-dictionary",
      frontMatter: {
        "title": "Data dictionary (v1)",
        "description": "A table for looking up definitions of data types used in the Passport API v1"
      }
    }, {
      name: "overview",
      route: "/building-with-passport/passport-api-v1/overview",
      frontMatter: {
        "title": "Passport API v1 overview",
        "description": "General overview of the Passport API v1"
      }
    }, {
      name: "tutorials",
      route: "/building-with-passport/passport-api-v1/tutorials",
      children: [{
        data: building_with_passport_passport_api_v1_tutorials_meta
      }, {
        name: "client-side-scoring",
        route: "/building-with-passport/passport-api-v1/tutorials/client-side-scoring",
        frontMatter: {
          "title": "Client-side scoring tutorial",
          "description": "This tutorial introduces client-side scoring"
        }
      }, {
        name: "gating-access-with-passport-scores",
        route: "/building-with-passport/passport-api-v1/tutorials/gating-access-with-passport-scores",
        frontMatter: {
          "title": "Protecting access with Passport scores",
          "description": "Learn how to use Passport scores to protect access to your app."
        }
      }, {
        name: "integrating-stamps-and-scorers",
        route: "/building-with-passport/passport-api-v1/tutorials/integrating-stamps-and-scorers",
        frontMatter: {
          "title": "Integrating Stamps and Scores",
          "description": "Tutorial covering how to use Stamp and Score data in your apps."
        }
      }, {
        name: "requiring-a-passport-score-for-airdrop-claim",
        route: "/building-with-passport/passport-api-v1/tutorials/requiring-a-passport-score-for-airdrop-claim",
        frontMatter: {
          "title": "Requiring a Passport score to qualify for airdrops",
          "description": "Explore this detailed guide, demonstrating how you can effectively utilize Passport scores to guard against Sybil attacks on an airdrop."
        }
      }, {
        name: "working-with-stamp-metadata",
        route: "/building-with-passport/passport-api-v1/tutorials/working-with-stamp-metadata",
        frontMatter: {
          "title": "Working with Stamp metadata",
          "description": "How to retrieve, handle and display Stamp metadata in a simple Nextjs app."
        }
      }]
    }, {
      name: "tutorials",
      route: "/building-with-passport/passport-api-v1/tutorials",
      frontMatter: {
        "title": "Tutorials (v1)",
        "description": "Landing page for the Passport API v1 tutorials."
      }
    }]
  }, {
    name: "smart-contracts",
    route: "/building-with-passport/smart-contracts",
    children: [{
      data: building_with_passport_smart_contracts_meta
    }, {
      name: "attestation-schema",
      route: "/building-with-passport/smart-contracts/attestation-schema",
      frontMatter: {
        "title": "Attestation schema",
        "description": "Reference documentation for the Attestation schema used in Passport's smart contract stack."
      }
    }, {
      name: "contract-reference",
      route: "/building-with-passport/smart-contracts/contract-reference",
      frontMatter: {
        "title": "Smart contract reference",
        "description": "Reference documentation for Human Passport's smart contracts."
      }
    }, {
      name: "integrating-onchain-stamp-data",
      route: "/building-with-passport/smart-contracts/integrating-onchain-stamp-data",
      frontMatter: {
        "title": "Integrating onchain Stamp data",
        "description": "A tutorial demonstrating how to integrate onchain Stamp data into your apps."
      }
    }, {
      name: "onchain-expirations",
      route: "/building-with-passport/smart-contracts/onchain-expirations",
      frontMatter: {
        "title": "Onchain expirations",
        "description": "Learn more about how to handle onchain Passport expirations"
      }
    }, {
      name: "overview",
      route: "/building-with-passport/smart-contracts/overview",
      frontMatter: {
        "title": "Smart contract overview",
        "description": "A general overview of Human Passport's onchain technology stack."
      }
    }, {
      name: "quick-start-guide",
      route: "/building-with-passport/smart-contracts/quick-start-guide",
      frontMatter: {
        "title": "Smart contract quick start guide",
        "description": "Quick start guide to get you up and running with Human Passport's smart contracts."
      }
    }, {
      name: "test-mode",
      route: "/building-with-passport/smart-contracts/test-mode",
      frontMatter: {
        "title": "Test mode",
        "description": "How to test the onchain infrastructure"
      }
    }]
  }]
}, {
  name: "community",
  route: "/community",
  children: [{
    data: community_meta
  }, {
    name: "getting-involved",
    route: "/community/getting-involved",
    frontMatter: {
      "title": "Getting Involved",
      "description": "How to contribute to Human Passport"
    }
  }, {
    name: "passport-github-projects",
    route: "/community/passport-github-projects",
    frontMatter: {
      "title": "Passport GitHub Projects",
      "description": "A list of Human Passport's GitHub projects."
    }
  }, {
    name: "style-guide",
    route: "/community/style-guide",
    frontMatter: {
      "title": "Style guide",
      "description": "The stylistic guidelines to follow when contributing to these docs."
    }
  }]
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "title": "Human Passport Documentation",
    "description": "Documentation for the Human Passport developer platform."
  }
}, {
  name: "overview",
  route: "/overview",
  children: [{
    data: overview_meta
  }, {
    name: "active-integrations",
    route: "/overview/active-integrations",
    frontMatter: {
      "title": "Active integrations",
      "description": "A list of partners who have active integrations with Passport, and links to guides."
    }
  }, {
    name: "key-terms",
    route: "/overview/key-terms",
    frontMatter: {
      "title": "Key terms",
      "description": "A glossary of key terms related to Human Passport"
    }
  }, {
    name: "use-cases",
    route: "/overview/use-cases",
    frontMatter: {
      "title": "Use cases",
      "description": "A collection of potential scenarios where Human Passport can solve real business problems."
    }
  }, {
    name: "why-passport-xyz",
    route: "/overview/why-passport-xyz",
    frontMatter: {
      "title": "Why Human Passport",
      "description": "A short explanation of why we are building Human Passport."
    }
  }]
}, {
  name: "stamps",
  route: "/stamps",
  children: [{
    data: stamps_meta
  }, {
    name: "integrating-a-new-stamp",
    route: "/stamps/integrating-a-new-stamp",
    frontMatter: {
      "title": "Submitting a Stamp pull request",
      "description": "Instructions for submitting a Stamp pull request for approved partners"
    }
  }, {
    name: "overview",
    route: "/stamps/overview",
    frontMatter: {
      "title": "Stamps developer overview",
      "description": "Instructions for creating new Stamps"
    }
  }]
}];