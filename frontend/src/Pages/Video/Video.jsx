import React, { useState, useEffect } from 'react'
import './Video.css'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

function Video() {

    const [message, setMessage] = useState('')
    const [data, setData] = useState(null)
    const [videoUrl, setVideoUrl] = useState('')
    const [comments, setComments] = useState([])
    const { id } = useParams()

    // Fetching video api based on id using axios
    const fetchVideoById = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
            // console.log(response)
            setData(response.data.video)
            setVideoUrl(response?.data?.video?.videoLink)
        }
        catch (err) {
            console.log(err)
        }
    };

    // Fetching comment api using axios
    const getCommentByVideoId = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/commentApi/comment/${id}`)
            setComments(response?.data?.comments)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, []);

    // implementing add commment functionality
    const handleComment = async() => {
        try{
            const body = {
                "message" : message,
                "video" : id
            }
           const response = await axios.post("http://localhost:4000/commentApi/comment", body, {withCredentials:true})
           const newComment = response.data.comment;
           setComments([newComment,...comments])
           setMessage("")
        }catch(err){
            console.log(err)
            toast.error('Please login first to comment')
        }
    }

    return (
        <div className='video'>

            <div className="video-post">
                <div className="video-youtube">
                    {
                        data && <video className='video-youtube-video' controls autoPlay width='400'>

                            <source src={videoUrl} type='video/mp4' />
                            <source src={videoUrl} type='video/webm' />

                        </video>
                    }
                </div>

                <div className="video-youtube-about">

                    <div className="video-youtube-title">{data?.title}</div>
                    <div className="youtube-video-profile-block">

                        <div className="youtube-video-profile-block-left">

                            <Link to={`/user/${data?.user?._id}`} className="youtube-video-profile-block-left-img">
                                <img src={data?.user?.profilePic} alt="profile" className="youtube-video-profile-block-left-image" />
                            </Link>

                            <div className="youtube-video-subview">
                                <div className="youtube-post-profile-name">{data?.user?.channelName}</div>
                                <div className="youtube-post-profile-subs">{data?.user?.createdAt}</div>
                            </div>
                            <div className="subscribe-btn">Subscribe</div>
                        </div>

                        <div className="youtube-video-likeblock">
                            <div className="youtube-video-likeblock-like">
                                <ThumbUpOutlinedIcon />
                                <div className="like-number">{data?.like}</div>
                            </div>
                            <div className="divider">|</div>
                            <div className="youtube-video-likeblock-like">
                                <ThumbDownOffAltOutlinedIcon />
                            </div>
                        </div>

                    </div>

                    <div className="youtube-video-about">
                        <div>{data?.createdAt}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>

                <div className="comment">
                    <div className="comment-title">{comments.length} comments</div>
                    <div className="self-comment">
                        <img src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" alt="" className="self-comment-profile" />
                        <div className="add-comment">
                            <input type="text" className='add-comment-input' placeholder='add a comment' value={message} onChange={(e) => { setMessage(e.target.value) }} />
                            <div className="submit-cancel-comment">
                                <div className="cancel-comment">cancel</div>
                                <div className="cancel-comment" onClick={handleComment}>comment</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="others-comment">
                    {
                        comments.map((item, index) => {
                            return (

                                <div className="self-comment" key={item._id}>
                                    <img src={item?.user?.profilePic} alt="" className="self-comment-profile" />
                                    <div className="others-comment-section">
                                        <div className="others-comment-section-header">
                                            <div className="channel-name-comment">{item?.user?.channelName}</div>
                                            <div className="comment-timing">{item?.createdAt}</div>
                                        </div>
                                        <div className="video-comment">
                                            {item?.message}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>

            <div className="video-suggetion">

                <div className="video-suggetion-block">
                    <div className="video-suggetion-thumbnail">
                        <img src="https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=600" alt="thumbnail" className='video-suggetion-thumbnail-image' />
                    </div>
                    <div className="video-suggetion-about">
                        <div className="video-suggetion-about-title">
                            Nature is the Godgift.Nature is the medicine for all problems.
                        </div>
                        <div className="video-suggetion-about-profile">SUNSETVIEW</div>
                        <div className="video-suggetion-about-profile">136k view . 1 day ago</div>
                    </div>
                </div>

                <div className="video-suggetion-block">
                    <div className="video-suggetion-thumbnail">
                        <img src="https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=600" alt="thumbnail" className='video-suggetion-thumbnail-image' />
                    </div>
                    <div className="video-suggetion-about">
                        <div className="video-suggetion-about-title">
                            Nature is the Godgift.Nature is the medicine for all problems.
                        </div>
                        <div className="video-suggetion-about-profile">SUNSETVIEW</div>
                        <div className="video-suggetion-about-profile">136k view . 1 day ago</div>
                    </div>
                </div>

                <div className="video-suggetion-block">
                    <div className="video-suggetion-thumbnail">
                        <img src="https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=600" alt="thumbnail" className='video-suggetion-thumbnail-image' />
                    </div>
                    <div className="video-suggetion-about">
                        <div className="video-suggetion-about-title">
                            Nature is the Godgift.Nature is the medicine for all problems.
                        </div>
                        <div className="video-suggetion-about-profile">SUNSETVIEW</div>
                        <div className="video-suggetion-about-profile">136k view . 1 day ago</div>
                    </div>
                </div>

                <div className="video-suggetion-block">
                    <div className="video-suggetion-thumbnail">
                        <img src="https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=600" alt="thumbnail" className='video-suggetion-thumbnail-image' />
                    </div>
                    <div className="video-suggetion-about">
                        <div className="video-suggetion-about-title">
                            Nature is the Godgift.Nature is the medicine for all problems.
                        </div>
                        <div className="video-suggetion-about-profile">SUNSETVIEW</div>
                        <div className="video-suggetion-about-profile">136k view . 1 day ago</div>
                    </div>
                </div>



            </div>

            <ToastContainer/>

        </div>
    )
}

export default Video