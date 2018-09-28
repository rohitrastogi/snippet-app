import Snippet from '../models/snippet';

const getUserSnippets = function(username, page, limit){
    return Snippet.find({ user: username})
        .limit(limit)
        .skip(limit * page)
        .sort({
            updatedAt: -1
        }).exec();
}

const getUserSnippetsByTag = function(username, tag, page, limit){
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

const createSnippet = function(options){
    let newSnippet = options;
    Snippet.save(newSnippet).exec();
}

export default {
    getUserSnippets,
    getUserSnippetsByTag,
    updateSnippetById,
    deleteSnippetById,
    createSnippet
};