const sequelize = require("./database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  { timestamps: false }
);

const Collection = sequelize.define(
  "collection",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    theme: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  { timestamps: false }
);

const CollectionItem = sequelize.define(
  "collectionItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    collection_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  { timestamps: false }
);

const ExtraFieldsCollectionItem = sequelize.define(
  "extraFieldsCollectionItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    collection_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

const ExtraFieldsCollectionItemsValue = sequelize.define(
  "extraFieldsCollectionItemsValue",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    extraFieldsCollectionItems_id: {
      type: DataTypes.INTEGER,
    },
    collectionItems_id: {
      type: DataTypes.INTEGER,
    },
    value: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true }
);

const Comment = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    collectionItems_id: {
      type: DataTypes.INTEGER,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  { timestamps: false }
);

const Like = sequelize.define("like", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  collectionItems_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
});

const Tag = sequelize.define("tag", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  collectionItems_id: {
    type: DataTypes.INTEGER,
  },
  text: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Collection, { foreignKey: "user_id" });
Collection.belongsTo(User, { foreignKey: "user_id" });

Collection.hasMany(CollectionItem, { foreignKey: "collection_id" });
CollectionItem.belongsTo(Collection, { foreignKey: "collection_id" });

Collection.hasMany(ExtraFieldsCollectionItem, { foreignKey: "collection_id" });
ExtraFieldsCollectionItem.belongsTo(Collection, {
  foreignKey: "collection_id",
});

CollectionItem.hasMany(ExtraFieldsCollectionItemsValue, {
  foreignKey: "collectionItems_id",
});
ExtraFieldsCollectionItemsValue.belongsTo(CollectionItem, {
  foreignKey: "collectionItems_id",
});

ExtraFieldsCollectionItem.hasMany(ExtraFieldsCollectionItemsValue, {
  foreignKey: "extraFieldsCollectionItems_id",
});
ExtraFieldsCollectionItemsValue.belongsTo(ExtraFieldsCollectionItem, {
  foreignKey: "extraFieldsCollectionItems_id",
});

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

CollectionItem.hasMany(Comment, { foreignKey: "collectionItems_id" });
Comment.belongsTo(CollectionItem, { foreignKey: "collectionItems_id" });

CollectionItem.hasMany(Tag, { foreignKey: "collectionItems_id" });
Tag.belongsTo(CollectionItem, { foreignKey: "collectionItems_id" });

User.hasMany(Like, { foreignKey: "user_id" });
Like.belongsTo(User, { foreignKey: "user_id" });

CollectionItem.hasMany(Like, { foreignKey: "collectionItems_id" });
Like.belongsTo(CollectionItem, { foreignKey: "collectionItems_id" });

module.exports = {
  User,
  Collection,
  CollectionItem,
  ExtraFieldsCollectionItem,
  ExtraFieldsCollectionItemsValue,
  Comment,
  Like,
  Tag,
};
