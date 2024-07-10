const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Medium API",
			version: "1.0.0",
			description:
				"Medium is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic.",
			contact: {
				name: "Eric Barreto",
				url: "https://github.com/ericlbarreto",
				email: "ericbarreto521@gmail.com",
			},
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	apis: ["./src/docs/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
	specs,
	swaggerUi,
};
