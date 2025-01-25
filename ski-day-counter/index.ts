import { ApolloServer, gql } from "apollo-server";

const mocks = {
  Date: () => new Date(),
  Query: () => ({
    totalDays: () => 42,
    allDays: () => [
      { id: "1", date: new Date(), mountain: "Mt. Hood", conditions: "POWDER" },
      {
        id: "2",
        date: new Date(),
        mountain: "Mt. Bachelor",
        conditions: "ICE",
      },
    ],
  }),
};

// server schema
const typeDefs = gql`
  scalar Date

  enum Conditions {
    POWDER
    HEAVY
    ICE
    THIN
  }

  """
  A ski day record
  """
  type SkiDay {
    "Ski day ID"
    id: ID!
    "Date of the ski day"
    date: Date!
    "Name of the mountain"
    mountain: String!
    "Snow conditions"
    conditions: Conditions
  }

  type Query {
    totalDays: Int
    allDays: [SkiDay!]!
  }

  input AddDayInput {
    date: Date!
    mountain: String!
    conditions: Conditions
  }

  type RemoveDayPayload {
    day: SkiDay
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
  }

  type Mutation {
    addDay(input: AddDayInput): SkiDay
    removeDay(id: ID!): SkiDay!
  }

  type Subscription {
    newDay: SkiDay
  }
`;

// rreturn data
// const resolvers = {};

const server = new ApolloServer({
  typeDefs,
  // resolvers,
  mocks,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
