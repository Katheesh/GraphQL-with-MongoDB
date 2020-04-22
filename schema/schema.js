const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLBoolean} = graphql;

const User = require('../models/user');

const Category = require('../models/category');

const Blog = require('../models/blog');

const Comment = require('../models/comment');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        phone: {type: GraphQLString},
        image: {type: GraphQLString},
        status: {type: GraphQLBoolean},
        books: {
            type: UserType, //new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({userId: parent.id});
            }
        }
    })
});
const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: {type: GraphQLID},
        category: {type: GraphQLString},
        status: {type: GraphQLBoolean},
        categories: {
            type: CategoryType,
            resolve(parent, args) {
                return Category.find({CategoryId: parent.id});
            }
        }

    })
});
const BlogType = new GraphQLObjectType({
    name: 'Blog',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        image: {type: GraphQLString},
        status: {type: GraphQLBoolean },
        content: {type: GraphQLString},
        category: {type: GraphQLString},
        tags: {type: GraphQLString},
        posted_at: {type: GraphQLString},
        blogs: {
            type: new GraphQLList(BlogType),
            resolve(parent, args) {
                return Blog.find({blogId: parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                //code to get data from db/other source
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        blog: {
            type: BlogType,
            args: {id: {type: GraphQLID} },
            resolve(parent, args) {
                return Blog.findById(args.id);
            }
        },
        blogs: {
            type: new GraphQLList(BlogType),
            resolve(parent, args){
                return Blog.find({});
            }
        }
    }
});

const Muatation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBlog: {
            type: BlogType,
            args: {
                title: {type: GraphQLString},
                image: {type: GraphQLString},
                status: {type: GraphQLBoolean },
                content: {type: GraphQLString},
                category: {type: GraphQLString},
                tags: {type: GraphQLString},
                posted_at: {type: GraphQLString},
            },
            resolve(parent, args) {
                let blog = new Blog({
                    title: args.title,
                    image: args.image,
                    status: args.status,
                    content: args.content,
                    category: args.category,
                    tags: args.tags,
                    posted_at: args.posted_at
                });
                return blog.save();
            }
        },
        addUser: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                phone: {type: GraphQLString},
                image: {type: GraphQLString},
                status: {type: GraphQLBoolean},
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    email: args.email,
                    password: args.Password,
                    phone: args.phone,
                    image: args.image,
                    status: args.status
                });
                return user.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Muatation
});


