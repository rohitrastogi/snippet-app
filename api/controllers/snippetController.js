import Snippet from '../models/snippet';

const getUserSnippets = function(username, page, limit, offset){
    return Snippet.find({ user: username})
        .limit(limit)
        .skip(limit * page)
        .sort({
            updatedAt: -1
        }).exec();
}

const getUserSnippetsByTag = function(username, tag, page, limit, offset){
    return Snippet.find({ 
        user: username,
        tags: tag
    })
        .limit(limit)
        .skip(limit * page)
        .sort({
            updatedAt: -1
        }).exec();
}

const updateSnippetById = function(id, newSnippet){
    return Snippet.findByIdAndUpdate(id, newSnippet).exec();
}

const deleteSnippetById = function(id){
    return Snippet.findByIdAndRemove(id).exec();
}

export default {
    getUserSnippets,
    getUserSnippetsByTag,
    updateSnippetById,
    deleteSnippetById
};