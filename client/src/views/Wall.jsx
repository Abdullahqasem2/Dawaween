import React, { useState, useEffect } from 'react'
import PostsForm from '../components/Wall/Form/Form'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { makeStyles,ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Button, Comment, Header } from 'semantic-ui-react';
import Head from '../components/Header/Header'

const useStyles = makeStyles((theme) => ({
    comments: {
    marginLeft: theme.spacing(8)
    },
    header: {
        margin: theme.spacing(3),
        textAlign:'center',
    },
    author: {
        display:'flex',
        justifyContent:'flex-start',
    },
    data:{
        marginLeft: theme.spacing(3),
        display:'block',
    }
}))

const Wall = (props) => {
    const [posts,setPosts] =useState([])
    const [comments, setComments] = useState([])
    const cookies = new Cookies();
    const [loaded, setLoaded] = useState(false);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/post')
        .then(res => {
            setPosts(res.data.filter(response => response.channel === "Sawwah"))
            setLoaded(true)
            setRerender(false)
        })
        .catch(err => console.log(err))
    }, [rerender])


    const createPost = (post) => {
        axios.post('http://localhost:8000/api/post/'+ cookies.get('user').user._id, post)
        .then(res => {setPosts([...posts,res.data])})
        .then(console.log(posts))
        .then(setRerender(true))

    }

    const createComment = ({text},postid) => {
        console.log(postid)
        axios.post('http://localhost:8000/api/comment/'+cookies.get('user').user._id+'/'+postid,{text})
        .then(res=>{setComments([...comments,res.data])})
        .then(setRerender(true))
    }

    const classes = useStyles();
    return (
        <div>
            
            
            <PostsForm kind="post" postid="" type="Sawwah" wallFormAction={createPost}></PostsForm>
            <Header as='h3' dividing>
            Posts
            </Header>
            {loaded && posts.map((item,idx) => { 
                return <div><Comment key={idx}>
                    <Comment.Content>
                    <div className={classes.author}>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <div className={classes.data}>
                        <Comment.Author as='a'>{item.user.name}</Comment.Author>
                        <Comment.Metadata>
                        <div>{item.createdAt}</div>
                        </Comment.Metadata>
                        </div>
                        </div>
                        <Comment.Text style={{color:'white',display:'inline',border:'30px', backgroundColor:'blue', borderRadius:'30px',height:'30px',overflow:'hidden'}} >{item.text}</Comment.Text>
                    </Comment.Content>
                    <Header as='h5' dividing>
                    Comments
                    </Header>
                {item.comments.map((comment,index) => {
                    return <div className={classes.comments}>{item.user.name}<Comment key={index}>
                    <Comment.Content>    
                    <div className={classes.author}>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <div className={classes.data}>
                    <Comment.Author as='a'>asd</Comment.Author>
                    <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                    </Comment.Metadata>
                    </div>
                    </div>
                    <Comment.Text>{comment.text}</Comment.Text>
                    </Comment.Content>
                </Comment></div>
                })}
                <PostsForm kind="comment" type="Sawwah" postid={item._id} wallFormAction={createComment}></PostsForm>
                </Comment></div>
            })}
        </div>
    )
}
export default Wall
