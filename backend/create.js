const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('Fulcrum', 'AliBaBa', 'A9l0E6x0', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database: ', error);
}

const Ads = sequelize.define(
    'Ads',
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.TEXT
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        count: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        },
        image_link: {
            type: DataTypes.STRING(1234)
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    }
);

const Helps = sequelize.define(
    'Helps',
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.TEXT
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        university: {
            type: DataTypes.STRING
        },
        part: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        count: {
            type: DataTypes.INTEGER
        },
        tags: {
            type: DataTypes.TEXT
        },
        image_link: {
            type: DataTypes.STRING(1234)
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    }
);

const Feedbacks = sequelize.define(
    'Feedbacks',
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        user_from: {
            type: DataTypes.INTEGER
        },
        user_to: {
            type: DataTypes.INTEGER
        },
        feedback_text: {
            type: DataTypes.TEXT
        },
        mark: {
            type: DataTypes.INTEGER
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    }
)

const Users = sequelize.define(
    'Users',
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        telegram: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING(1234),
        },
        university: {
            type: DataTypes.STRING,
        },
        course: {
            type: DataTypes.INTEGER,
        },
        program: {
            type: DataTypes.TEXT,
        },
        about: {
            type: DataTypes.TEXT,
        },
        ad_like: {
            type: DataTypes.TEXT
        },
        help_like: {
            type: DataTypes.TEXT
        },
        ad_hide: {
            type: DataTypes.TEXT
        },
        help_hide: {
            type: DataTypes.TEXT
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

Users.sync({alter: true});

Ads.sync({alter: true});

Helps.sync({alter: true});

Feedbacks.sync({alter: true});
