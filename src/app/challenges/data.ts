import { Challenge } from "~/types/challenge";

export const challenges: Challenge[] = [
  {
    id: "1",
    title: "Simply Square",
    description: "Start with the basics - create a perfect square",
    targetHtml: `<div class="square"></div>`,
    targetCss: `.square {
  width: 100px;
  height: 100px;
  background: #b5e0ba;
}`,
    starterHtml: `<div class="square"></div>`,
    starterCss: `.square {
  /* Add your styles here */
  width: 100px;
  height: 100px;
  background: #b5e0ba;
}`,
    backgroundColor: "#5d3a3a",
    foregroundColor: "#b5e0ba",
    optimalCodeLength: 75,
    difficulty: "easy",
    tags: ["basics", "square"],
    validation: {
      requiredSelectors: [".square"],
      maxElements: 1
    }
  },
  {
    id: "2",
    title: "Carrom",
    description: "Create four squares in the corners",
    targetHtml: `<div class="squares"></div>`,
    targetCss: `.squares {
  width: 50px;
  height: 50px;
  background: #fdc57b;
  box-shadow: 250px 0 #fdc57b, 0 150px #fdc57b, 250px 150px #fdc57b;
}`,
    starterHtml: `<div class="squares"></div>`,
    starterCss: `.squares {
  /* Create four squares using box-shadow */
  width: 50px;
  height: 50px;
  background: #fdc57b;
}`,
    backgroundColor: "#62374e",
    foregroundColor: "#fdc57b",
    optimalCodeLength: 125,
    difficulty: "medium",
    tags: ["box-shadow", "positioning"],
    validation: {
      requiredSelectors: [".squares"],
      maxElements: 1
    }
  },
  {
    id: "3",
    title: "Push Button",
    description: "Create a circular button with rings",
    targetHtml: `<div class="circle"></div>`,
    targetCss: `.circle {
  width: 100px;
  height: 100px;
  background: #6592cf;
  border-radius: 50%;
  border: 20px solid #243d83;
  outline: 20px solid #6592cf;
}`,
    starterHtml: `<div class="circle"></div>`,
    starterCss: `.circle {
  /* Create a circular button with rings */
  width: 100px;
  height: 100px;
  background: #6592cf;
}`,
    backgroundColor: "#243d83",
    foregroundColor: "#6592cf",
    optimalCodeLength: 150,
    difficulty: "medium",
    tags: ["border-radius", "outline", "border"],
    validation: {
      requiredSelectors: [".circle"],
      maxElements: 1
    }
  },
  {
    id: "4",
    title: "Ups n Downs",
    description: "Create three curved lines",
    targetHtml: `<div class="curve"></div>
<div class="curve"></div>
<div class="curve"></div>`,
    targetCss: `.curve {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 20px solid #243d83;
  border-bottom: 0;
  margin: 20px;
}

.curve:nth-child(2) {
  transform: rotate(180deg);
}`,
    starterHtml: `<div class="curve"></div>
<div class="curve"></div>
<div class="curve"></div>`,
    starterCss: `.curve {
  /* Style the curved lines */
  width: 100px;
  height: 100px;
}`,
    backgroundColor: "#62306d",
    foregroundColor: "#f7ec7d",
    optimalCodeLength: 200,
    difficulty: "hard",
    tags: ["border-radius", "transform", "nth-child"],
    validation: {
      requiredSelectors: [".curve"],
      requiredElements: ["div"],
      maxElements: 3
    }
  },
  {
    id: "5",
    title: "Acid Rain",
    description: "Create three droplets",
    targetHtml: `<div class="drop"></div>
<div class="drop"></div>
<div class="drop"></div>`,
    targetCss: `.drop {
  width: 80px;
  height: 80px;
  background: #f3ac3c;
  border-radius: 50% 50% 0 50%;
  transform: rotate(-45deg);
  margin: 10px;
}

.drop:nth-child(2) {
  transform: rotate(45deg);
}

.drop:nth-child(3) {
  transform: rotate(135deg);
}`,
    starterHtml: `<div class="drop"></div>
<div class="drop"></div>
<div class="drop"></div>`,
    starterCss: `.drop {
  /* Style the droplets */
  width: 80px;
  height: 80px;
  background: #f3ac3c;
}`,
    backgroundColor: "#0b2429",
    foregroundColor: "#f3ac3c",
    optimalCodeLength: 250,
    difficulty: "hard",
    tags: ["border-radius", "transform", "nth-child"],
    validation: {
      requiredSelectors: [".drop"],
      requiredElements: ["div"],
      maxElements: 3
    }
  }
] as const;
