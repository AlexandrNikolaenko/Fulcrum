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
        subject: {
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

const Subjects = sequelize.define(
    'Subjects',
    {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

Users.sync({alter: true});

Subjects.sync({alter: true});

Subjects.create({
    id: 1,
    name: 'физика'
})

// Ads.sync({alter: true});

// Ads.create({
//     title: 'Подготовка к экзамену по физике',
//     body: "Lorem ipsum dolor sit amet consectetur. Vitae iaculis metus nulla tellus sem arcu nulla dui. Lectus nec ullamcorper a risus fusce ultrices egestas quis nunc. Euismod nunc purus nunc laoreet sem. In vitae neque ac id facilisis facilisis urna ullamcorper. Mauris sit faucibus dignissim placerat. Ornare accumsan senectus congue praesent ut lacus tempus purus vitae. Adipiscing nisi pellentesque nec interdum lorem quis ut lectus in. Et felis non orci vulputate id ultricies.\nSed nulla quis semper cursus tortor pharetra mauris hendrerit sodales. Dui purus id consectetur massa bibendum duis diam eu. At varius tincidunt pellentesque sollicitudin ornare. Euismod facilisis porta eget ultricies. Quis tortor eget id pharetra aliquet amet eget.",
//     user_id: 3,
//     subject: 'физика',
//     count: 1,
//     price: 2500,
//     image_link: '/Edit.svg'
// })

// Helps.sync({alter: true});

// Feedbacks.sync({alter: true});
