import React from 'react';
import {Categories, PostWidget} from "../../components";
import PostDetail from "../../components/PostDetail";
import Author from "../../components/Author";
import CommentsForm from "../../components/CommentsForm";
import Comments from "../../components/Comments";
import {getPostDetails} from "../../services";
import {GetStaticPropsContext, InferGetServerSidePropsType} from "next";

const PostDetails = ({post}: InferGetServerSidePropsType<typeof getStaticProps>) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post}/>
                    <Author author={post.author}/>
                    <CommentsForm slug={post.slug}/>
                    <Comments slug={post.slug}/>
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget slug={post.slug}
                                    categories={post.categories.map((category) => category.slug)}/>
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;

export const getStaticProps = async ({params}: GetStaticPropsContext) => {
    const slug = params?.slug?.toString() || ''

    const data: Post = await getPostDetails(slug)
    return {
        props: {post: data},
    }
}