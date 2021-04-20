const caseData = require("../../backend/data/good_data/case_data.json");
const cpuData = require("../../backend/data/good_data/cpu_data.json");
// const gpuData = require("../../backend/data/good_data/gpu_data.json");
const memoryData = require("../../backend/data/good_data/memory_data.json");
const mbData = require("../../backend/data/good_data/motherboard_data.json");
const psuData = require("../../backend/data/good_data/power_supply_data.json");
const storageData = require("../../backend/data/good_data/storage_data.json");
const Fuse = require("fuse.js");

const BUDGET = {
  gpu: 0.4,
  cpu: 0.2,
  memory: 0.1,
  motherboard: 0.1,
  powerSupply: 0.1,
  storage: 0.05,
  case: 0.05,
};

const SOCKETS = ["AM4", "TR4", "sTRX4", "LGA1151", "LGA2066", "LGA1200"]

const buildComputer = (requirements, budget) => {
  let cpu = [];
  let gpu = [];
  let memory = [];
  requirements.forEach((sysReq) => {
    cpu.push(sysReq.intelCpu);
    cpu.push(sysReq.amdCpu);

    gpu.push(sysReq.nvidiaGpu);
    gpu.push(sysReq.amdGpu);

    memory.push(sysReq.memory);
  });

  const foundCpu = findCpu(cpu, budget);
  const gpuPlaceholder = {
    name: "Placeholder",
    image:
      "https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    store: "Placeholder",
    price: `$${budget * BUDGET.gpu}`,
  };

  return {
    CPU: findCpu(cpu, budget),
    GPU: gpuPlaceholder,
    Memory: findPart("Memory", budget * BUDGET.memory, memoryData),
    Case: findPart("Case", budget * BUDGET.case, caseData),
    "Power Supply": findPart(
      "Power Supply",
      budget * BUDGET.powerSupply,
      psuData
    ),
    Storage: findPart("Storage", budget * BUDGET.storage, storageData),
    Motherboard: findMotherboard(budget * BUDGET.motherboard, foundCpu.name),
  };
};

const findCpu = (cpuList, budget) => {
  const cpu = Object.keys(cpuData);
  const fuse = new Fuse(cpu);
  const cpuBudget = budget * BUDGET.cpu;

  let cpuReq = [];
  cpuList.forEach((cpu) => {
    result = fuse.search(cpu);
    cpuReq.push(cpuData[result[0].item].part_info);
  });

  let cpuInfo = { coreClocks: [], coreCounts: [] };
  cpuReq.forEach((requirement) => {
    cpuInfo.coreClocks.push(requirement["Core Clock"]);
    cpuInfo.coreCounts.push(requirement["Core Count"]);
  });

  cpuInfo.coreClocks
    .sort((a, b) => {
      return parseFloat(a.split(" ")[0], 10) - parseFloat(b.split(" ")[0], 10);
    })
    .reverse();

  cpuInfo.coreCounts
    .sort((a, b) => {
      return parseInt(a, 10) - parseInt(b, 10);
    })
    .reverse();

  const requirement = {
    coreClock: parseFloat(cpuInfo.coreClocks[0].split(" ")[0], 10),
    coreCount: parseInt(cpuInfo.coreCounts[0], 10),
  };

  let possibleCpu = {};
  for (const cpu in cpuData) {
    if (SOCKETS.indexOf(cpuData[cpu]["part_info"]["Socket"]) != -1) {
      if (
        parseFloat(cpuData[cpu].part_info["Core Clock"].split(" ")[0], 10) >=
          requirement.coreClock &&
        parseInt(cpuData[cpu].part_info["Core Count"], 10) ===
          requirement.coreCount
      ) {
        if (Object.keys(cpuData[cpu].buying_info).length > 0) {
          possibleCpu[cpu] = cpuData[cpu];
        }
      }
    }
  }

  let cpuInBudget = [];
  for (const cpu in possibleCpu) {
    let buyLinks = [];
    for (buyLink in possibleCpu[cpu].buying_info) {
      const price = Number(
        possibleCpu[cpu].buying_info[buyLink].replace(/[^0-9.-]+/g, "")
      );
      buyLinks.push([buyLink, price]);
    }

    buyLinks.sort((a, b) => {
      return a[1] - b[1];
    });

    let imageLink = possibleCpu[cpu].image_link;

    if (imageLink.includes("//cdna")) {
      imageLink = imageLink.replace("//cdna", "https://cdna");
    } else if (imageLink === "/static/forever/img/no-image.png") {
      imageLink =
        "https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
    }

    if (buyLinks[0][1] <= cpuBudget) {
      cpuInBudget.push({
        name: cpu,
        image: imageLink,
        link: buyLinks[0][0],
        store: buyLinks[0][0].split("mr/")[1].split("/")[0].toUpperCase(),
        price: `$${buyLinks[0][1]}`,
      });
    }
  }

  cpuInBudget
    .sort((a, b) => {
      return (
        Number(a.price.replace(/[^0-9.-]+/g, "")) -
        Number(b.price.replace(/[^0-9.-]+/g, ""))
      );
    })
    .reverse();

  return cpuInBudget[0];
};

const findPart = (part, budget, data) => {
  let buyable = [];

  for (const partName in data) {
    if (Object.keys(data[partName].buying_info).length > 0) {
      let buyLinks = [];
      for (buyLink in data[partName].buying_info) {
        const price = Number(
          data[partName].buying_info[buyLink].replace(/[^0-9.-]+/g, "")
        );
        buyLinks.push([buyLink, price]);
      }

      buyLinks.sort((a, b) => {
        return a[1] - b[1];
      });

      let imageLink = data[partName].image_link;

      if (imageLink.includes("//cdna")) {
        imageLink = imageLink.replace("//cdna", "https://cdna");
      } else if (imageLink === "/static/forever/img/no-image.png") {
        imageLink =
          "https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
      }

      if (buyLinks[0][1] <= budget) {
        buyable.push({
          name: partName,
          image: imageLink,
          link: buyLinks[0][0],
          store: buyLinks[0][0].split("mr/")[1].split("/")[0].toUpperCase(),
          price: `$${buyLinks[0][1]}`,
        });
      }
    }
  }

  buyable
    .sort((a, b) => {
      return (
        Number(a.price.replace(/[^0-9.-]+/g, "")) -
        Number(b.price.replace(/[^0-9.-]+/g, ""))
      );
    })
    .reverse();

  return buyable[0];
};

const findMotherboard = (budget, cpu) => {
  const compatibleSocket = cpuData[cpu].part_info["Socket"];

  let buyable = [];
  for (const mb in mbData) {
    if (mbData[mb].part_info["Socket / CPU"] == compatibleSocket) {
      if (Object.keys(mbData[mb].buying_info).length > 0) {
        let buyLinks = [];
        for (buyLink in mbData[mb].buying_info) {
          const price = Number(
            mbData[mb].buying_info[buyLink].replace(/[^0-9.-]+/g, "")
          );
          buyLinks.push([buyLink, price]);
        }

        buyLinks.sort((a, b) => {
          return a[1] - b[1];
        });

        let imageLink = mbData[mb].image_link;

        if (imageLink.includes("//cdna")) {
          imageLink = imageLink.replace("//cdna", "https://cdna");
        } else if (imageLink === "/static/forever/img/no-image.png") {
          imageLink =
            "https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
        }

        if (buyLinks[0][1] <= budget) {
          buyable.push({
            name: mb,
            image: imageLink,
            link: buyLinks[0][0],
            store: buyLinks[0][0].split("mr/")[1].split("/")[0].toUpperCase(),
            price: `$${buyLinks[0][1]}`,
          });
        }
      }
    }
  }

  buyable
    .sort((a, b) => {
      return (
        Number(a.price.replace(/[^0-9.-]+/g, "")) -
        Number(b.price.replace(/[^0-9.-]+/g, ""))
      );
    })
    .reverse();

  return buyable[0];
};

exports.buildComputer = buildComputer;
