import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getData = query({
  args: { query: v.optional(v.string()), userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const files = await ctx.db
      .query("DataFile")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    const query = args.query;
    if (query) {
      return files.filter((file) =>
        file.Filename.toLowerCase().includes(args.query?.toLowerCase())
      );
    } else {
      return files;
    }
  },
});

export const getImageId = query({
  args: {
    query: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.storage.getUrl(`${args.query}`);
    return id;
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createData = mutation({
  args: {
    Filename: v.string(),
    fileId: v.id("_storage"),
    size: v.number(),
    type: v.string(),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("DataFile", {
      Filename: args.Filename,
      fileId: args.fileId,
      size: args.size,
      type: args.type,
      userId: args.userId,
    });
  },
});

export const deleteData = mutation({
  args: { id: v.id("DataFile") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateData = mutation({
  args: { id: v.id("DataFile"), Filename: v.string() },
  handler: async (ctx, args) => {
    const { id, Filename } = args;
    await ctx.db.patch(id, { Filename: Filename });
    console.log(await ctx.db.get(id));
  },
});
