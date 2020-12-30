const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} = graphql;

const Movies = require('../models/movies');
const Directors = require('../models/directors');

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		genre: { type: new GraphQLNonNull(GraphQLString) },
		directorId : {
			type: DirectorType,
			resolve(parent) {
				//return directors.find(({ id }) => id == parent.id)
				return Directors.findById(parent.directorId);
			}
		},
	}),
});

const DirectorType = new GraphQLObjectType({
	name: 'Director',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		age: { type: new GraphQLNonNull(GraphQLInt) },
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				return Movies.find({ directorId: parent.id
				});
			}
		}
	}),
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve: (parent, { name, age }) => {
				const director = new Directors({
					name,
					age
				});

				return director.save();
			}
		},
		addMovie: {
			type: MovieType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: GraphQLID }
			},
			resolve: (parent, { name, genre, directorId }) => {
				const movie = new Movies({
					name,
					genre,
					directorId
				});

				return movie.save();
			}
		},
		deleteDirector: {
			type: DirectorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, { id }) {
				return Directors.findByIdAndRemove(id);
			}
		},
		updateDirector: {
			type: DirectorType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, { id, name, age }) {
				return Directors.findByIdAndUpdate(
					id,
					{ $set: { name, age } },
					{ new: true },
				);
			}
		},
		deleteMovie: {
			type: MovieType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, { id }) {
				return Movies.findByIdAndRemove(id);
			}
		},
		updateMovie: {
			type: MovieType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: GraphQLID },
			},
			resolve(parent, { id, name, genre, directorId }) {
				return Movies.findByIdAndUpdate(
					id,
					{ $set: { name, genre, directorId } },
					{ new: true },
				);
			}
		},
	}
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		movie: {
			type: MovieType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				//return movies.find(({ id }) => id == args.id)
				return Movies.findById(args.id);
			}
		},
		director: {
			type: DirectorType,
			args: { id: { type: GraphQLInt }},
			resolve(parent, args) {
				//return directors.find(({ id }) => id == args.id)
				return Directors.findById(args.id);
			}
		},
		movies: {
			type: new GraphQLList(MovieType),
			resolve(parent, args) {
				//return movies;
				return Movies.find({});
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve(parent, args) {
				//return directors;
				return Directors.find({});
			}
		}
	})
});

module.exports = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});
