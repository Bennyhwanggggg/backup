var j_food =require("../models/j_food");
var Comment =require("../models/comment");
//All middleware goes here
var middlewareObj = {};


middlewareObj.checkj_foodOwnership = function (req, res, next) {
       if (req.isAuthenticated()) {
        j_food.findById(req.params.id, function(err, foundj_food) {
            if (err) {
                req.flash("error","j_food not found.");
                res.redirect("back");
            } else {
                //does the user own the j_food?
                if (foundj_food.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You do not have permission to this j_food.");
                    res.redirect("back");
                }
            }
        })
        
    } else {
        req.flash("error","You need to be logged in to that.");
        res.redirect("back"); 
    }
}



middlewareObj.checkCommentOwnership = function (req, res, next) {
     if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                req.flash("error","Comment not found.");
                res.redirect("back");
            } else {
                //does the user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You do not have permission to this comment.");
                    res.redirect("back");
                }
            }
        })
        
    } else {
        req.flash("error","You need to be logged in to do that.");
        res.redirect("back"); 
    }
}


//middleware
middlewareObj.isLoggedIn = function (req, res, next) {
        if (req.isAuthenticated()) {
        return next();

    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;