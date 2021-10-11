const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "kiaandsapmaterial", deps: []
 * createTable() => "kiamaterial", deps: []
 * createTable() => "dailyproductionreport", deps: []
 * createTable() => "timecontrol", deps: []
 *
 */

const info = {
  revision: 1,
  name: "migration3",
  created: "2021-10-11T03:19:23.838Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "kiaandsapmaterial",
      {
        status: { type: Sequelize.STRING, field: "status", allowNull: true },
        material: {
          type: Sequelize.STRING,
          field: "material",
          allowNull: true,
        },
        sapmaterial: {
          type: Sequelize.STRING,
          field: "sapmaterial",
          primaryKey: true,
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "kiamaterial",
      {
        material: {
          type: Sequelize.STRING,
          field: "material",
          primaryKey: true,
          allowNull: true,
        },
        materialwithoutdash: {
          type: Sequelize.STRING,
          field: "materialwithoutdash",
          allowNull: true,
        },
        sapmaterial: {
          type: Sequelize.STRING,
          field: "sapmaterial",
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: false,
        },
        pac: { type: Sequelize.STRING, field: "pac", allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "dailyproductionreport",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        material: {
          type: Sequelize.STRING,
          field: "material",
          allowNull: true,
        },
        pac: { type: Sequelize.STRING, field: "pac", allowNull: false },
        type: { type: Sequelize.STRING, field: "type", allowNull: false },
        client: { type: Sequelize.STRING, field: "client", allowNull: false },
        date: { type: Sequelize.DATE, field: "date", allowNull: false },
        Shift: { type: Sequelize.STRING, field: "Shift", allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "timecontrol",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        line: { type: Sequelize.STRING, field: "line", allowNull: true },
        cause: { type: Sequelize.STRING, field: "cause", allowNull: false },
        time: { type: Sequelize.STRING, field: "time", allowNull: false },
        description: {
          type: Sequelize.STRING,
          field: "description",
          allowNull: true,
        },
        date: { type: Sequelize.DATE, field: "date", allowNull: true },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["kiaandsapmaterial", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["kiamaterial", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["dailyproductionreport", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["timecontrol", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
