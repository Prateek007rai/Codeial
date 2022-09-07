{
    //method to submit the form data using AJAX to server but we need DOM to print the Posted data on home page
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) { 
            e.preventDefault();

            $.ajax({
                type: "post",                               //this post is method(get, post , update)
                url: "/posts/create",
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button' , newPost));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
            
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(` <li id="post-${post._id}">
                        
                            <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                            </small>
                        
                        <p>
                            ${ post.content }
                            <br>
                            <small>
                            ${ post.user.name }
                            </small>
                        </p>
                        <div class="post-comments">
                            
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${post._id}" >
                                <input type="submit" value="Add Comment">
                            </form>

                               
            
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                               
                            </ul>
                        </div>
                        </div>
                    </li>`)
    }



    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function (e) { 
            e.preventDefault();
            
            $.ajax({
                type: "get",
                url: $(deleteLink).prop('href'),
                success: function (data) {                          //data has id of the post
                    $(`#data-${data.data.post._id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }






    createPost();
}