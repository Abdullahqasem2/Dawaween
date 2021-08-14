import React, { useState, useEffect } from 'react'
import PostsForm from '../components/Wall/Form/Form'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { makeStyles,ThemeProvider, createTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, Comment, Header } from 'semantic-ui-react';
import Head from '../components/Header/Header'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 900,
        margin:'25px auto',
        border:'1px solid grey',
        padding:'10px'
    },
      media: {
        height: 140,
    },
    head: {
        textAlign:'center'
    },
    comments: {
    marginLeft: theme.spacing(8)
    },
    header: {
        margin: theme.spacing(3),
        // Color:'white'
    },
    author: {
        display:'flex',
        justifyContent:'flex-start',
    },
    data:{
        marginLeft: theme.spacing(3),
        display:'block',
    },
    background: {
        // backgroundImage:'url("https://images.unsplash.com/photo-1534534573898-db5148bc8b0c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80")',
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
        <div className={classes.background}>
            <Head></Head>
            <h2 className={classes.header}>Welcome D1Gs to {props.type}'s wall</h2>
            <PostsForm kind="post" postid="" type="Sawwah" wallFormAction={createPost}></PostsForm>
            <Header className={classes.head} as='h3' dividing >
            Posts
            </Header>
            {loaded && posts.map((item,idx) => { 
                return <div><Card className={classes.root}><Comment key={idx}>
                    <Comment.Content>
                    <div className={classes.author}>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <div className={classes.data}>
                        <Comment.Author as='a'>{item.user[0].name}</Comment.Author>
                        <Comment.Metadata>
                        <div>{item.createdAt}</div>
                        </Comment.Metadata>
                        </div>
                        </div>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h3">
                        <Comment.Text>{item.text}</Comment.Text>
                        </Typography>
                        </CardContent>
                    </Comment.Content>
                    <Header as='h4' dividing>
                    Comments
                    </Header>
                {item.comments.map((comment,index) => {
                    return <div className={classes.comments}><Comment key={index}>
                    <Comment.Content>    
                    <div className={classes.author}>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <div className={classes.data}>
                    <Comment.Author as='a'>{comment.user[0].name}</Comment.Author>
                    <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                    </Comment.Metadata>
                    </div>
                    </div>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h3">
                    <Comment.Text>{comment.text}</Comment.Text>
                    </Typography>
                    </CardContent>
                    </Comment.Content>
                </Comment></div>
                })}
                <PostsForm kind="comment" type="Sawwah" postid={item._id} wallFormAction={createComment}></PostsForm>
                </Comment></Card></div>
            })}
            </div>
    )
}
export default Wall
