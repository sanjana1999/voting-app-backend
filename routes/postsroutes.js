const router = require('express').Router();
let posts = require('../model/posts.model');
const { post } = require('./uniqueid');

router.route('/add').post(async function(req, res){
    let post = new posts(req.body);
    let savedpost = await post.save();
    if(savedpost){
        return res.status(200).send(post);
    }else{
        return res.status(400).send("Post Not Saved")
    }
});

router.route('/all').post(async function(req,res){
    let allposts = await posts.find({});
    if(allposts){
        allposts.sort((a, b) => 
            (a.upvotes <= b.upvotes) ? 1 : -1
        );
        return res.send(allposts);
    }
});

router.route('/upvote').post(async function(req,res){
    try{
        const post = await posts.findOne({_id: req.body.id})
        if(post){
            var presentindown = post.downvotesid.indexOf(req.body.unique);
            var presentinup = post.upvotesid.indexOf(req.body.unique);
            if(presentinup != -1){
                return res.send({msg:"already upvoted"})
            }
            if(presentindown == -1){
                post.upvotes = post.upvotes+1;
                post.upvotesid.push(req.body.unique);
                let savedpost = await post.save();
                if(savedpost){
                    return res.status(200).send(post);
                }else{
                    return res.status(400).send("Post Not Saved")
                }
            }
            else{
                post.upvotes = post.upvotes+1;
                post.upvotesid.push(req.body.unique);
                post.downvotesid.splice(presentindown,1);
                post.downvotes = post.downvotes-1;
                let savedpost = await post.save();
                if(savedpost){
                    return res.status(200).send(post);
                }else{
                    return res.status(400).send("Post Not Saved")
                }
            }
        }
        else{
            return res.status(404).send({msg:"Post Not Found"})
        }
    }catch(err){
        return res.status(500).send(err);
    }
    
});

router.route('/downvote').post(async function(req,res){
    try{
        const post = await posts.findOne({_id: req.body.id})
        if(post){
            var presentindown = post.downvotesid.indexOf(req.body.unique);
            var presentinup = post.upvotesid.indexOf(req.body.unique);
            if(presentindown != -1){
                return res.send({msg:"already downvoted"})
            }
            if(presentinup == -1){
                post.downvotes = post.downvotes+1;
                post.downvotesid.push(req.body.unique);
                let savedpost = await post.save();
                if(savedpost){
                    return res.status(200).send(post);
                }else{
                    return res.status(400).send("Post Not Saved")
                }
            }
            else{
                post.downvotes = post.downvotes+1;
                post.downvotesid.push(req.body.unique);
                post.upvotesid.splice(presentinup,1);
                post.upvotes = post.upvotes-1;
                let savedpost = await post.save();
                if(savedpost){
                    return res.status(200).send(post);
                }else{
                    return res.status(400).send("Post Not Saved")
                }
            }
        }
        else{
            return res.status(404).send({msg:"Post Not Found"})
        }
    }catch(err){
        return res.status(500).send(err);
    }
    
});

module.exports = router;