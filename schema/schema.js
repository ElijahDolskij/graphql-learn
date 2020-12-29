const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLString,
	GraphQLList
} = graphql;
//
// const directorsJson = [
// 	{ "name": "Quentin Tarantino", "age": 55 },//5feb911a664b45e2097c3ade
// 	{ "name": "Michael Radford", "age": 72 }, //5feb9137664b45e2097c3adf
// 	{ "name": "James McTeique", "age": 51 }, //5feb9150664b45e2097c3ae0
// 	{ "name": "Guy Ritchie", "age": 50 }, //5feb9167664b45e2097c3ae1
// ];
//
// const moviesJson = [
// 	{ "name": "Pulp fiction", "genre": "Crime", "directorId": },
// 	{ "name": "1984", "genre": "Sci-Fi", "directorId": },
// 	{ "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": },
// 	{ "name": "Snatch", "genre": "Crime-Comedy", "directorId": },
// 	{ "name": "Reservoir dogs", "genre": "Crime", "directorId": },
// 	{ "name": "The Hateful Eight", "genre": "Crime", "directorId": },
// 	{ "name": "Inglourious Bastards", "genre": "Crime", "directorId": },
// 	{ "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": },
// ];

const directors = [
	{ id: 1, name: 'Director 1', age: 53 },
	{ id: 2, name: 'Director 2', age: 23 },
	{ id: 3, name: 'Director 3', age: 43 },
	{ id: 4, name: 'Director 4', age: 14 },
];

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		director: {
			type: DirectorType,
			resolve(parent) {
				//return directors.find(({ id }) => id == parent.id)
			}
		},
	}),
});

const DirectorType = new GraphQLObjectType({
	name: 'Director',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				//return movies.filter(({ directorId }) => parent.id == directorId)
			}
		}
	}),
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		movie: {
			type: MovieType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				//return movies.find(({ id }) => id == args.id)
			}
		},
		director: {
			type: DirectorType,
			args: { id: { type: GraphQLInt }},
			resolve(parent, args) {
				//return directors.find(({ id }) => id == args.id)
			}
		},
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				//return movies;
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				//return directors;
			}
		}
	})
});

module.exports = new GraphQLSchema({
	query: Query
});
