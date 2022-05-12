import memberCollection, { getMemberByDiscordId } from "../database/collections/Member.js";
import serverActivityCollection, { getServerActivity } from "../database/collections/ServerActivity.js";
import { Resolvers } from "../interfaces/GraphQL.js";

const query: Resolvers["Query"] = {
  members: async () => await memberCollection.find({ isOnServer: true }).toArray(),
  member: async (_, { id }) => await getMemberByDiscordId(id),

  todayServerActivity: async () => await getServerActivity(),
  serverActivity: async (_, { historyCount }) => serverActivityCollection.find({}, { sort: { date: "desc" }, limit: historyCount }).toArray() 
}

export default query;