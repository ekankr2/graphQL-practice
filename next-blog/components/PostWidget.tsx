import React, {FC, useEffect, useState} from 'react';
import {getRecentPosts, getSimilarPosts} from "../services";

interface Props {
    categories: string[]
    slug: string
}

const PostWidget:FC<Props> = ({ categories, slug}) => {
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        if(slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }
    },[input])

    return (
        <div>
            PostWidget
        </div>
    );
};

export default PostWidget;